import React, { useEffect } from 'react'
import { DateTime } from 'luxon'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

const ChatMessage = ({ message }: { message: any }) => {
  const { text, uid, createdAt, photoURL, displayName } = message

  const [user] = useAuthState(auth)

  const checkUser = () => {
    return uid === user?.uid
      ? 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white border-indigo-200 dark:border-indigo-600'
      : 'bg-slate-100 text-slate-600 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white'
  }

  const getUnix = (sec: number) => {
    return DateTime.fromSeconds(sec).toLocaleString(DateTime.DATETIME_MED)
  }

  return (
    <div
      className={`grid grid-flow-col ${
        uid === user?.uid ? 'place-items-end' : 'place-items-start'
      } gap-1`}
    >
      {/* <img
        src={photoURL || 'https://picsum.photos/200'}
        className="mb-1 w-3 rounded-full transition-all delay-200 ease-linear hover:w-6"
      /> */}
      <div
        className={`grid ${
          uid === user?.uid ? 'place-items-end' : 'place-items-start'
        } w-1/2 items-center`}
      >
        <div
          className={`inline-flex items-center gap-2 overflow-hidden rounded-2xl border hover:rotate-1 ${checkUser()} py-1 px-3 shadow-sm transition-all delay-200 ease-linear`}
        >
          <p>{text}</p>
        </div>
        <p className="text-sm text-slate-400">
          {/* @ {createdAt ? getUnix(createdAt.seconds) : null} */}
        </p>
      </div>
    </div>
  )
}

export default ChatMessage
