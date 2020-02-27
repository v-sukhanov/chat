import React from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'
import Authorization from './Authorization/Authorization'
import Chat from './Chat/Chat'

const routes = (isAuth) => {

	if (isAuth) {
		return (
			<Switch>
				<Route path="/chat" exact>
					<Chat/>
				</Route>
				
				<Redirect to="/chat"/>
			</Switch>
		)
	}
	return (
		<Switch>
			<Route path="/" exact>
				<Authorization />
			</Route>
			<Redirect to="/"/>

		</Switch>

	)
	
}

export default routes
