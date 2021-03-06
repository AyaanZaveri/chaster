import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import {
  useCollection,
  useCollectionData,
} from 'react-firebase-hooks/firestore'
import ChatMessage from './ChatMessage'
import { IoMdSend } from 'react-icons/io'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import getRecipientEmail from '../lib/getRecipientEmail'
import { HiChevronLeft, HiOutlineEmojiHappy } from 'react-icons/hi'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false })

interface UserInfo {
  uid: string | null
  photoURL: string | null
  displayName: string | null
}

const Messages = ({ chat, messages }: any) => {
  const [input, setInput] = useState('')
  const [chosenEmoji, setChosenEmoji] = useState<any>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const onEmojiClick = (event: any, emojiObject: any) => {
    setChosenEmoji(emojiObject)
  }

  const [user] = useAuthState(auth)

  const [messagesSnapshot] = useCollection(
    chat
      ? query(
          collection(doc(collection(db, 'chats'), chat.id), 'messages'),
          orderBy('createdAt', 'asc')
        )
      : null
  )

  console.log(messagesSnapshot)

  const showMessages = () => {
    if (!messagesSnapshot) {
      return null
    }

    return messagesSnapshot?.docs.map((message: any) => (
      <ChatMessage
        key={message.id}
        message={{
          ...message.data(),
          createdAt: serverTimestamp(),
        }}
      />
    ))
  }

  const [recipientSnapshot] = useCollection(
    chat
      ? query(
          collection(db, 'users'),
          where('email', '==', getRecipientEmail(chat?.users, user))
        )
      : null
  )

  const recipient = recipientSnapshot?.docs[0]?.data()

  console.log(recipient)

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!input) return null

    chat
      ? addDoc(collection(doc(collection(db, 'chats'), chat.id), 'messages'), {
          user: user?.email,
          text: input,
          createdAt: serverTimestamp(),
          photoURL: user?.photoURL,
          displayName: user?.displayName,
          uid: user?.uid,
        })
      : null

    setInput('')
    scrollToBottom()
  }

  const dummy = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (chosenEmoji?.emoji) {
      setInput(input + chosenEmoji?.emoji)
      setShowEmojiPicker(false)
    }
  }, [chosenEmoji?.emoji])

  console.log(input)

  useEffect(() => {
    // scrollToBottom()
  }, [messages])

  return (
    <div className="flex w-full justify-center md:ml-80">
      <div className="flex w-full flex-col gap-3">
        <div className="fixed top-0 left-0 flex w-full flex-row gap-3 border-b border-slate-200 bg-white bg-opacity-50 p-5 backdrop-blur-sm dark:border-slate-600 dark:bg-slate-800">
          <div className="inline-flex items-center gap-2 md:ml-80">
            <a href="/">
              <HiChevronLeft className="h-7 w-7 text-indigo-500 md:hidden" />
            </a>
            {recipient?.photoURL ? (
              <img
                className="w-8 rounded-full shadow-xl"
                src={`${recipient?.photoURL}`}
                alt=""
              />
            ) : (
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border-indigo-200 bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-xl">
                {getRecipientEmail(chat?.users, user)[0].toUpperCase()}
              </div>
            )}
            <h1 className="text-lg font-semibold text-slate-800 dark:text-white">
              {getRecipientEmail(chat?.users, user)}
            </h1>
          </div>
        </div>
        <div className="mt-[4.5rem] bg-white dark:bg-slate-800 h-full w-full flex-col gap-3">
          <div className="-z-20 m-5 flex flex-col gap-3 pb-24">
            {showMessages()}
            <span ref={dummy}></span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div
            className={`${
              showEmojiPicker ? 'absolute' : 'hidden'
            } bottom-0 z-50 ml-5 mb-24`}
          >
            <Picker onEmojiClick={onEmojiClick} />
          </div>
          <div className="fixed bottom-0 left-0 flex w-full flex-row gap-3 border-t border-slate-200 bg-white bg-opacity-50 p-5 backdrop-blur-sm dark:border-slate-600 dark:bg-slate-800">
            <button
              className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 md:ml-80"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              type="button"
            >
              <HiOutlineEmojiHappy className="h-5 w-5" />
            </button>
            <input
              value={input}
              type="text"
              className="w-full rounded-md border border-slate-200 bg-white px-4 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-600 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
              type="submit"
            >
              Send
              <IoMdSend className="ml-2 h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Messages
