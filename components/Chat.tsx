import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import React, { useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ChatMessage from './ChatMessage'
import SignOut from './SignOut'

const Chat = ({ user, db, auth }: { user: any; db: any; auth: any }) => {
  const [input, setInput] = useState('')

  const messagesRef = collection(db, 'messages')

  const q = query(messagesRef, orderBy('createdAt', 'asc'))

  console.log(q)

  const [messages] = useCollectionData(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  console.log(messages)

  const { uid, photoURL, displayName } = user

  // console.log(q)

  const sendMessage = async (e: any) => {
    e.preventDefault()

    if (input.trim()) {
      await addDoc(messagesRef, {
        text: input,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
        displayName,
      })

      setInput('')
    }
  }

  return (
    <div>
      <SignOut auth={auth} />
      <div className="flex flex-col gap-3">
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} user={user} />
          ))}
      </div>
      <form onSubmit={sendMessage}>
        <div className="flex w-96 flex-row gap-2">
          <input
            value={input}
            type="text"
            className="w-full rounded-md border border-slate-200 bg-white px-4 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200 active:bg-blue-100"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            className="w-2/12 rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-emerald-500 focus:outline-none focus:ring focus:ring-emerald-200 active:bg-emerald-100"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat
