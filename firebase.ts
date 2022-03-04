import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  query,
  limit,
  orderBy,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAcszJXj9_CWP0Pn3O3RKg-vEBR_TBVFMo',
  authDomain: 'chat-8e45c.firebaseapp.com',
  projectId: 'chat-8e45c',
  storageBucket: 'chat-8e45c.appspot.com',
  messagingSenderId: '477251945871',
  appId: '1:477251945871:web:46833cbb9634dc379677fa',
  measurementId: 'G-D6R2RPLMCC',
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider()
const db = getFirestore(firebaseApp)

export {
    auth,
    provider,
    db
}
