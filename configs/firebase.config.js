require('dotenv').config()
import { initializeApp } from 'firebase/app';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: "",
    databaseURL: "",
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: "",
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: ""
  };
  
const fireBaseApp = initializeApp(firebaseConfig);

module.exports = {fireBaseApp}