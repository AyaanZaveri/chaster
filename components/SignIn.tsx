import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import GoogleLogo from './GoogleLogo'

const SignIn = ({ auth, provider }: any) => {
  return (
    <div className="grid h-screen place-items-center">
      <button
        onClick={() => signInWithPopup(auth, provider)}
        className="inline-flex gap-2 place-items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100"
      >
        <GoogleLogo width={18} height={18} />
        Sign in with Google
      </button>
    </div>
  )
}

export default SignIn
