import React, { useEffect, useContext, useState } from 'react'
import io from 'socket.io-client'

import ChatHeader from './ChatHeader/ChatHeader'
import ChatField from './ChatField/ChatField'
import AuthContext from '../context/AuthContext'

import './Chat.css'
import ChatList from './ChatList/ChatList'
import useSocketUser from '../hooks/socketUser.hooks'
import AddChat from './ModalWindows/AddChat/AddChat'
import SocketUserContext from '../context/SocketUserContext'

import _ from 'lodash'
import CreateChat from './ModalWindows/CreateChat/CreateChat'

let socket

const ENDPOINT = 'localhost:5000'

function getModalWindow(modalWindow, setModalWindow) {
	switch(modalWindow) {
		case 'addChat': 
			return <AddChat setModalWindow={setModalWindow}/>
		case 'createChat':
			return <CreateChat setModalWindow={setModalWindow}/>
		default:
			return null
	}
}

const Chat = () => {

	const authContext = useContext(AuthContext)
	
	const [modalWindow, setModalWindow] = useState('')
	const { userInf, getAllChat, addChat, addCurrChat, sendMessage, createChat } = useSocketUser(ENDPOINT, authContext.setIsAuth)
	// console.log(userInf)
	// console.log(999, userInf)
	// return (
	// 	<div></div>
	// )
	// console.log(userInf)

	return (
		<SocketUserContext.Provider value={{ userInf, getAllChat, addChat, sendMessage, createChat }}> 
			{getModalWindow(modalWindow, setModalWindow)}
			<div className="chat-box" >
				<ChatHeader userName={userInf.name} setModalWindow={setModalWindow}/>
				<div className="chat-content-box">
					<ChatList chats={userInf.chats} currChat={userInf.currChat} addCurrChat={addCurrChat}/>

					<ChatField currChat={userInf.currChat} messages={userInf.currChat ? _.find(userInf.chats, {_id: userInf.currChat}).messages : []} sendMessage={sendMessage}/>
				</div>
			</div>
		</SocketUserContext.Provider>
			
			
		
	)
}	

export default Chat

