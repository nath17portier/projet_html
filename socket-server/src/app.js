const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200']
    }
});

io.on("connection", socket => {
  console.log("someone conncted");
  console.log(socket);
});

http.listen(3080, () => {
  console.log('Listening on port 3080');
});