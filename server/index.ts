import http, { RequestListener } from 'http';

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

async function getResult(url: string, body: any): Promise<Object> {
  if (url.indexOf('/tasks') === 0) {
    return [
      { description: 'Authenticate', done: false },
      { description: 'Load data', done: false },
      { description: 'Display data', done: false },
      { description: 'Delete data', done: false }
    ];
  }

  if (url.indexOf('/people') === 0) {
    if (!body) return database;

    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });

    if (!body.id) body.id = `${Math.random()}`;

    database[body.id] = body;

    if (body.status === 'deleted') delete database[body.id];

    return database;
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
