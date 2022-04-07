import { createApp } from 'vue'
import './styles/index.scss'
import router from '@/routes/routes'
import components from './components'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(components)

app.mount('#app')
