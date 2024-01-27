import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDiQ7M03saaJ1EVki4PCYJ7zR1oE3GWUXk',
  authDomain: 'hack-459ed.firebaseapp.com',
  //databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'hack-459ed',
  storageBucket: 'hack-459ed.appspot.com',
  messagingSenderId: '1090142857182',
  appId: '1:1090142857182:web:bc8ed579bde24dcec69f4f',
  measurementId: 'G-48D4KJESQD',
  
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const analytics = getAnalytics(app);
