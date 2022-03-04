import React, { useEffect, useState } from 'react'
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
import { useCollectionData } from 'react-firebase-hooks/firestore'
import SignIn from '../components/SignIn'
import ChatMessage from '../components/ChatMessage'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'
import { auth, db, provider } from '../firebase'

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
          <div className="flex flex-row">
            <div className="fixed">
              <Sidebar />
            </div>
            <Chat user={user} db={db} auth={auth} />
          </div>
        </div>
      ) : (
        <SignIn auth={auth} provider={provider} />
      )}
    </div>
  )
}

export default Index
