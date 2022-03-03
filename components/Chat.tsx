import { addDoc, collection, limit, orderBy, query, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ChatMessage from './ChatMessage'
import SignOut from './SignOut'

const Chat = ({ user, db, auth }: { user: any, db: any, auth: any }) => {
  const [input, setInput] = useState('')

  const messagesRef = collection(db, 'messages')

  const q = query(messagesRef, orderBy('createdAt'), limit(20))

  const [messages] = useCollectionData(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  console.log(messages)

  const { uid, photoURL, displayName } = user

  // console.log(q)

  const sendMessage = async (e: any) => {
    e.preventDefault()

    await addDoc(messagesRef, {
      text: input,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      displayName,
    })

    setInput('')
  }

  return (
    <div>
      {messages &&
        messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} user={user} />
        ))}
      <form onSubmit={sendMessage}>
        <input
          value={input}
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
        <SignOut auth={auth} />
      </form>
    </div>
  )
}

export default Chat
