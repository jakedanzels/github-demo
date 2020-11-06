let timer;
//  import firebase from "firebase/app";
//  import "firebase/auth";

export default {
    async login(context,payload) {
        return context.dispatch('auth',{
            ...payload,
            mode: 'login'
        });

        // // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        // //     .then(function() {
        //         return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        //     // })
        //     .catch(function(error) {
        //         // Handle Errors here.
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         console.log(errorCode);
        //         const err = new Error(errorMessage);
        //         throw err;
        //     });
    },
    async signup(context,payload) {
        return context.dispatch('auth',{
            ...payload,
            mode: 'signup'
        });
        // return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        // .catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     console.log(errorCode);
        //     const err = new Error(errorMessage);
        //     throw err;
        //   });
    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZIpIFTnZyc2WarqWxblqN5JGuJmC9LKQ';
        if(mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZIpIFTnZyc2WarqWxblqN5JGuJmC9LKQ';
        }
        
        const response = await fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
            })
        });
        const responseData = await response.json();

        if(!response.ok) {
            const error = new Error(responseData.error.message || 'Failed to authenticate.');
            error.message = error.message === "EMAIL_NOT_FOUND" ? 'There is no user record corresponding to this e-mail address' : error.message;
            error.message = error.message === "INVALID_PASSWORD" ? 'Incorrect password!' : error.message; 
            error.message = error.message === "EMAIL_EXISTS" ? 'Email already in use!' : responseData.message;
            throw error;
        }
        const expiresIn = +responseData.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(function() {
            context.dispatch('autoLogout');
        }, expiresIn);


        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId
        });
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        
        const expiresIn = +tokenExpiration - new Date().getTime();
        if (expiresIn < 600000){
            return;
        }
        timer = setTimeout(function() {
            context.dispatch('autoLogout');
        }, expiresIn);

        if(token && userId){
            context.commit('setUser', {
                token: token,
                userId: userId
            });
        }

    },
    logout(context){
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null
        });
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLoggedOut');
    }

};