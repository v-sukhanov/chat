import React, {useState, useContext} from 'react'
import './Sign.css'
import SignInput from './SignInput/SignInput'

import AuthContext from '../../context/AuthContext'

const SignIn = () => {

	const [data, setData] = useState({
		user_name : '',
		password: ''
	})

	const authContext = useContext(AuthContext)

	const sybmitHandler = async () => {
		try {
			authContext.login(data)
		} catch(e) {
			console.log(e)
		}
	}

	return (
		<div className="form-sign">
			
			<form onSubmit={e => e.preventDefault()}>
				<SignInput labelText='Email' inputName='email' data={data} setData={setData}/>
				<SignInput labelText='Password' inputName='password' data={data} setData={setData} type={"password"}/>
				<button className="send-button" onClick={sybmitHandler}>Next</button>
			</form>
		</div>

		
	)
}

export default SignIn