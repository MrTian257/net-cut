const path = require('node:path')
const {readFile} = require("node:fs/promises");
const {createServer} = require('node:http')
const {Server} = require("socket.io");
const SocketService = require('./socket-server')

const httpServer = createServer(async (req, res) => {
  console.log('req', req.url, req)
  if (req.method === "GET") {
    let content
    try {
      const [uri, uriParams] = req.url.split('?')
      const filePath = uri !== '/' ? ('./' + uri) : 'index.html'
      content = await readFile(path.resolve(__dirname, './dist', filePath));

      // 类型对象
      const mimes = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        jpg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        mp4: 'video/mp4',
        mp3: 'audio/mpeg',
        json: 'application/json',
        // 未知类型（触发下载）	'application/octet-stream'
      }
      let ext = path.extname(filePath).slice('1')
      // 通过后缀 获取类型
      let type = mimes[ext] || 'application/octet-stream'

      res.writeHead(200, {
        "content-type": type
      });
      res.write(content);
      res.end();
    } catch (e) {
      console.error(e)
      res.writeHead(404).end();
    }

  }
})


const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`server listening at https://localhost:${port}`);
});

const io = new Server(httpServer, {
  path: '/ws/',
  cors: {
    origin: "*",
  },
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true,
  },
})

new SocketService(io)
