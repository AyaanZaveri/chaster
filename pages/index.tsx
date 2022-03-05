import React from 'react'
import Messages from '../components/Messages'
import Sidebar from '../components/Sidebar'
import { auth } from '../firebase'
import Login from './login'
import { useAuthState } from 'react-firebase-hooks/auth'

const Index = () => {

  const [user] = useAuthState(auth)

  return (
    <div>
      {user ? (
        <div>
          <div className="flex flex-row">
            <div className="fixed z-20">
              <Sidebar />
            </div>
            <Messages />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Index
