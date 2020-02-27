import React from 'react'
import './Navigation.css'

const Navigation = ({ form, setForm }) => {
	return (
		<div className="navigation">
			<div className={ form ? "nav-box active" : "nav-box inactive" } >
				<a onClick={e => setForm(1)}>Sign up </a>
			</div>
			<div className={ !form ? "nav-box active" : "nav-box inactive" } >
				<a onClick={e => setForm(0)}>Sign in</a>
			</div>
		</div>
	)
}

export default Navigation