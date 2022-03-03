import React from 'react'

const ChatMessage = ({ message, user }: { message: any; user: any }) => {
  const { text, uid, photoURL } = message

  return (
    <div className="inline-flex bg-slate-50 hover:bg-slate-100 transition-all w-96 p-2 rounded-lg shadow-sm border items-center gap-2">
      <img
        src={photoURL || 'https://picsum.photos/200'}
        className="w-8 rounded-full"
      />
      <p className='text-slate-700'>{text}</p>
    </div>
  )
}

export default ChatMessage
