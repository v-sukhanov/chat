import React, { useState } from 'react'
import Navigation from './Navigation/Navigation'
import SignIn from './Sign/SignIn'
import SignUp from './Sign/SignUp'
import './Authorization.css'
import Footer from './Footer/Footer'


const Authorization = () => {

	var [form, setForm] = useState(1) // 1 - sign-up, 0 - sign-in

	console.log('this')
	return (
		<div className="AuthBox">
			<div className="wrapper-box">
				<Navigation form={form} setForm={setForm}/>
				{form ? <SignUp setForm={setForm}/> : <SignIn/>}
				
				
				{/* <Footer form={form}/> */}
			</div>
			
		</div>
	)
}

export default Authorization