import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBIVCCXDdNxlB2DpecTcKe5SRtCOHvG10Q",
    authDomain: "vue-patterns.firebaseapp.com",
    projectId: "vue-patterns",
    storageBucket: "vue-patterns.appspot.com",
    messagingSenderId: "539152055131",
    appId: "1:539152055131:web:e4126a3f0fad850569b87e",
    measurementId: "G-59DF0LS6HB"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
