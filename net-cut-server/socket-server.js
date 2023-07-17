const {Server, Socket} = require("socket.io");


/**
 *
 * @param type
 * @param message
 * @param data
 * @returns {{data, type, message, timestamp: number}}
 */
const result = (type, message, data) => {
  const timestamp = new Date().valueOf()
  return {
    type,
    message,
    data,
    timestamp,
  }
}

/**
 * @type {{[string]: {input: boolean, member: *[], text: string}}}
 */
const State = {
  'ONLINE-DEMO': {
    input: '',
    text: '在这里输入的数据会同步到其他终端。',
    member: [],
  }
}

class SocketService {
  /**
   * @type {Server}
   */
  io;
  socketEvents = {};

  constructor(io) {
    this.socketEvents = {
      /**
       * 加入频道
       * @param {Socket} so
       * @param {string} room
       */
      "join-room": (so, room) => {
        console.log('join-room', room)
        if (State[room]) {
          State[room].member.push(so)
        } else {
          State[room] = {
            input: '',
            text: '在这里输入的数据会同步到其他终端。',
            member: [so],
          }
        }

        so.join(room)
        const {member, ...data} = State[room]
        const [id] = [...so.rooms]
        so.emit("sync-text", result('sync-text', '初始化同步文本', data))
        this.io.to(room).emit('note', result('member-join', '成员加入', id))
      },

      /**
       * 输入锁定
       * @param {Socket} so
       * @param {boolean} input
       */
      "input-sync": (so, input) => {
        const [id, room] = [...so.rooms]
        try {
          State[room].input = input ? so.id : ''
          const {member, ...data} = State[room]
          this.io.to(room).emit("sync-input", result('sync-input', `终端成员${input ? '正在' : '主动结束'}输入`, data))
          setTimeout(()=> {
            State[room].input = ""
            const {input: nowInput, member, ...data} = State[room]
            if(nowInput) {
              this.io.to(room).emit("sync-input", result('sync-input', `终端成员被动结束输入`, data))
            }
          }, 1000)
        } catch (e) {
          this.io.to(room).emit("note", result('error-note', `终端成员启用输入失败`, so.id))
        }
      },

      /**
       * 输入内容
       * @param {Socket} so
       * @param {string} text
       */
      "text-sync": (so, text) => {
        const [id, room] = [...so.rooms]
        State[room].text = text
        const {member, ...data} = State[room]
        this.io.to(room).emit("sync-text", result('sync-text', `终端成员更新内容`, data))
      },
      "file-sync": (...e) => {
        console.log("file-sync", e);
      },
      "image-sync": (...e) => {
        console.log("image-sync", e);
      },
    }

    this.createSocketServer(io);
  }

  /**
   * 创建服务
   */
  createSocketServer(io) {
    this.io = io;

    // 初始化链接
    this.io.on("connection", this.initConnection.bind(this));
  }

  /**
   * 初始化链接
   * @param {Socket} socket
   * @returns
   */
  initConnection(socket) {
    if (socket.recovered) {
      // recovery was successful: socket.id, socket.rooms and socket.data were restored
      console.log("恢复链接", socket.id);
      return;
    }

    console.log("initial transport", socket.conn.transport.name); // prints "polling"

    socket.conn.once("upgrade", () => {
      // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
      console.log("upgraded transport", socket.conn.transport.name); // prints "websocket"
    });

    socket.conn.on("close", (reason) => {
      // called when the underlying connection is closed
      console.log("close", reason);
    });

    socket.on("disconnect", (reason) => {
      console.log("disconnect", reason);
    });

    for (const key in this.socketEvents) {
      socket.on(key, (...e) => {
        this.socketEvents[key].bind(this)(socket, ...e);
      });
    }
  }
}

module.exports = SocketService;


