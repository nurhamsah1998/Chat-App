import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAg0IuJm8N7w0VbQMOv6IWO_KN0wWfRAis',
  authDomain: 'chatapp-d941f.firebaseapp.com',
  projectId: 'chatapp-d941f',
  storageBucket: 'chatapp-d941f.appspot.com',
  messagingSenderId: '757633114255',
  appId: '1:757633114255:web:a474215eda2fc823bd50fa',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export { db, auth, provider };
