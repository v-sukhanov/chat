import React, { useEffect, useState, useContext } from 'react'
import SimbleBar from 'simplebar-react'
import './AddChat.css'
import Chat from './Chat/Chat'
import SocketUserContext from '../../../context/SocketUserContext'


const AddChat = ( { setModalWindow } ) => {

	const { getAllChat, addChat } = useContext(SocketUserContext)

	const [allChat, setAllChat] = useState([])
	const [choseChat, setChoseChat] = useState(-1)

	useEffect(() => {
		const  fetchMethod =  async() => {
			const temp = await getAllChat()
			setAllChat(temp)
		}
		fetchMethod()
	}, [])

	const addChoseChat = (index) => {
		setChoseChat(index)
	}

	const clickHandler = (e) => {
		e.preventDefault()
		if (choseChat === -1)
			return ;
		addChat(allChat[choseChat]._id)
		setModalWindow('')
	}


	return (
		<div className="modal-chats" onClick={e =>{
			if (e.target === e.currentTarget) {
				setModalWindow('')
			}
		}}>
			<div className="chats-box">
				<div className="chats-header">
					<div className="chat-header-button-wrap">
						
					
						<div className="chat-header-title">
							<span>Chats</span>
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
						<input type="text" placeholder="Search"/>
					</div>


							
						

					<div className="chats-scroll-wrap">
							
						<div className="chats-wrap">
							<SimbleBar autoHide={true} className="chats-scroll" >
								<ul className="chats-content-list">
									
									{
										allChat.map((chat, index) => {
											return <Chat key={index} index={index} chat={chat} choseChat={choseChat} addChoseChat={addChoseChat} />
										})
									}
								</ul>
							</SimbleBar>
						</div>
						
						
					</div>
					
					
					
				</div>

				<div className="chats-footer" onClick={clickHandler}>
					<span>Add</span>
				</div>

			</div>

		</div>
	)
}

export default AddChat