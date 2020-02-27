import { useState, useCallback, useEffect } from 'react'

import {useCookies} from 'react-cookie'

const cookieName = 'userData'

const request = async (url, method = 'GET', body = null, headers = {}) => {

	try {
		if (body) {
			body = JSON.stringify(body)
			headers['content-type'] = 'application/json'
		}
		const responce = await fetch(url, {method, body, headers})
		const data = await responce.json()
		return { res: data, status: responce.status }

	} catch(e) {
		console.log(e)
		return { data: null, status: 400 }
	}
}

const useAuth = () => {

	const [isAuth, setIsAuth] = useState(false)
	const [cookies, setCookie, removeCookie] = useCookies([cookieName]);


	
	const login = useCallback(  ({ email, password }) => {
		const fetchMyAPI = async () => {
			try {
				const { res, status } = await request('api/auth/log', 'POST', {email, password})
				if (status === 200) {
					setCookie('accessToken', res.accessToken)
					setCookie('refreshToken', res.refreshToken)
					setIsAuth(true)
	
				}
			} catch(e) {
				console.log(e)
			}
		}
		
		fetchMyAPI()

	}, [])

	const logout = useCallback(() => {
		setIsAuth(false)
		removeCookie('accessToken')
		removeCookie('refreshToken')
	}, [])

	const signup = useCallback(async (data) => {
		const {res, status} = await request('api/auth/reg', 'POST', {...data})
		return status
	}, [])

	useEffect(() => {
		if (cookies.accessToken && cookies.refreshToken) {
			setIsAuth(true)
		}
	}, [])



	return { login, logout, signup, isAuth, setIsAuth }

}

export default useAuth