import { createApp } from 'vue'
import router from '@/routes/routes'
import components from './components'
import App from './App.vue'
import './styles/index.scss'

const app = createApp(App)

app.use(router)
app.use(components)

app.mount('#app')
