const express = require('express')
const { register, logIn, logOut } = require('../controllers/auth-controller')
const router = express.Router()

router.post('/register', register)
router.post('/log-in', logIn)
router.get('/log-out', logOut)

module.exports = router
