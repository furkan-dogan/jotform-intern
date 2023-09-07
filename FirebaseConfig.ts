import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDnvhH3NySTQnAZRj8iKN1j2Alsc9fM5TE',
  authDomain: 'jotintern-f464a.firebaseapp.com',
  projectId: 'jotintern-f464a',
  storageBucket: 'jotintern-f464a.appspot.com',
  messagingSenderId: '526126161313',
  appId: '1:526126161313:web:ee79129922568435867fe0',
  measurementId: 'G-N999D5DF8N',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);
