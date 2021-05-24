/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app';

require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');

const firebaseConfig = {
  apiKey: 'AIzaSyCmc3cVSy9G3g8-kRbGROgD2_0Eu0YmG2o',
  authDomain: 'megapromocionales2020.firebaseapp.com',
  databaseURL: 'https://megapromocionales2020.firebaseio.com',
  projectId: 'megapromocionales2020',
  storageBucket: 'megapromocionales2020.appspot.com',
  messagingSenderId: '32953139073',
  appId: '1:32953139073:web:afce557c73323a37ff7280',
  measurementId: 'G-23S3M5JTYT',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {
  firebase,
  db,
  auth,
  storage,
};
