import { nanoid } from 'nanoid';
import http, { RequestListener } from 'http';
import { ServiceAccount, initializeApp, firestore, credential } from 'firebase-admin';

// You can download this from Google Cloud after creating your Firestore
// IAM and admin > Service Accounts > firebase-adminsdk > Keys > Add Key
import service from './google-service-account.json';

const db = initializeApp({
  credential:
    process.env.NODE_ENV === 'production'
      ? credential.applicationDefault()
      : credential.cert(service as ServiceAccount)
}).firestore();

async function getResult(url: string, body: any): Promise<Object | null> {
  // Emulate real network traffic delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  if (url.indexOf('/save-message') === 0) {
    const id = nanoid();

    await db.doc(`/messages/${id}`).set({
      id,
      name: `${body?.name || ''}`,
      email: `${body?.email || ''}`,
      body: `${body?.body || ''}`
    });

    return { success: true };
  }

  if (url.indexOf('/get-messages') === 0) {
    const snapshot = await db.collection('messages').get();
    const result: firestore.DocumentData[] = [];

    snapshot.forEach((doc) => {
      result.push(doc.data());
    });

    return result;
  }

  return null;
}

const httpHandler: RequestListener = async function httpHandler(request, response) {
  let chunks = '';

  request.on('data', (chunk: Buffer | string) => {
    chunks += chunk;
  });

  request.on('end', async () => {
    let body: Object | null = null;

    try {
      body = chunks.length ? JSON.parse(chunks) : null;

      const { headers, method, url } = request;

      response.setHeader('Content-Type', 'application/json');

      if (headers.origin) {
        response.setHeader('Access-Control-Allow-Credentials', 'true');

        response.setHeader('Access-Control-Allow-Origin', headers.origin);

        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      }

      const result = method === 'OPTIONS' ? { ok: 1 } : await getResult(url || '', body);

      response.writeHead(result ? 200 : 401);

      response.end(JSON.stringify(result));
    } catch (error) {
      console.log(error);

      response.writeHead(500);

      response.end();
    }
  });
};

http.createServer(httpHandler).listen(8080);

console.log('Server running on http://localhost:8080');
