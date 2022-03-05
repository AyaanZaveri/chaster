import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import GoogleLogo from '../components/GoogleLogo'
import { auth, provider } from '../firebase'

const Login = () => {
  return (
    <div className="grid h-screen place-items-center">
      <button
        onClick={() => signInWithPopup(auth, provider)}
        className="inline-flex place-items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
      >
        <GoogleLogo width={18} height={18} />
        Sign in with Google
      </button>
    </div>
  )
}

export default Login
