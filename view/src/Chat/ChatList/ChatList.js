import React from 'react'
import moment from 'moment'

import './ChatList.css'
import img_user from './user.png'
import _ from 'lodash'


const ChatList = ({	chats, currChat, addCurrChat }) => {
	
	chats && chats.sort((x1, x2) => (Date.parse(x1.lmessage.date) < Date.parse(x2.lmessage.date) ? 1 : -1))


	return (
		<div className="im-dialogs-wrap">
			<div className="im-dialogs-col">
				<div className="im-dialogs-search">
					<input type="text" placeholder="Search"/>
				</div>
				
				<ul className="im-dialogs-list">
					{
						chats && chats.map((chat, index) => (
									<li className={currChat && (currChat === chat._id) ? "im-dialog-wrap im-dialog-wrap-open" : "im-dialog-wrap"}
										key={index}
										value={index}
										onClick={e => { addCurrChat(chats[e.currentTarget.value]._id) }}
									>
										<div className="im-dialog">
											<div className="im-dialog-img">
												<img src={img_user} alt="user" width="40"/>
											</div>
											<div className="im-dialog-message-wrap">
												<div className="im-dialog-message-title">{chat.name}</div>
												<div className="im-dialog-message"><span>{chat.lmessage.content}</span></div>
											</div>
											<div className="im-dialog-message-date">
												{chat.lmessage.date ? moment(chat.lmessage.date).format('HH:mm') : null}
											</div>
											{
												chat.countUnreadMessages ?
												<div className="im-dialog-message-notif">
													<div>{chat.countUnreadMessages}</div>
												</div>
													:
												null
											}
											
										</div>
										
									</li>
							))

					}
					
				</ul>
			
			</div>
			
		</div>
	)
}

export default ChatList