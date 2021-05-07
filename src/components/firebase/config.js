import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/performance";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyC582_036DGw3sV1GK0oy35qV5LqoEHc9Y",
  authDomain: "meancloud.firebaseapp.com",
  databaseURL:
    "https://meancloud-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "meancloud",
  storageBucket: "meancloud.appspot.com",
  messagingSenderId: "796211798979",
  appId: "1:796211798979:web:32197d18f0a7a654ac9376",
  measurementId: "G-NG0HSP25BW",
});
firebase.analytics();
var perf = firebase.performance();
export default firebaseConfig;
