import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

const app = createApp(App)

app.use(router)

app.mount('#app')
