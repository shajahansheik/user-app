import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyD58WtVzxExSDI3yOjNNeevrpo6seqcdoo",
  
    authDomain: "bondaf-test.firebaseapp.com",
  
    projectId: "bondaf-test",
  
    storageBucket: "bondaf-test.appspot.com",
  
    messagingSenderId: "896092686456",
  
    appId: "1:896092686456:web:00612b5720c497d3c4458d"
  
  };
  
export const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


export default db;