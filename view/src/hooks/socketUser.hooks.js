import { useState, useEffect, useCallback } from 'react'
import io from 'socket.io-client'
import {useCookies} from 'react-cookie'

import Cookies from 'js-cookie'

import _ from 'lodash'

const  cookieName = 'userData'



const fetchMethod = async (url, method = 'GET',  body = null, token, headers = {}) => {

	try {
		if (body) {
			body = JSON.stringify(body)
		}
		headers['content-type'] = 'application/json'
		headers['Authorization'] = `Bearer ${token}`
		const responce = await fetch(url, {method, body, headers})

		const data = await responce.json()

		return { res: data, status: responce.status }

	} catch(e) {
		console.log(e)
		return { res: null, status: 401 }
	}
}

const updateTokens = async (cookies) => {
	const { res, status} = await fetchMethod('api/auth/token', 'POST', { accessToken: cookies.accessToken, refreshToken: cookies.refreshToken})
	if (status === 200) {
		return {
			accessToken: res.accessToken,
			refreshToken: res.refreshToken
		}
	}
	return {}
}

const request = async (url, method = 'GET',  body = null) => {
	const {res, status} = await fetchMethod(url, method, body, Cookies.get('accessToken'))

	if (status == 401) {
		console.log('refresh token')
		const {accessToken, refreshToken} = await updateTokens({ accessToken: Cookies.get('accessToken'), refreshToken: Cookies.get('refreshToken') })
		if (accessToken && refreshToken) {
			const {res, status} = await fetchMethod(url, method, body, accessToken)
			Cookies.set('accessToken', accessToken)
			Cookies.set('refreshToken', refreshToken)
			return (res)
		}
	}
	return (res)
}


const useSocketUser = (ENDPOINT, setIsAuth) => {

	const [userInf, setUserInf] = useState({})
	const [socket, setSocket] = useState(null)

	useEffect( () => {
		if (!Cookies.get('accessToken') || !Cookies.get('refreshToken')) {
			setIsAuth(false)
			return ;
		}

		console.log('init')

		const fetchMyApi = async () => {
			try {
				var responce = await request('user/init', 'POST', null)
				if (!responce)
					throw new Error('Unauthorization')
				
				
				setUserInf({...responce})
				
				setSocket(io(ENDPOINT, {query: { id: responce.id }}))

				
				


			} catch(e) {
				console.log(e)
				socket && socket.emit('disconnect')
				setIsAuth(false)
			}
		}

		fetchMyApi()

		
	}, [ENDPOINT])
	
	useEffect(() => {
		if (socket) {
			socket.emit('joinToChats', userInf.chats)
			
			

			socket.on('disconnect', () => {
				console.log('us kicked out')
			})
			

		}
		
		return () => {
			socket && socket.off()
		}
	}, [socket])

	useEffect(() => {
		socket && socket.on('getMessage', (message) => {
			const temp = _.find(userInf.chats, {_id: message.idChat})
			if (temp) {
				temp.messages && temp.messages.push(message)
				temp.lmessage = message
				if (message.idChat !== userInf.currChat) {
					_.find(userInf.chats, {_id: message.idChat}).countUnreadMessages++
				}
				setUserInf({...userInf})
			}
			
		})
		return () => {
			socket && socket.off('getMessage')
		}
	}, [userInf, socket])

	const getAllChat = useCallback(async () => {
		try {
			const responce = await request('user/getAllChat', 'POST', { _id: userInf.id })

			if (!responce)
				throw new Error('Unauthorization')
			return responce.allChat || []
		} catch(e) {
			console.log(e)
			socket && socket.emit('disconnect')
			setIsAuth(false)
		}
		
		return []
	}, [userInf])
	
	const addChat = useCallback(async ( chatId ) => {
		try {

			const responce = await request('user/addChat', 'POST', { userId: userInf.id, chatId })

			if (!responce)
				throw new Error('Unauthorization')
			socket && socket.emit('joinToChat', chatId)
			setUserInf({...userInf, chats: [...userInf.chats, responce.chat]})
		} catch(e) {
			console.log(e)
			setIsAuth(false)
		}
		
	}, [userInf, socket])

	const addCurrChat = useCallback(async (chatId) => {
		_.find(userInf.chats, {_id: chatId}).countUnreadMessages = 0
		if (!_.find(userInf.chats, {_id: chatId}).messages) {
			try {
				const responce = await request('user/addCurrChat', 'POST', { userId: userInf.id, chatId, isRequeredResponce: true })
	
				if (!responce)
					throw new Error('Unauthorization')
	
	
				_.find(userInf.chats, {_id: chatId}).messages = responce.messages
				setUserInf({...userInf, currChat: chatId})
	
			} catch(e) {
				console.log(e)
				socket && socket.emit('disconnect')
				setIsAuth(false)
			}
		} else {
			request('user/addCurrChat', 'POST', { userId: userInf.id, chatId, isRequeredResponce: false })
			setUserInf({...userInf, currChat: chatId})
		}
		
	}, [userInf])

	const sendMessage = useCallback(async (message) => {
		try {
			if (!socket)
				throw new Error('socket undefined')

			
			socket.emit('sendMessage', {
				idChat: userInf.currChat,
				nameChat: userInf.currChat.name,
				idOwner: userInf.id,
				nameOwner: userInf.name,
				content: message,
				date: new Date()
			})
			
		} catch(e) {
			console.log(e)
		}
	}, [userInf])

	const createChat = useCallback(async (nameChat) => {
		try {
			console.log(userInf)
			const responce = await request('user/createChat', 'POST', { nameChat })
	
			if (!responce)
				throw new Error('Unauthorization')
			console.log(responce._id)
			addChat(responce._id)
		} catch(e) {
			
		}
	}, [userInf])

	return { userInf, getAllChat, addChat, addCurrChat, sendMessage, createChat }
}

export default useSocketUser

