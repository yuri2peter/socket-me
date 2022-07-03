function ioServer(io) {
  console.log('io server started');
  io.on('connection', socket => {
    console.log('a user connected');
  });
}

module.exports = ioServer;
