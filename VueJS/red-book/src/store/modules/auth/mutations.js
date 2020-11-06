export default {
    setUser(state,payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.autoLoggedOut = false;
    },
    setAutoLoggedOut(state) {
        state.autoLoggedOut = true;
    }
};