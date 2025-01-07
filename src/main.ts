/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import VueApexCharts from 'vue3-apexcharts'
// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(VueApexCharts)
app.component("apexchart", VueApexCharts)
registerPlugins(app)

app.mount('#app')
