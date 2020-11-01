<template>
    <h1>Welcome to the Red Book!</h1>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
</template>

<script>
import firebase from 'firebase';
import firebaseui from "firebaseui/dist/npm";
import "firebaseui/dist/firebaseui.css";
export default {
    mounted() {
        
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        var uiConfig = {
            callbacks: {
                // eslint-disable-next-line no-unused-vars
                signInSuccessWithAuthResult: function(authResult, redirectUrl){
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return true;
                },
                uiShown: function() {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '/All',
            signInOptions: [
                    {
                        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                        //signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
                        requireDisplayName: true
                    }
                    // ,
                    // {
                    //     provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    //     scopes: ['email']
                    // }
                ],
        };
 
        //if (ui.isPendingRedirect()) {
            ui.start('#firebaseui-auth-container', uiConfig);     
       // }

        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
        })
        
    }
}
</script>