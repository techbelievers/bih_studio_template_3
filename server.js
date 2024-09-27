// / server.js
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.port || 3000;
const hostname = '127.0.0.1';

app.prepare().then(() => {
  const server = express();

  // Define custom routes here if needed
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
	  });