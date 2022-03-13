/*
  connect firebase to expo go app
*/

import firebase from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {

  apiKey: "",

  authDomain: "labo-cf55c.firebaseapp.com",

  projectId: "labo-cf55c",

  storageBucket: "",

  messagingSenderId: "",

  appId: "",

  measurementId: ""

};

if (firebase.apps.length == 0){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
