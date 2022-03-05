import { collection, query, where } from 'firebase/firestore'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../firebase'
import getRecipientEmail from '../lib/getRecipientEmail'
import getUserEmail from '../lib/getRecipientEmail'

interface ChatProps {
  id: string
  users: string[]
}

const Chat = ({ id, users }: ChatProps) => {
  const [user] = useAuthState(auth)

	const userRef = query(
    collection(db, 'users'),
    where('email', '==', getRecipientEmail(users, user))
  )
  const [recipientSnapshot] = useCollection(userRef)

  const recipientEmail = getUserEmail(users, user)

  return (
    <div>
      <div>
        <button className="inline-flex w-full items-center gap-2 break-all rounded-md border border-slate-200 bg-white px-3 py-5 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100">
          <img
            className="w-8 rounded-full shadow-sm"
            src="https://picsum.photos/200"
            alt=""
          />
          <span className="">{recipientEmail}</span>
        </button>
      </div>
    </div>
  )
}

export default Chat
