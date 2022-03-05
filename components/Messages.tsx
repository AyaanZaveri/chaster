import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ChatMessage from './ChatMessage'
import { IoMdSend } from 'react-icons/io'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'

interface UserInfo {
  uid: string | null
  photoURL: string | null
  displayName: string | null
}

const Messages = () => {
  const [input, setInput] = useState('')

  const [user] = useAuthState(auth)

  console.log(user)

  const dummy = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const messagesRef = collection(db, 'messages')

  const q = query(messagesRef, orderBy('createdAt', 'asc'))

  console.log(q)

  const [messages] = useCollectionData(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  console.log(messages)

  // console.log(q)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="ml-80 flex w-full justify-center">
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-3 pb-16">
          <div className="-z-20 m-5 flex flex-col gap-3">
            {messages &&
              messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} user={user} />
              ))}
            <span ref={dummy}></span>
          </div>
        </div>
        <form>
          <div className="fixed bottom-0 left-0 flex w-full flex-row gap-3 border-t border-slate-200 bg-white p-5">
            <input
              value={input}
              type="text"
              className="ml-80 w-full rounded-md border border-slate-200 bg-white px-4 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              className="inline-flex w-1/12 items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100"
              type="submit"
            >
              Send
              <IoMdSend className="ml-2 h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Messages
