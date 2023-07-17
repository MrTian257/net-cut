
import { io } from 'socket.io-client'

export default class SocketService {
  constructor() {
    this.socket = null
  }

  connect() {
    try {
      const {host, hostname} = location
      this.socket = io(`ws://${host}`, {
        path: '/ws/'
      })
      // this.socket = io({
      //   transportOptions: {
      //     webtransport: {
      //       hostname,
      //     }
      //   }
      // })
    } catch (error) {
      console.error('Socket connection failed: ', error)
    }
  }

  joinNetcutGroup() {
    try {
      const room = location.search || 'COMMON'
      this.socket.emit('join-room', room)
    } catch (error) {
      console.error('Failed to join netcut group: ', error)
    }
  }

  onTextSync(callback) {
    try {
      this.socket.on('sync-text', callback)
      this.socket.on('sync-input', callback)
    } catch (error) {
      console.error('Failed to sync text: ', error)
    }
  }

  onImageSync(callback) {
    try {
      this.socket.on('image-sync', callback)
    } catch (error) {
      console.error('Failed to sync image: ', error)
    }
  }

  onFileSync(callback) {
    try {
      this.socket.on('file-sync', callback)
    } catch (error) {
      console.error('Failed to sync file: ', error)
    }
  }

  onClipboardSync(callback) {
    try {
      this.socket.on('clipboard-sync', callback)
    } catch (error) {
      console.error('Failed to sync clipboard: ', error)
    }
  }

  emitFocusInput() {
    try {
      this.socket.emit('input-sync', true)
    } catch (error) {
      console.error('Failed to emit focus input text: ', error)
    }
  }
  emitBlurInput() {
    try {
      this.socket.emit('input-sync', false)
    } catch (error) {
      console.error('Failed to emit blur input text: ', error)
    }
  }

  emitTextSync(data) {
    try {
      this.socket.emit('text-sync', data)
    } catch (error) {
      console.error('Failed to emit text sync: ', error)
    }
  }

  emitImageSync(data) {
    try {
      this.socket.emit('image-sync', data)
    } catch (error) {
      console.error('Failed to emit image sync: ', error)
    }
  }

  emitFileSync(data) {
    try {
      this.socket.emit('file-sync', data)
    } catch (error) {
      console.error('Failed to emit file sync: ', error)
    }
  }

  emitClipboardSync(data) {
    try {
      this.socket.emit('clipboard-sync', data)
    } catch (error) {
      console.error('Failed to emit clipboard sync: ', error)
    }
  }
}
