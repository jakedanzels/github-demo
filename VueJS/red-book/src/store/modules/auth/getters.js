export default {
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        return !!state.user;
    },
    isGuest(state) {
        return state.user ? state.user.isAnonymous : false;
    },
    user(state) {
        return state.user;
    }
};