import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'

import ClickerVue from '@/components/Clicker.vue'
import StoreDisplayVue from '@/components/StoreDisplay.vue'

const app = createApp(App)

app.use(createPinia())

app.component('Clicker', ClickerVue)
app.component('StoreDisplay', StoreDisplayVue)

app.mount('#app')
