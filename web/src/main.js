import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import SocketService from './services/SocketService'

const app = createApp(App)

// Initialize services
const socketService = new SocketService()

// Connect to server
socketService.connect()

window.app = app
window.socket = socketService

// Mount socketService to global $socket
app.provide('$socket',socketService)

app.mount('#app')
