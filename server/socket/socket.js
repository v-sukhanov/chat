const {User, ChatList, Messages, Online} = require('../models/User.js')
const {ObjectId} = require('mongoose').Types;
const _ = require('lodash')

const socket_listener = (io) => {
	console.log('socket listening')
	
	io.on('connection', async (socket) => {


		const newOnlineUser = await new Online({ userId: socket.handshake.query.id, socketId: socket.id, currentChat: null })
		await newOnlineUser.save()

		socket.on('joinToChats', (chats) => {
			if (chats) {
				chats.forEach(chat => {
					socket.join(chat._id)
				// io.to(chat._id).emit('getMessage', {idChat: chat.id, nameChat: chat.name, nameOwner: 'admin', idOwner: '0', content: `User $(newOnlineUser.name) logged in`})
					
				});
			}
			
		})

		socket.on('joinToChat', (id) => {
			socket.join(id)
		})

		socket.on('sendMessage', async (message) => {
			const chat = await ChatList.findOne({_id: message.idChat})
			const newMess = new Messages({...message, nameChat: chat.name})
			newMess.save()
			console.log(message.idChat)
			io.to(message.idChat).emit('getMessage', message)
		})


		socket.on('disconnect', async () => {
			const online = await Online.findOne({ userId: ObjectId(socket.handshake.query.id)})
			if (online.currentChat) {
				// console.log(online)
				const user = await User.findOne({_id: online.userId})
				// console.log(user)
				// console.log(_.findIndex(user.chats, {id: online.currentChat}))
				// console.log(_.find(user.chats, {id: online.currentChat}))
				user.chats.splice(_.findIndex(user.chats, {id: online.currentChat}), 1, {..._.find(user.chats, {id: online.currentChat}), last_view: new Date()})
				// console.log(user.chats)
				await user.save()
			}
			
			await Online.deleteMany({ userId: ObjectId(socket.handshake.query.id)})
			console.log('good buy')
		})


	})

}

module.exports = socket_listener





// 	socket.on('reqCurrChat', async (id) => {
	// 		const messages = await Messages.find({ idChat: id }).sort('-date')
	// 		socket.emit('resCurrChat',  messages.map((message) => ({
	// 			idChat: message.idChat,
	// 			nameChat: message.nameChat,
	// 			idOwner: message._id,
	// 			nameOwner: message.userName,
	// 			content: message.content,
	// 			date: message.date
	// 		})))
	// 	})




		// socket.on('join', ({name, room}, callback) => {
		// 	const { error, user } = addUser({ id: socket.id, name, room })
	
		// 	if (error)
		// 		return callback(error)
		// 	socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
		// 	socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined}`})
		// 	socket.join(user.room)
	
		// 	io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
	
		// 	callback()
		// })
	
		// socket.on('sendMessage', (message, callback) => {
		// 	const user = getUser(socket.id)
	
		// 	io.to(user.room).emit('message', {user: user.name, text: message})
		// 	io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
	
		// 	callback()
		// })
	
		// socket.on('disconnect', () => {
		// 	const user = removeUser(socket.id)
			
		// 	if (user) {
		// 		io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` })
		// 	}
	
		// })