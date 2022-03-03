import React, { useState } from 'react'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

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

const Index = () => {
  const [user, setUser] = useState<any>(null)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    }
  })

  console.log(user)

  return (
    <div>
      {user ? (
        <div>
          <Chat />
          {JSON.stringify(user)}
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  )
}

const SignIn = () => {
  return (
    <div>
      <button onClick={() => signInWithPopup(auth, provider)}>Sign in</button>
    </div>
  )
}

const SignOut = () => {
  return (
    <div>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  )
}

const Chat = () => {
  const messagesRef = collection(db, 'messages')
}

export default Index
