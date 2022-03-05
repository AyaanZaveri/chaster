import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import React from 'react'
import Messages from '../../components/Messages'
import Sidebar from '../../components/Sidebar'
import { db } from '../../firebase'
import { get } from 'firebase/database'

const ChatIndex = () => {
  return (
    <div>
      <div>
        <div className="flex flex-row">
          <div className="fixed z-20">
            <Sidebar />
          </div>
          <Messages />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const chatsRef = collection(db, 'chats')

  const ref = await doc(chatsRef, context.params.id)

  const messagesQ = await getDocs(
    query(collection(ref, 'messages'), orderBy('createdAt', 'asc'))
  )

  const messages = messagesQ.docs
    .map((doc) => ({
      ...doc.data(),
    }))
    .map((message) => ({
      ...message,
      createdAt: new Date(message.createdAt.seconds * 1000),
    }))

    const getChat = await getDoc(ref)
    const chat = {
      ...getChat.data(),
      id: getChat.id,
    }

}

export default ChatIndex
