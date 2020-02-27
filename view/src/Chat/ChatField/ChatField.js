import React, { useEffect } from 'react'

import ScrollToBottom from 'react-scroll-to-bottom'

import './ChatField.css'
import ChatFieldInput from './ChatFieldInput/ChatFieldInput'
import ChatFieldMessages from './ChatFieldMessages/ChatFieldMessages'

const ChatField = ({ currChat, messages, sendMessage }) => {

	// console.log(currChat)
	// console.log(messages)

	if (currChat) {
		return (
			<div className="chat-field">
				<ChatFieldMessages messages={messages}/>
				<ChatFieldInput currChat={currChat} sendMessage={sendMessage}/>
			</div>
		)
	} else {
		return (
			<div  className="chat-field">
				<span className=" select-chat">Select a chat</span>
			</div>
		)
	}

	
}

export default ChatField