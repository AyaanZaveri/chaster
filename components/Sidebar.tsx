import { signOut } from 'firebase/auth'
import {
  addDoc,
  collection,
  getDoc,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { HiOutlinePlus } from 'react-icons/hi'
import { auth, db } from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from './Chat'

const Sidebar = () => {
  const [user] = useAuthState(auth)

  const chatRef = collection(db, 'chats')

  const userChatRef = query(
    chatRef,
    where('users', 'array-contains', user?.email)
  )

  const [chatsSnapshot] = useCollection(userChatRef)

  const checkChatExists = (chatEmail: string) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user: any) => user === chatEmail)?.length > 0
    )

  const addChat = () => {
    const input = prompt(
      'Enter an email you would like to chat with.'
    )?.toLowerCase()

    if (!input) {
      return
    }

    if (input !== user?.email && !checkChatExists(input)) {
      addDoc(chatRef, {
        users: [user?.email, input],
      })
    }
  }

  // console.log(chatsSnapshot?.docs.map((chat) => chat.data().users))

  return (
    <div>
      <div className="flex h-screen w-screen md:w-80 flex-col gap-5 border-r bg-white">
        <div className="mt-5 flex flex-col gap-5 pl-6">
          <div className="inline-flex items-center gap-2">
            <img
              onClick={() => signOut(auth)}
              src={`${user?.photoURL}`}
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
          <button
            onClick={addChat}
            className="inline-flex w-10/12 items-center justify-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100"
          >
            Add Chat <HiOutlinePlus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex justify-center">
          <div className="flex w-10/12 flex-col gap-3">
            {chatsSnapshot?.docs.map((chat) => (
              <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
