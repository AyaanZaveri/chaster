import { signOut } from 'firebase/auth'
import React from 'react'

const SignOut = ({ auth }: any) => {
  return (
    <div>
      <button onClick={() => signOut(auth)} className="inline-flex place-items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100">Sign out</button>
    </div>
  )
}

export default SignOut
