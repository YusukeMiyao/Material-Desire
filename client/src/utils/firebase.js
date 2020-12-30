import { styled } from '@material-ui/core';

import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { Redirect } from 'react-router-dom';
import Home from '../components/Home';


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
  // apiKey: "AIzaSyBKvJer-nRrcKmuC_v_qtgVuEnpiLXDkYU",
  // authDomain: "material-desire-c5ada.firebaseapp.com",
  // databaseURL: "https://material-desire-c5ada-default-rtdb.firebaseio.com",
  // projectId: "material-desire-c5ada",
  // storageBucket: "material-desire-c5ada.appspot.com",
  // messagingSenderId: "412782384520",
  // appId: "1:412782384520:web:4329f48a7326e48cfd163d",
  // measurementId: "G-5N5VN87YHK"
  // apiKey: process.env.REACT_APP_FIREBASE_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_MEASUREMENT_ID,

firebase.initializeApp(firebaseConfig);

export const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/home',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
   firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  autoUpgradeAnonymousUsers:false,
};

export const uiConfigSecand = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/home',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/home',
  autoUpgradeAnonymousUsers:false,
}
var database = firebase.database();



export default firebase;