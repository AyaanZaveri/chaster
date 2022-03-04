import { signOut } from 'firebase/auth'
import React from 'react'
import { HiOutlinePlus } from 'react-icons/hi'
import { auth } from '../firebase'

const Sidebar = ({ user }: any) => {
  const addChat = () => {
    const input = prompt(
      'Enter an email you would like to chat with.'
    )?.toLowerCase()

    if (!input) {
      return
    }
  }

  return (
    <div>
      <div className="flex h-screen w-72 flex-col gap-3 border-r">
        <div className="mt-5 flex flex-col gap-5  pl-6">
          <div className="inline-flex items-center gap-2">
            <img
              onClick={() => signOut(auth)}
              src={user.photoURL}
              className="h-8 w-8 rounded-full shadow hover:cursor-pointer"
              alt=""
            />
            <span className="text-3xl font-bold text-slate-800">
              <span className="underline decoration-indigo-500 underline-offset-2">
                Chaster
              </span>
            </span>
          </div>
        </div>
        <div className="grid place-items-center">
          <button className="inline-flex w-10/12 items-center justify-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100">
            Add Chat <HiOutlinePlus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
