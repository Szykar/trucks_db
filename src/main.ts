import 'primevue/resources/themes/aura-dark-indigo/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import Message from 'primevue/message'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import Panel from 'primevue/panel'
import Toast from 'primevue/toast'

const app = createApp(App)

app.use(router)

/**
 * PrimeVue config
 */
app.use(PrimeVue, {
  inputStyle: 'filled'
})
app.use(ToastService)

app.component('Button', Button)
app.component('Dropdown', Dropdown)
app.component('Message', Message)
app.component('InputText', InputText)
app.component('Card', Card)
app.component('Panel', Panel)
app.component('Toast', Toast)

app.mount('#app')
