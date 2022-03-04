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
import ChatMessage from '../components/ChatMessage'
import Messages from '../components/Messages'
import Sidebar from '../components/Sidebar'
import { auth, db, provider } from '../firebase'
import Login from './Login'

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
              <Sidebar userInfo={user} />
            </div>
            <Messages user={user} db={db} auth={auth} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Index
