import firebase from 'firebase/app';
import "firebase/auth";
const firebaseui = require("firebaseui");

//修正必要箇所.envファイルみたいなのいる
const firebaseConfig = {
  apiKey: "AIzaSyDOTINkVkbdl6xjTSp83TRfEa2AaIvXiL0",
  authDomain: "material-desire.firebaseapp.com",
  databaseURL: "https://material-desire.firebaseio.com",
  projectId: "material-desire",
  storageBucket: "material-desire.appspot.com",
  messagingSenderId: "659221366357",
  appId: "1:659221366357:web:3404a7fe0d9a8e59c2b6dc",
  measurementId: "G-YKW3PWH4KD"
};

firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start("#firebaseui-auth-container", {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
});

export default firebase;