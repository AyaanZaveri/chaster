import { signOut } from 'firebase/auth'
import React from 'react'

const SignOut = ({ auth }: any) => {
  return (
    <div>
      <button onClick={() => signOut(auth)}>Sign out</button>
    </div>
  )
}

export default SignOut
