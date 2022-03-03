import React from 'react'

const ChatMessage = ({ message, user }: { message: any; user: any }) => {
  const { text, uid, photoURL } = message

  return (
    <div className="inline-flex bg-slate-50 w-96 p-2 rounded-lg shadow-sm border items-center">
      <img
        src={photoURL || 'https://picsum.photos/200'}
        className="w-8 rounded-full"
      />
      <p>{text}</p>
    </div>
  )
}

export default ChatMessage
