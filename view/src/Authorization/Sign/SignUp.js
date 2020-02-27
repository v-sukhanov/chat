import React, {useState, useContext} from 'react'
import SignInput from './SignInput/SignInput'
import AuthContext from '../../context/AuthContext'

import './Sign.css'


const SignUp = ({setForm}) => {

	const [data, setData] = useState({
		user_name : '',
		email: '',
		password: '',
		retr_password: ''
	})

	const authContext = useContext(AuthContext)


	const sybmitHandler = async () => {

		try {
			const status = await authContext.signup(data)
			if (status === 201) {
				setForm(0)
			} else {
				
			}
		} catch(e) {
			console.log(e)
		}
		
	}


	return (
		<div className="form-sign">
			
			<form onSubmit={ e => e.preventDefault() } >
				<SignInput labelText='User name' inputName='user_name' data={data} setData={setData} />
				<SignInput labelText='Email' inputName='email' data={data} setData={setData} />
				<SignInput labelText='Password' inputName='password' data={data} setData={setData} type={'password'} />
				<SignInput labelText='Confirm password' inputName='retr_password' data={data} setData={setData} type={'password'} />
				<button className="send-button" onClick={sybmitHandler}>Next</button>
			</form>
		</div>
	)
}

export default SignUp