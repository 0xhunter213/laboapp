import firebase from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {

  apiKey: "AIzaSyA00sqyuqlb1qhk3DwTo3vdXMd9ALl9_DI",

  authDomain: "labo-cf55c.firebaseapp.com",

  projectId: "labo-cf55c",

  storageBucket: "labo-cf55c.appspot.com",

  messagingSenderId: "673031172684",

  appId: "1:673031172684:web:3ee45df1fe17447eedbae9",

  measurementId: "G-0HYBJFQYF7"

};

if (firebase.apps.length == 0){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;