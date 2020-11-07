export default {
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        return !!state.user;
    },
    user(state) {
        return state.user;
    }
};