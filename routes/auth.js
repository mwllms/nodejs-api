const express = require('express')
const router = express.Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../helpers/validation')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

// Register new user 
router.post('/register', async (req, res) => {
    // validate user
    const { error } = registerValidation(req.body)
    if (error) res.status(400).json({ error: error.details[0].message })

    const checkEmail = await User.findOne({ email: req.body.email })
    if (checkEmail) res.status(400).json({ error: 'User with this email address already exists.' })

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    // save user to database
    try {
        const save = await user.save()
        res.json({
            data: save
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

// Login user
router.post('/login', async (req, res) => {
    // validate user
    const { error } = loginValidation(req.body)
    if (error) res.status(400).json({ error: error.details[0].message })

    // find user in database by email
    const user = await User.findOne({ email: req.body.email })
    if (!user) res.status(422).json({ error: 'Could not login with those credentials.' })

    // check if password is valid
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) res.status(422).json({ error: 'Could not login with those credentials.' })

    // if everything is correct create jwt token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    if (!token) res.status(400).json({ error: 'Could not create token.' })

    res.json({
        data: {
            token: token
        }
    })
})

// Get user info
router.get('/me', auth, async (req, res) => {
    res.json({
        data: {
            message: 'You are in!'
        }
    })
})

module.exports = router