import { signOut } from 'firebase/auth'
import React from 'react'
import { HiLogout } from 'react-icons/hi'

const SignOut = ({ auth }: any) => {
  return (
    <div>
      <button
        onClick={() => signOut(auth)}
        className="inline-flex gap-2 place-items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100"
      >
        Sign out
        <HiLogout className='w-5 h-5' />
      </button>
    </div>
  )
}

export default SignOut
