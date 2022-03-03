import { signInWithPopup } from 'firebase/auth'
import React from 'react'

const SignIn = ({ auth, provider }: any) => {
  return (
    <div>
      <button onClick={() => signInWithPopup(auth, provider)}>Sign in</button>
    </div>
  )
}

export default SignIn
