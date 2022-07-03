const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const getReadmeHtml = require('./src/markdown/getReadmeHtml');
const ioServer = require('./src/markdown/ioServer');
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', async (req, res) => {
  const content = await getReadmeHtml();
  res.send(content);
});

ioServer(io);

server.listen(3000, () => {
  console.log('listening on *:3000');
});
