import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import getUserEmail from '../lib/getUserEmail'

interface ChatProps {
  id: string
  user: string
}

const Chat = ({ id, users }: ChatProps) => {

	const [user] = useAuthState(auth)
	const userEmail = getUserEmail(users, user)

  return (
    <div>
      <div>
        <button className="inline-flex w-full break-all items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-5 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100">
          <img className='w-8 rounded-full shadow-sm' src="https://picsum.photos/200" alt="" />
          <span className=""></span>
        </button>
      </div>
    </div>
  )
}

export default Chat
