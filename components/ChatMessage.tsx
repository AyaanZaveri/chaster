import React from 'react'

const ChatMessage = ({ message, user }: { message: any; user: any }) => {
  const { text, uid, photoURL } = message

  return (
    <div className="inline-flex">
      <img
        src={photoURL || 'https://picsum.photos/200'}
        className="w-8 rounded-full"
      />
      <p>{text}</p>
    </div>
  )
}

export default ChatMessage
