import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAg0IuJm8N7w0VbQMOv6IWO_KN0wWfRAis',
  authDomain: 'chatapp-d941f.firebaseapp.com',
  projectId: 'chatapp-d941f',
  storageBucket: 'chatapp-d941f.appspot.com',
  messagingSenderId: '757633114255',
  appId: '1:757633114255:web:a474215eda2fc823bd50fa',
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider };
