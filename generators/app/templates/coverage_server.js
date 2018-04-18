const express = require('express');
const path = require('path');
const fs = require('fs');
const config = require('config');

const app = express();
const http= require('http').Server(app);
const io = require('socket.io')(http);

const WATCH_PATH = path.resolve(__dirname, './coverage');

const html = `
<html>
  <head>
    <meta charset=utf-8/>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>Coverage</title>
    <link rel='icon' href='/favicon.ico' type='image/x-icon' />
    <script src="/socket.io/socket.io.js"></script>
    <script>
      var socket = io();   
      socket.on('refresh', function(msg) {
        var iframe = document.getElementById('content');
        iframe.src = iframe.contentWindow.location.href;
      });
    </script>
  </head>
  <body>
    <iframe 
      id='content' src="http://localhost:${config.get('coverage').port}" 
      style='width: calc(100% - 2rem); height: calc(100% - 2rem);' />
  </body>
</html>
`;


let emitChange;
fs.watch('coverage', (eventType, filename) => {
  if (emitChange) clearTimeout(emitChange);
  emitChange = setTimeout(() => { 
    io.emit('refresh', 'DO IT NAAAAOOOOW');
  }, 100);
});

app.get('/watch-static', (req, res, next) => {
  res.send(html);
});

app.use(express.static(WATCH_PATH));

const WATCHER_PORT = config.get('coverage').port;
http.listen(WATCHER_PORT, () => {
  console.log('Coverage watcher running: ', `http://localhost:${WATCHER_PORT}/watch-static`);
});
