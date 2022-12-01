import React from 'react'
import pattern from "../../assets/pattern.png"
import { BsChatQuote } from "react-icons/bs";

import useCurrentChat from '../../states/useCurrentChat'
import Upper from './Upper';
import Middle from './Middle';
import Editor from './Editor';

const Message: React.FC = () => {
  const currentChat = useCurrentChat((state) => state.currentChat)

  if(!currentChat){
    return(
      <div className="w-full bg-mBlack-100 rounded-md shadow-xl fcc">
        <div className="flex space-x-2 items-center">
          <BsChatQuote className="text-7xl text-white" />
          <p className="text-white font-semibold text-5xl">MeChat</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-mBlack-100 w-full rounded-md shadow-xl px-5 py-3">
      <Upper/>
      <Middle/>
      <Editor />
    </div>
  )
}

export default Message
