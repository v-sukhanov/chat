import React from 'react'

import img_user from './user.png'

const Chat = ( { chat, index, choseChat, addChoseChat } ) => {
	return (
		<li className={index === choseChat ?  "chat-wrap chose-chat": "chat-wrap"}  value={index} onClick={e => addChoseChat(e.currentTarget.value)}>
			<div className="chat-img-wrap">
				<div className="chat-img" >
					<img src={img_user} alt="user" width="25"/> 
				</div>
			</div>
			<div className="chat-inf-wrap">
				<div className="chat-inf-name">
					<span>{chat.name}</span>
				</div>
			</div>
		</li>
	)
}

export default Chat