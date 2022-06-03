import http, { RequestListener } from 'http';

export type Message = {
  body: string;
  created: string;
  creator: string;
};

const messages: Message[] = [];

async function getResult(url: string, body: any): Promise<Object> {
  if (url.indexOf('/tasks') === 0) {
    return [
      { description: 'Authenticate', done: false },
      { description: 'Load data', done: false },
      { description: 'Display data', done: false },
      { description: 'Delete data', done: false }
    ];
  }

  if (url.indexOf('/chat') === 0) {
    if (body) messages.push(body);

    return messages;
  }

  return null;
}

const httpHandler: RequestListener = async function httpHandler(request, response) {
  let chunks = '';

  request.on('data', (chunk: Buffer | string) => {
    chunks += chunk;
  });

  request.on('end', async () => {
    let body: Object = null;

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
