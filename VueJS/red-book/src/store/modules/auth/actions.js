import firebase from "firebase/app";
import "firebase/auth";

export default {
    async login(context,payload) {
        return await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            const err = new Error(errorMessage, errorCode);
            throw err;
        });
    },
    async guestLogin(){
        return await firebase.auth().signInAnonymously()
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            const err = new Error(errorMessage, errorCode);
            throw err;
          });
    },
    async signup(context,payload) {
        var signup = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            const err = new Error(errorMessage,errorCode);
            throw err;
        });

        var user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: payload.name,
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            const err = new Error(errorMessage,errorCode);
            throw err;
        });

        user.sendEmailVerification()
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            const err = new Error(errorMessage,errorCode);
            throw err;
        });
        return signup
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
    async forgotPassword(context, payload) {        
        var res = await firebase.auth().sendPasswordResetEmail(payload)
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            const err = new Error(errorMessage,errorCode);
            throw err;
        });
        return res;
    },
    async refreshToken(context) {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            context.commit("setToken",idToken);
        });
    }
};