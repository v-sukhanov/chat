import React from 'react'
import routes from './routes'
import {BrowserRouter as Router} from 'react-router-dom'
import useAuth from './hooks/auth.hooks'
import AuthContext from './context/AuthContext'



const App = () => {

	const { login, logout, signup, isAuth, setIsAuth } = useAuth()

	console.log('isAuth: ',isAuth)

	return (
		<AuthContext.Provider value={{
            login, logout, signup, setIsAuth
        }}>

			<Router>
				{routes(isAuth)}
			</Router>
		</AuthContext.Provider>
	)

}

export default App