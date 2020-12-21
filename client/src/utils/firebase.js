import { styled } from '@material-ui/core';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseui = require('firebaseui');

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);


// export const ui = new firebaseui.auth.AuthUI(firebase.auth());

// ui.start("#firebaseui-auth-container", {
//   signInOptions: [
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//   ],
//    signInFlow: "redirect",
//       signInSuccessUrl: "/home",
// });

export const uiConfig = {
  // callbacks: {
  //   signInSuccessWithAuthResult: function(authResult, redirectUrl) {
  //     // User successfully signed in.
  //     // Return type determines whether we continue the redirect automatically
  //     // or whether we leave that to developer to handle.
  //     return true;
  //   },
  //   uiShown: function() {
  //     // The widget is rendered.
  //     // Hide the loader.
  //     document.getElementById('loader').style.display = 'none';
  //   }
  // },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'redirect',
  signInSuccessUrl: '/home',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    { provider: firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID }

  ],
  
  // Terms of service url.
  // tosUrl: '',
};

// ui.start('#firebaseui-auth-container', uiConfig);

// export const providerGoogle = new firebase.auth.GoogleAuthProvider();
// export const providerFacebook = new firebase.auth.FacebookAuthProvider();
// export const providerTwitter = new firebase.auth.TwitterAuthProvider();
// export const language = firebase.auth().languageCode = "ja";

var database = firebase.database();



export default firebase;