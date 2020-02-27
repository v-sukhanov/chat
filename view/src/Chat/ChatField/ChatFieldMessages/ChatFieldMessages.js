import React, { useEffect } from 'react'

import SimbleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css';

import './ChatFieldMessages.css'
import ChatFieldMessage from './ChatFieldMessage/ChatFieldMessage';

const ChatFieldMessages = ({ messages }) => {
	const scrollableNodeRef = React.createRef();
	const messageWrapRef = React.createRef();


	useEffect(() => {
		scrollableNodeRef.current.scrollTop = scrollableNodeRef.current.scrollHeight - scrollableNodeRef.current.clientHeight
		if (scrollableNodeRef.current.scrollHeight > scrollableNodeRef.current.clientHeight) {
			messageWrapRef.current.className = 'messages-wrap scroll-show'
		} else {
			messageWrapRef.current.className = 'messages-wrap'
		}
	}, [scrollableNodeRef])



	return (
		<div className="messages-wrap" ref={messageWrapRef}>
			<div className="messages-hide-scroll">

				<div className="messages-wr">

					<SimbleBar autoHide={true} className="messages-scroll" scrollableNodeProps={{ ref: scrollableNodeRef }} >
							<div className="messages">
								
								{
									
									messages && messages.length && messages.map((message, index, array)=> (
										<ChatFieldMessage key={index} prev_mess={index >= 0 ? array[index - 1] : null} message={message} index={index}/>
									))
								}
							</div>
						
						
					</SimbleBar>
				</div>
				
			</div>
		</div>
	)
}

export default ChatFieldMessages