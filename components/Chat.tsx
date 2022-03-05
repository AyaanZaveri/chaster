import { collection, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../firebase'
import getRecipientEmail from '../lib/getRecipientEmail'

interface ChatProps {
  id: string
  users: string[]
}

const Chat = ({ id, users }: ChatProps) => {
  const [user] = useAuthState(auth)

  const router = useRouter()

  const chatRoute = `/chat/${id}`

  const enterChat = () => {
    router.push(chatRoute)
  }

  const userRef = query(
    collection(db, 'users'),
    where('email', '==', getRecipientEmail(users, user))
  )
  const [recipientSnapshot] = useCollection(userRef)

  const recipient = recipientSnapshot?.docs[0]?.data()
  const recipientEmail = getRecipientEmail(users, user)

  return (
    <div>
      <div>
        <button
          onClick={() => enterChat()}
          className="inline-flex w-full items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-5 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
        >
          {recipient?.photoURL ? (
            <img
              className="w-8 rounded-full shadow-sm"
              src={`${recipient?.photoURL}`}
              alt=""
            />
          ) : (
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border-indigo-200 bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm">
              {recipientEmail[0].toUpperCase()}
            </div>
          )}
          <span className="break-text text-left">
            {recipient?.displayName ? recipient?.displayName : recipientEmail}
          </span>
        </button>
      </div>
    </div>
  )
}

export default Chat
