import { createApp } from 'vue'
import App from './App.vue'
import List from './components/List.vue'
import FormAdd from './components/FormAdd.vue'
import './index.css'

const app = createApp(App)

app.component('list', List)
app.component('form-add', FormAdd)

app.mount('#app')
