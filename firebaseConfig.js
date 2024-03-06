import * as firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";

import { firestore } from "firebase/firestore";

// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDWPwQTep1CwjYrH0Y8sOv4tSTWk8U8w5M",
    authDomain: "testapp-71422.firebaseapp.com",
    projectId: "testapp-71422",
    storageBucket: "testapp-71422.appspot.com",
    messagingSenderId: "667703682475",
    appId: "1:667703682475:web:881b7f9e970afdd6aa5eee",
    measurementId: "G-PH0125NDRY"
  };

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
