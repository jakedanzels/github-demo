import { createRouter, createWebHistory } from 'vue-router';

import Welcome from './pages/Welcome.vue';
import NewEntry from './pages/NewEntry.vue';
import RandomEntry from './pages/RandomEntry.vue';
import AllEntries from './pages/AllEntries.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/Home' },
        { path: '/home', component: Welcome},
        { path: '/new', component: NewEntry, meta: { requiresAuth: true }},
        { path: '/random', component: RandomEntry, meta: { requiresAuth: true }},
        { path: '/all', component: AllEntries, meta: { requiresAuth: true }},
        { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});

router.beforeEach(function(to, _, next){
    if(to.meta.requiresAuth && !store.getters.isAuthenticated){
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated){
        next('/home');
    } else {
        next();
    }

});

export default router;