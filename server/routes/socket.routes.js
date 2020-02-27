const {Router} = require('express')
const {User, ChatList, Messages, Online} = require('../models/User.js')
const {ObjectId} = require('mongoose').Types;
const  router = Router()

const _ = require('lodash')


const moment = require('moment')


router.post('/init', async (req, res) => { // add last_view  and countUnreadMessages
	try {
		const user = await User.findOne({ accessToken: req.headers.authorization.slice(7) })

		if (!user) {
			return res.status(400).json({mess: 'i dont know why'})
		}

		var chats = []
		if (user.chats.length) {
			chats = await Messages.aggregate([
				{
					$group: { 
						_id:  '$idChat',
						name: {$first: '$nameChat'},
						lmessage: { $max: {date: '$date', content: '$content',  idOwner: '$idOwner', nameOwner: '$nameOwner', idChat: '$idChat', nameChat: '$nameChat'}},
						isChat: {$first: '$isChat'},
					}
				},
				{
					$match: { $or: [...user.chats.map((chat) => { return {_id: String(chat.id)} })] } 
				}
			])
		}


		

		for (let i = 0; i < chats.length; i++) {
			// console.log( _.find(user.chats, {id: ObjectId(chats[0]._id)}).last_view)
			// console.log( chats[0]._id)
			const countUnreadMessages = await Messages.find({idChat: chats[i]._id, date: {$gt: _.find(user.chats, {id: ObjectId(chats[i]._id)}).last_view}}).countDocuments({})
			// console.log(countUnreadMessages)
			chats[i] = {...chats[i], countUnreadMessages, last_view: _.find(user.chats, {id: ObjectId(chats[i]._id)}).last_view}
		}

		res.status(200).json({
			id: user._id,
			name: user.name,
			chats: chats
			
		})

	} catch(e) {
		console.log(e)
	}
})

router.post('/getAllChat', async (req, res) => {
	try {
		const user = await User.findOne({_id: req.body._id}, { chats: true, _id: false })

		const chats = await ChatList.find({ _id: { $nin: user.chats.map((chat)=> chat.id) } })
		
		// const countUnreadMessages = await Messages.aggregate([
		// 	{
		// 		$match: { idChat: String(chat._id) }
		// 	},
		// 	{
		// 		$gt: { last_view: }
		// 	},
		// 	{
		// 		$count: "myCount"
		// 	}
		// ])
		// console.log(countUnreadMessages)
		res.status(200).json({ allChat: chats })
	} catch(e) {
		console.log(e)
		res.status(500)
	}
})

router.post('/addChat', async (req, res) => {
	try {
		const user = await User.findOne({$and: [{_id: req.body.userId}]})


		if (!_.find(user.chats, {id: ObjectId(req.body.userId)})) {
			const chat = await ChatList.findOne({_id: req.body.chatId})
			user.chats.push({id: chat._id, name: chat.name, isChat: true, last_view: moment().toDate()})
			await user.save()
			const lmessage = await Messages.aggregate([
				{
					$match: { idChat: String(chat._id) }
				}, 
				{
					$sort: {date: -1}
				}, 
				{
					$limit: 1
				}
			])

		

			res.json({chat: {_id: chat._id, name: chat.name, isChat: true, lmessage: lmessage[0], last_view: moment().toDate(), countUnreadMessages: 0}})
		} else {
			res.json({ chat: null })
		}

	} catch(e) {
		console.log(e)
		res.status(500)
	}
})

router.post('/addCurrChat', async (req, res) => {
	try {
		const user = await User.findOne({_id: req.body.userId})
		const online = await Online.findOne({userId: req.body.userId})
		if (online.currentChat !== null) {
			user.chats.splice(_.findIndex(user.chats, {id: ObjectId(online.currentChat)}), 1, {..._.find(user.chats, {id: ObjectId(online.currentChat)}), last_view: new Date()})
		}
		await user.save()

		online.currentChat = req.body.chatId
		await online.save()

		if (req.body.isRequeredResponce) {
			const messages = await Messages.find({idChat: req.body.chatId}).sort({date: 1})
			res.status(200).json({messages: messages})
		} else {
			res.status(200).json({message: 'OK'})
		}
		
	} catch(e) {
		console.log(e)
		res.status(500)
	}
})

router.post('/createChat', async (req, res) => {
	try {
		console.log(req.body)
		const chat = await new ChatList({ name: req.body.nameChat })
		await chat.save()
		const message = await new Messages({nameChat: req.body.nameChat, idChat: chat._id, idOwner: '0', nameOwner: 'admin', content: 'Welcome to our chat', date: new Date()})
		await message.save()
		res.json({_id: chat._id, name: req.body.nameChat, isChat: true, lmessage: message})
	} catch(e) {
		console.log(e)
		res.status(500)
	}
})








module.exports = router
