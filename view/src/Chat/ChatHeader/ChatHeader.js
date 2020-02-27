import React, {useContext, useState} from 'react'
import './ChatHeader.css'

import AuthContext from '../../context/AuthContext'


const ChatHeader = ( { userName, setModalWindow } ) => {

	const authContext = useContext(AuthContext)

	const [openBurger, setOpenBurger] = useState(false)


	

	return (
		<div className="chat-header">


			<div className="tg-head-logo-wrap">
				
				<div className={openBurger ? "tg-head-logo-dropdown tg-head-logo-dropdown-open" : "tg-head-logo-dropdown"} onClick={e => openBurger ? setOpenBurger(false) : setOpenBurger(true)}>
					<a className="tg-head-btn">
						<div className={openBurger ? "icon-hamburger icon-hamburger-open" : "icon-hamburger"}>
							<span></span>
							<span></span>
							<span></span>
						</div>
						<span className="icon-title">Comrades</span>
						
					</a>
				</div>
				
				<div className={openBurger ? "dropdown-menu dropdown-menu-open" : "dropdown-menu"}>
					<ul className="dropdown-menu-list">
						<li className="dropdown-menu-item" onClick={e => {
							setModalWindow('createChat')
							setOpenBurger(false)
						}}>Create chat</li>

						<li className="dropdown-menu-item" onClick={e => {
							setModalWindow('addChat')
							setOpenBurger(false)
						}}>Chats</li>
						<li className="dropdown-menu-item">About us</li>
						<li className="dropdown-menu-item" onClick={() => { authContext.logout()}}>Exit</li>
					</ul>
				</div>
				
			</div>

			<div className="tg-head-main-wrap">
				<div className="name-field">
					<div><span>{userName}</span></div>
				</div>

				<div className="option">
					<div className="kebab" onClick={() => {
						authContext.logout()
					}}>
						<div></div>
						<div></div>
						<div></div>
						
					
					</div>
					
					
				</div>
			</div>


			
			
		</div>
	)
}

export default ChatHeader