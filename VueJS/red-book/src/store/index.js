import { createStore } from 'vuex';

import authModule from './modules/auth/index.js';
import entriesModule from './modules/entries/index.js';

const store = createStore({
    modules: {
        auth: authModule,
        entries: entriesModule
    }
});

export default store;