import {createContext} from 'react'

const AuthContext = createContext({
	accessToken: null,
	refreshToken: null,
	login: null,
	logout: null,
	isAuth: false,
	setIsAuth: null
})

export default AuthContext