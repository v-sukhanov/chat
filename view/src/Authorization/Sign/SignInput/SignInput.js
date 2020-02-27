import React, { useState, useEffect } from 'react'
import './SignInput.css'

const SignInInput = ({ labelText, inputName, data, setData, type='text' }) => {

	var [inputFocus, setInputFocus] = useState(0)

	const changeHandler = event => { 
		setData({ ...data, [event.target.name]: event.target.value })
	}
	

	return ( 
		<div className="inputBox" id="inputBoxName">
				<input
					type={type}
					name={inputName}
					onFocus={ e => setInputFocus(1) }
					onBlur={ e => setInputFocus(0) }
					onChange={changeHandler}
					value={data[inputName]}
				/>
				<label className={ (inputFocus || data[inputName]) ? "label label_focus" : "label"}>{labelText}</label>
		</div>
	)
}

export default SignInInput	