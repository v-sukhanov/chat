import React, {useContext, useState} from 'react'
import './CreateChat.css'
import SocketUserContext from '../../../context/SocketUserContext'

const CreateChat = ({ setModalWindow }) => {

	const { createChat } = useContext(SocketUserContext)
	const [nameChat, setNameChat] = useState('')
	const clickHandler = (e) => {
		e.preventDefault()
		nameChat && createChat(nameChat)
		setModalWindow('')
	}

	return (
		<div className="modal-chats" onClick={e =>{
			if (e.target === e.currentTarget) {
				setModalWindow('')
			}
		}}>
			<div className="chats-box chats-box-create ">
				<div className="chats-header">
					<div className="chat-header-button-wrap">
						
					
						<div className="chat-header-title">
							<span>Create Chat</span>
						</div>
						<div>

						</div>
						

						<div className="chat-header-button" onClick={e => setModalWindow('')}>
							<span>Close</span>
						</div>
					</div>
				</div>
				 
				
				<div className="chats-content">
					<div className="chats-content-search">
						<input type="text" placeholder="Enter a chat name" onChange={e => setNameChat(e.target.value) } value={nameChat} />
					</div>			
					
					
				</div>

				<div className="chats-footer" onClick={clickHandler}>
					<span>Create</span>
				</div>

			</div>

		</div>
	)
}

export default CreateChat