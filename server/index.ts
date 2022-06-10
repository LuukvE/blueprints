import fetch from 'node-fetch';
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

async function getResult(url: string, data: any): Promise<Object | null> {
  // Emulate real network traffic delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  if (url.indexOf('/slack') === 0) {
    if (data?.event?.user !== 'U03K165N4KY') return { success: true };

    const id = nanoid();

    await db.doc(`/messages/${id}`).set({
      id,
      created: new Date(),
      name: 'Luuk',
      email: 'l.vanegeraat@gmail.com',
      body: data?.event?.text
    });

    return { success: true };
  }

  if (url.indexOf('/save-message') === 0) {
    const id = nanoid();
    const name = `${data?.name || ''}`;
    const email = `${data?.email || ''}`;
    const body = `${data?.body || ''}`;

    await db.doc(`/messages/${id}`).set({ id, name, email, body, created: new Date() });

    try {
      await fetch(
        'https://hooks.slack.com/services/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',
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            text: `${name} - ${email}: ${body}`
          })
        }
      );
    } catch (e) {
      console.log('Slack error', e);
    }

    return { success: true };
  }

  if (url.indexOf('/get-messages') === 0) {
    const snapshot = await db.collection('messages').orderBy('created').get();
    const result: firestore.DocumentData[] = [];

    snapshot.forEach((doc) => {
      const message = doc.data();

      result.push({
        ...message,
        created: message.created?.toDate().toJSON() || null
      });
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
    let body: any | null = null;

    try {
      body = chunks.length ? JSON.parse(chunks) : null;

      const { headers, method, url } = request;

      // https://api.slack.com/events/url_verification
      if (url?.indexOf('/slack') === 0 && body?.type === 'url_verification') {
        response.writeHead(200, { 'Content-type': 'text/plain' });

        return response.end(body.challenge);
      }

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
