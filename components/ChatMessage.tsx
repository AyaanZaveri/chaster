import React, { useEffect } from 'react'

const ChatMessage = ({ message, user }: { message: any; user: any }) => {
  const { text, uid, photoURL } = message

  const checkUser = () => {
    return uid === user.uid
      ? 'bg-blue-500 text-white'
      : 'bg-slate-100 text-slate-600'
  }

  return (
    <div className='flex flex-row items-start justify-start'>
      <div
        className={`inline-flex items-center gap-2 overflow-hidden rounded-full border ${checkUser()} py-1 px-3 shadow-sm`}
      >
        <p>{text}</p>
      </div>
    </div>
  )
}

export default ChatMessage
