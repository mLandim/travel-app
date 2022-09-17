import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)

app.provide('MAPBOX_KEY', import.meta.env.VITE_MAPBOX_KEY)

app.use(createPinia())
app.mount('#app')
