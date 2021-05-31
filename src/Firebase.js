import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBP5TJ1m25u22qrzgaN05l8w9QN3odq4-0",
    authDomain: "tes-vue-3c38b.firebaseapp.com",
    projectId: "tes-vue-3c38b",
    storageBucket: "tes-vue-3c38b.appspot.com",
    messagingSenderId: "122664509235",
    appId: "1:122664509235:web:19163853882e4ccbae2846",
    measurementId: "G-17CW48WN3T"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();