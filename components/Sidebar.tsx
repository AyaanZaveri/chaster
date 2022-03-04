import React from 'react'
import { db } from '../firebase'

const Sidebar = () => {
  const createChat = () => {
    db.collection('chats').add({
      users: [user.email, input],
    })
  }

  return (
    <div className="flex h-screen w-72 flex-col border-r pl-6">
      <div className="mt-5 flex flex-col gap-5">
        <div>
          <span className="text-3xl font-bold text-slate-800">
            <span className="underline decoration-indigo-500 underline-offset-2">
              Chaster
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
