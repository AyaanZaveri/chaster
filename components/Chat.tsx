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
import { IoMdSend } from 'react-icons/io'

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
    <div className=" flex w-full justify-center">
      <div className="m-4 flex w-full flex-col gap-3">
        <div className="flex justify-between">
          <span className='text-3xl font-bold text-slate-800'>Chaster</span>
          <SignOut auth={auth} />
        </div>
        <div className="flex w-full flex-col gap-3">
          {messages &&
            messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} user={user} />
            ))}
        </div>
        <form onSubmit={sendMessage}>
          <div className="absolute bottom-0 left-0 flex w-full flex-row gap-3 bg-white border-t border-slate-200 bg-opacity-50 p-5 backdrop-blur">
            <input
              value={input}
              type="text"
              className="w-full rounded-md border border-slate-200 bg-white px-4 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              className="inline-flex place-items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100"
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

export default Chat
