import { createApp } from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';

import router from './router.js';
import store from './store/index.js';
import App from './App.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZIpIFTnZyc2WarqWxblqN5JGuJmC9LKQ",
    authDomain: "the-red-book-jd.firebaseapp.com",
    databaseURL: "https://the-red-book-jd.firebaseio.com",
    projectId: "the-red-book-jd",
    storageBucket: "the-red-book-jd.appspot.com",
    messagingSenderId: "346921313959",
    appId: "1:346921313959:web:f7b04e90216c8f16275d82",
    measurementId: "G-SRF2LB9D67"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
      }, reject);
  });
};


firebase.auth().onAuthStateChanged(user => {
  store.commit("setUser", user);
  if(user){
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      store.commit("setToken",idToken);
    });
  } else {
    store.commit("setToken",null);
  }
});

const app = createApp(App);
app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
