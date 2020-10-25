import { createApp } from 'vue'
import App from './App.vue'
import MonitoringListItem from './components/MonitoringListItem.vue';
//import router from './router'

const app = createApp(App);

app.component('monitoring-list-item', MonitoringListItem);

app.mount('#app')
