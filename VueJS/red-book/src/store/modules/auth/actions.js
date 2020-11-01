export default {
    async login(context,payload) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZIpIFTnZyc2WarqWxblqN5JGuJmC9LKQ', {
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
            throw error;
        }
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    },
    async signup(context,payload) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZIpIFTnZyc2WarqWxblqN5JGuJmC9LKQ', {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if(!response.ok) {
            console.log(responseData);
            const error = new Error(responseData.error.message || 'Failed to authenticate.');
            error.message = error.message === "EMAIL_EXISTS" ? 'Email already in use!' : responseData.message;
            throw error;
        }
        console.log(responseData);
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    },
    logout(context){
        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null
        });
    }

};