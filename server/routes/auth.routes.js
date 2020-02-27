const {Router} = require('express')
const {User} = require('../models/User.js')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const randtoken = require('rand-token')

const config = require('config')

const router = Router()


router.post('/reg', 	
	[
		check('user_name', 'Неккоректное имя').isLength({ min: 1 }),
		check('email', 'Неккоректный email').isEmail(),
		check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 }),
		check('retr_password', 'Неккоректные данные').exists().custom((value, { req }) => (value === req.body.password) && value)
	],
	async(req, res) => {

		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors : errors.array(), message: 'Incorrect data' })
			}

			const { user_name, email, password } = req.body

			const candidate = await User.findOne({ email })

			if (candidate) {
				return res.status(400).json({ message: 'this user alredy exist' })
			}

			const hashedPassword = await bcrypt.hash(password, 12)

			const user = new User({ name: user_name, email, password: hashedPassword })
			await user.save()

			res.status(201).json({ message: 'Пользователь создан' })

		} catch(e) {
			res.status(500).json({ message: "error" })
		}
})

router.post('/log',
	[
		check('email', 'Введите корректный email').isEmail(),
		check('password', 'Минимальная длина пароля 6 символов').exists()
	], 
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array())
			}

			const {email, password} = req.body
			
			const candidate = await User.findOne({ email })

			if (!candidate) {
				return res.status(400).json({ message: 'user not found' })
			}
			

			const isMatch = await bcrypt.compare(password, candidate.password)

			if (!isMatch) {
				return res.status(400).json({ message: 'incorrect password' })
			}

			candidate.refreshToken = randtoken.uid(128)

			const refreshToken = candidate.refreshToken


			
			const accessToken = jwt.sign(
				{ refreshToken },
				config.get('key'),
				{ expiresIn: '500s' }
			)

			candidate.accessToken = accessToken

			await candidate.save()

			res.status(200).json({ accessToken, refreshToken })

		} catch(e) {
			console.log(e)
			res.status(500).json({ message: "somthing has going wrong" })
		}
		
})



router.post('/token', async (req, res) => {


	const { refreshToken } = req.body

	// console.log(req.body)

	const user = await User.findOne({refreshToken})

	// console.log(user)

	if (!user) {
		return res.status(401).json({message: 'Token is not valid'})
	}


	user.refreshToken = await randtoken.uid(128)


	user.accessToken = jwt.sign(
		{ refreshToken: user.refreshToken },
		config.get('key'),
		{ expiresIn: '500s' }
	)

	// console.log(user)

	await user.save();

	// console.log(user.accessToken, 1 , user.refreshToken)
	res.status(200).json({ accessToken: user.accessToken, refreshToken: user.refreshToken })

  })

module.exports = router




