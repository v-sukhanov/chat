const {Schema, model} = require('mongoose')




module.exports.User = model('User', new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	refreshToken: {type: String, default: ''},
	accessToken: {type: String, default: ''},
	chats: {type: Array, default: []}
}))

module.exports.UserEmailBox = model('UserEmailBox', new Schema({
	userId: {type: Schema.Types.ObjectId, required: true},
	contacts: {type: Array, default: []},
	chats: {type: Array, default: []},
	messages: {type: Array, default: []}
}))

module.exports.Online = model('Online', new Schema({
	userId: {type: Schema.Types.ObjectId, required: true},
	socketId: {type: String},
	currentChat: {type: Schema.Types.ObjectId}
}))

module.exports.ChatList = model('Chat', new Schema({
	name: {type: String, required: true},
	idUsers: {type: Array, default: []}
}))

module.exports.Messages = model('Message', new Schema({
	nameChat: {type: String, required: true},
	idChat: {type: String, required: true},
	nameOwner: {type: String, required: true},
	idOwner: {type: String, required: true},
	content: {type: String, required: true},
	date: {type: Date, required: true}
}))




// module.exports.Online = model('Online', new)