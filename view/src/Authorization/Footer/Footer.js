import React from 'react'
import './Footer.css'
import facebook from './pic/facebook.png'
import vk from './pic/vk.png'
import google from './pic/google-plus.png'


const Footer = ({ form }) => {
	if (form) {
		return (
			<div className="footer">
				<span>Вход при помощи социального профиля</span>
				<div className="social-icon">
					
					<div className="soc-box">
						<img src={facebook} width="30" alt="facebook"/>
					</div>

					<div className="soc-box">
						<img src={vk} width="30" alt="vk"/>
					</div>

					<div className="soc-box">
						<img src={google} width="30" alt="google"/>
					</div>
					
				</div>
			</div>

		)
	}
	return (
		<div className="footer"><span className="span-sign-in">Забыли свой пароль?</span></div>
	)
}

export default Footer