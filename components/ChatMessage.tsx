import React, { useEffect } from 'react'
import { DateTime } from 'luxon'

const ChatMessage = ({ message, user }: { message: any; user: any }) => {
  const { text, uid, createdAt, photoURL } = message

  const checkUser = () => {
    return uid === user.uid
      ? 'bg-indigo-500 text-white border-indigo-200'
      : 'bg-slate-100 text-slate-600 border-slate-200'
  }

  const getUnix = (sec: number) => {
    return DateTime.fromSeconds(sec).toLocaleString(DateTime.DATETIME_MED)
  }

  return (
    <div className="flex flex-row items-end justify-start gap-1">
      <img
        src={photoURL || 'https://picsum.photos/200'}
        className="mb-1 w-3 rounded-full transition-all delay-200 ease-linear hover:w-6"
      />
      <div className="flex flex-row items-center gap-2">
        <div
          className={`inline-flex items-center gap-2 overflow-hidden rounded-2xl border hover:rotate-3 ${checkUser()} py-1 px-3 shadow-sm transition-all delay-200 ease-linear`}
        >
          <p>{text}</p>
        </div>
        <p className="text-sm text-slate-400">
          @ {createdAt ? getUnix(createdAt.seconds) : null}
        </p>
      </div>
    </div>
  )
}

export default ChatMessage
