import firebase from 'firebase';
  require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyCVqotWeKJR8oOIKcBD7dcEOWww66A8XTA",
    authDomain: "book-saannttaa.firebaseapp.com",
    projectId: "book-saannttaa",
    storageBucket: "book-saannttaa.appspot.com",
    messagingSenderId: "65464091254",
    appId: "1:65464091254:web:2ecc5f42350dc52a6cd557"
  };
   // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase.firestore();