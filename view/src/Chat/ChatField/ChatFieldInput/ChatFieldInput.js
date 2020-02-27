import React, { useState, useEffect } from 'react'

import './ChatFieldInput.css'
import img_user from './user.png'

const ChatFieldInput = ({ currChat, sendMessage }) => {
	
	const [message, setMessage] = useState('')

	useEffect(() => {
		setMessage('')
	}, [currChat])


	const sendHandler = (e, message) => {
		if (message) {
			sendMessage(message)
			setMessage('')
		}
		e.preventDefault()
	}
	

	return (
		<div className="input-field">
			<div className="send-panel-wrap">
				<div className="send-from-wrap">
					<div className="send-form-img-wrap">
						<div className="send-form-img">
							<img src={img_user} alt="user" width="40"/>
						</div>
					</div>
					
					<div className="send-form">
						<div className="send-form-input">
							<textarea
								placeholder="type a message..."
								onChange={e => setMessage(e.target.value)}
								value={message}
								onKeyPress={e => e.key === 'Enter' ? sendHandler(e, message) : null}
							>
							</textarea>
						
						</div>

						<div className="send-form-button">
							<button onClick={e => sendHandler(e, message)}>
								Отправить
							</button>
						</div>
						
					</div>
					
					<div className="send-form-img-wrap">
						<div className="send-form-img">
							<img src={img_user} alt="user" width="40"/>
						</div>
					</div>
				</div>
				
			</div>
			
		</div>
	)
}

export default ChatFieldInput