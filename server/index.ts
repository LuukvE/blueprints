import http, { RequestListener } from 'http';
import { WebSocketServer, OPEN } from 'ws';

type Person = {
  id: string;
  name: string;
  status: string;
  description: string;
};
const database: {
  [id: string]: Person;
} = {
  '12312312': {
    id: '12312312',
    name: 'Luuk',
    status: '',
    description: 'Web Developer'
  }
};

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

const server = http.createServer(httpHandler).listen(8080);

const wss = new WebSocketServer({ server });

console.log('Server running on http://localhost:8080');

async function getResult(url: string, body: any): Promise<Object | null> {
  // Emulate real network traffic delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  if (url.indexOf('/people') === 0) return database;

  if (url.indexOf('/person') === 0) {
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });

    if (!body) return null;

    if (!body.id) body.id = `${Math.random()}`;

    database[body.id] = {
      ...database[body.id],
      ...body
    };

    const message = JSON.stringify(database[body.id]);

    wss.clients.forEach((client) => {
      if (client.readyState === OPEN) client.send(message);
    });

    if (body.status === 'deleted') delete database[body.id];

    return { success: true };
  }

  return null;
}
