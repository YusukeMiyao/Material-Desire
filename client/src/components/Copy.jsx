// import { styled } from "@material-ui/core";

// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/database";
// import "firebase/storage";
// import { Redirect } from "react-router-dom";
// import Home from "../components/Home";

// var firebaseui = require("firebaseui");
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

// firebase.initializeApp(firebaseConfig);

// // export const ui = new firebaseui.auth.AuthUI(firebase.auth());

// // ui.start("#firebaseui-auth-container", {
// //   signInOptions: [
// //     firebase.auth.EmailAuthProvider.PROVIDER_ID,
// //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
// //     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
// //     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
// //   ],
// //    signInFlow: "redirect",
// //       signInSuccessUrl: "/home",
// // });
// // firebaseui.auth.FirebaseUiHandler.languageCode='ja';
// var data = null;
// let anonymousUser = firebase.auth().currentUser;
// export const uiConfig = {
//   // callbacks: {
//   //   signInSuccessWithAuthResult: (user,redirectUrl,signInSuccessUrl) => {
//   //     if (user.isAnonymous) {
//   //       console.log(user,'匿名',)
//   //       signInSuccessUrl='/anony'
//   //      return true
//   //     }
//   //     else {
//   //       signInSuccessUrl='/home'
//   //       console.log('home')
//   //       return true
//   //     }
//   //   },

//   signInFlow: "redirect",
//   signInSuccessUrl: "/home",
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//     firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
//   ],
//   autoUpgradeAnonymousUsers: true,

//   // Terms of service url.
//   // tosUrl: '',
// };

// export const uiConfigSecand = {
//   signInFlow: "redirect",
//   signInSuccessUrl: "/home",
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//   ],
//   // Whether to upgrade anonymous users should be explicitly provided.
//   // The user must already be signed in anonymously before FirebaseUI is
//   // rendered.
//   autoUpgradeAnonymousUsers: true,
//   signInSuccessUrl: "/home",
//   callbacks: {
//     // 認証成功時のコールバック
//     signInSuccessWithAuthResult: (authResult, redirectUrl) => {
//       let providerID = authResult.credential.providerId;
//       console.log(authResult);
//       switch (providerID) {
//         case "google.com":
//           var credential = firebase.auth.GoogleAuthProvider.credential;
//           break;
//         case "facebook.com":
//           var credential = firebase.auth.FacebookAuthProvider.credential;
//           break;
//         case "twitter.com":
//           var credential = firebase.auth.TwitterAuthProvider.credential;
//           break;
//         default:
//           break;
//       }
//       // let credential = authResult.credential
//       firebase
//         .auth()
//         .currentUser.linkWithCredential(credential)
//         .then(function (usercred) {
//           var user = usercred.user;
//           const uid = firebase.auth().currentUser.uid;
//           firebase
//             .database()
//             .ref("/users/" + uid)
//             .update({
//               count: stateData.count,
//               lists: stateData.lists,
//               totalPrice: stateData.totalPrice,
//             });
//           console.log("Anonymous account successfully upgraded", user);
//         })
//         .catch(function (error) {
//           console.log("Error upgrading anonymous account", error);
//         });
//       const uid = firebase.auth().currentUser.uid;
//       firebase
//         .database()
//         .ref("/users/" + uid)
//         .update({
//           count: this.state.count,
//           lists: this.state.lists,
//           totalPrice: this.state.totalPrice,
//         });
//       return true;
//     },
//     //         // ※ 認証失敗時のコールバック
//     //     signInFailure:(error.firebaseui.auth.AuthUIError) => {
//     //           console.warn("signInFailure", error);
//     //           // const auth = firebase.auth();
//     //           // const credential = error.credential;
//     //           // const authResult = await auth.signInWithCredential(credential);
//     //            if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
//     //         return Promise.resolve();
//     //       }
//     //  var cred = error.credential;
//     //       var app = firebase.auth
//     //       return app.database().ref('users/' + firebase.auth().currentUser.uid)
//     //           .once('value')
//     //           .then(function(snapshot) {
//     //             return firebase.auth().signInWithCredential(cred);
//     //           })
//     //           .then(function(user) {
//     //             return app.database().ref('users/' + user.uid).set(data);
//     //           })
//     //           .then(function() {
//     //             return anonymousUser.delete();
//     //           }).then(function() {
//     //             data = null;
//     //             window.location.assign('/home');
//     //           });
//     //         // },
//     //         // // UI表示時のコールバック
//     //         // uiShown: () => console.info("uiShown")

//     // }
//   },
// };
// // ui.start('#firebaseui-auth-container', uiConfig);

// // export const providerGoogle = new firebase.auth.GoogleAuthProvider();
// // export const providerFacebook = new firebase.auth.FacebookAuthProvider();
// // export const providerTwitter = new firebase.auth.TwitterAuthProvider();
// // export const language = firebase.auth().languageCode = "ja";

// var database = firebase.database();

// export default firebase;
