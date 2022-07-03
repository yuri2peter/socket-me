# socket-me

一个支持开放 socketio 客户端协议的服务端，很适合作为其他小的联机应用的公共服务器。

## SocketIO Versions

- 服务端：4.5.1
- 客户端：4.5.0

对于客户端，推荐使用 CDN：

```html
<script
  src="https://cdn.socket.io/4.5.0/socket.io.min.js"
  integrity="sha384-7EyYLQZgWBi67fBtVxw60/OWl1kjsfrPFcaU0pp0nAh+i8FD068QogUvg85Ewy1k"
  crossorigin="anonymous"
></script>
```

## Quick Start

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script
      src="https://cdn.socket.io/4.5.0/socket.io.min.js"
      integrity="sha384-7EyYLQZgWBi67fBtVxw60/OWl1kjsfrPFcaU0pp0nAh+i8FD068QogUvg85Ewy1k"
      crossorigin="anonymous"
    ></script>
    <title>socket-me</title>
  </head>
  <body>
    <div></div>
  </body>
  <script>
    (() => {
      // replace <server-host> with true hostname.
      const socket = io('http://<server-host>');
      socket.on('connect', () => {
        console.log('socket connected.');
        socket.emit('join', {
          room: 'room-1',
          name: 'yuri',
        });
        socket.emit('speak', {
          to: { name: 'yuri' },
          data: { msg: 'I am trying to speak to myself.' },
        });
      });
      socket.on('speak', eventData => {
        console.log(eventData);
      });
      socket.on('disconnect', () => {
        console.log('socket disconnected.');
      });
    })();
  </script>
</html>
```
