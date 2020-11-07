import firebase from "firebase/app";
import "firebase/auth";

export default {
    async login(context,payload) {
        return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            const err = new Error(errorMessage, errorCode);
            throw err;
        });
    },
    async signup(context,payload) {
        return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            const err = new Error(errorMessage,errorCode);
            throw err;
        });
    },
    logout(context){
        firebase.auth().signOut()
        .then(function() {
            context.commit('setUser', null);//might be pointless now
        })
        .catch(function(error) {
        throw error;
        });
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLoggedOut');
    },
    async refreshToken(context) {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            context.commit("setToken",idToken);
        });
    }
};