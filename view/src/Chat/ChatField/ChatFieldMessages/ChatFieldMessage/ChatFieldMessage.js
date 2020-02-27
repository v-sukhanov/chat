import React from 'react'
import './ChatFieldMessage.css'
import moment from 'moment'

import img_user from './user.png'

function different_date(prev_date, curr_date) {
	return Number(moment(curr_date).format('mm')) - Number(moment(prev_date).format('mm'))
}


function different_date_day(prev_date, curr_date) {
	// console.log(moment(curr_date).format('mm')) - Number(moment(prev_date).format('mm'))
	return Number(moment(curr_date).format('D')) - Number(moment(prev_date).format('D'))
}

function display_date_more_day(prev_mess, message) {
	
	if ((prev_mess && different_date_day(prev_mess.date, message.date)) || !prev_mess) {
		return (
			<div className="date_more_one_day">
				<span>{moment(message.date).format('DD MMMM YYYY')}</span>
			</div>
		)
	} else {
		return null
	}
}

const ChatFieldMessage = ({ prev_mess, message }) => {
	

	return (
		<div className="message-wrap">
		
			{
				display_date_more_day(prev_mess, message)
			}		
			<div className="message">
				
				<div className="message-img-wrap">
					{
						!prev_mess || different_date(prev_mess.date, message.date) || prev_mess.nameOwner !== message.nameOwner
							?
						<div className="message-img" >
							<img src={img_user} alt="user" width="30"/> 
						</div>
							:
						null
					}
					
				</div>
				
				
				<div className="message-content-wrap">
					{
						!prev_mess || different_date(prev_mess.date, message.date) || prev_mess.nameOwner !== message.nameOwner
							?
						<div className="message-author" style={{color: message.nameOwner === 'admin'? 'red': ''}}>
							<span>{message.nameOwner}</span>
						</div>
							:
						null
					}
					
					<div className="message-content">
						<span>{message.content}</span>
					</div>
				</div>
				<div className="message-date-wrap">
					<div className="message-date">
						<span>{moment(message.date).format('HH:mm')}</span>
					</div>
				</div>

			</div>
		</div>

		
	)
}

export default ChatFieldMessage