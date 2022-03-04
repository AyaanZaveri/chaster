import React from 'react'

interface ChatProps {
  id: string
  user: string
}

const Chat = ({ id, user }: ChatProps) => {
  return (
    <div>
      <div>
        <div className="bg-gray-100">
          <span>Chat</span>
        </div>
      </div>
    </div>
  )
}

export default Chat
