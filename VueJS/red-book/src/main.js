import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Welcome from './views/Welcome.vue';
import NewEntry from './views/NewEntry.vue';
import RandomEntry from './views/RandomEntry.vue';
import AllEntries from './views/AllEntries.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Welcome},
        { path: '/New', component: NewEntry},
        { path: '/Random', component: RandomEntry},
        { path: '/All', component: AllEntries}
    ]
});

const app = createApp(App);
app.use(router);

app.mount('#app');
