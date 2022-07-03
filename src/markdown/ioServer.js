const users = [];

function ioServer(io) {
  console.log('io server started.');
  io.on('connection', socket => {
    const { id } = socket;
    devOnly(() => {
      console.log(`[${id}] connected.`);
    });

    socket.on('disconnect', () => {
      devOnly(() => {
        console.log(`[${id}] disconnected.`);
      });

      removeUser(id);
    });

    /**
     * 客户端声明自己加入的room和自有属性
     */
    socket.on('join', ({ room, ...props }) => {
      try {
        devOnly(() => {
          console.log(`[${id}] joined ${room} with ${JSON.stringify(props)}.`);
        });
        upsertUser(id, {
          room,
          props,
          socket,
        });
      } catch (error) {
        devOnly(() => {
          console.error(error);
        });
      }
    });

    /**
     * 服务端广播客户端的信息，通过to和room筛选需要发送的对象
     */
    socket.on('speak', ({ to = {}, data = {} }) => {
      try {
        const user = findUserById(id);
        if (!user || !user.room) {
          devOnly(() => {
            console.log(`[${id}] try to speak without a specific room.`);
          });

          return;
        }
        const { room } = user;
        devOnly(() => {
          console.log(
            `[${id}] in ${room} speak to ${JSON.stringify(
              to
            )}: ${JSON.stringify(data)}.`
          );
        });

        const matches = users.filter(t => {
          if (t.room !== room) {
            return false;
          }
          for (const k of Object.keys(to)) {
            if (t.props[k] !== to[k]) {
              return false;
            }
          }
          return true;
        });
        const eventData = {
          from: user.id,
          to,
          data,
        };
        matches.forEach(m => {
          m.socket.emit('speak', eventData);
        });
      } catch (error) {
        devOnly(() => {
          console.error(error);
        });
      }
    });
  });
}

function upsertUser(id, data = {}) {
  removeUser(id);
  users.push({ id, ...data });
}

function removeUser(id) {
  const prevIndex = users.findIndex(user => user.id === id);
  if (prevIndex >= 0) {
    users.splice(prevIndex, 1);
  }
}

function findUserById(id) {
  return users.find(user => user.id === id);
}

function devOnly(action) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  action();
}

module.exports = ioServer;
