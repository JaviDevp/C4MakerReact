import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//ejemplo de credenciales de proyecto en firebase
/* const firebaseConfig = {
    apiKey: "AIzgtryCv7Jnxasr6cknnPQnOdqtUCW9ObkM2k94",
    authDomain: "react-base-app-99461.firebaseapp.com",
    projectId: "react-base-app-99461",
    storageBucket: "react-base-app-99461.appspot.com",
    messagingSenderId: "620387113285",
    appId: "1:620387118285:web:94ee668eac8ea8114c9cd84"
}; */

const firebaseConfig = {
  apiKey: "AIzaSyCv7Jnxasr6cknnPQnOdqtUCW9ObkM2k94",
  authDomain: "react-app-99461.firebaseapp.com",
  projectId: "react-app-99461",
  storageBucket: "react-app-99461.appspot.com",
  messagingSenderId: "620387118285",
  appId: "1:620387118285:web:96e668eac8ea8114c9cd84"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}