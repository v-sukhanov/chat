const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http')
const socket = require('socket.io')
const socket_listener = require('./socket/socket')


const PORT = config.get('port') || 5000

const app = express()

const server = http.createServer(app)

const io = socket(server)

const {User} = require('./models/User')

const jwt = require('jsonwebtoken')
const passport = require('passport')
const {ExtractJwt, Strategy} = require('passport-jwt')


var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.get('key')
}

var strategy = new Strategy(jwtOptions, async (jwtPayload, next) => {
	// console.log('payload received', jwtPayload)
		
	const user = await User.findOne({refreshToken: jwtPayload.refreshToken})
	if (user) {
		next(null, user.name)
	}
	else {
		next(null, false)
	}
})

passport.use(strategy)



app.use(express.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/user', passport.initialize(), passport.authenticate('jwt', {session: false}), require('./routes/socket.routes'))
app.use('/api/auth', require('./routes/auth.routes'))

async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})

		socket_listener(io)

		
		server.listen(PORT, () => {
			console.log('Server has been started')
		})

	} catch(e) {
		console.log('Server Error', e.message)
		process.exit(1)
	}
}


start()