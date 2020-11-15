import { createRouter, createWebHistory } from 'vue-router';
import firebase from 'firebase/app';

import Welcome from './pages/Welcome.vue';
import NewEntry from './pages/NewEntry.vue';
import RandomEntry from './pages/RandomEntry.vue';
import AllEntries from './pages/AllEntries.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';

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

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !await firebase.getCurrentUser()){
      next('/auth');
    }else{
      next();
    }
  });

export default router;