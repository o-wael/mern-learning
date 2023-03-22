const express = require('express')
const { signupUser, login, changePassword } = require('../controller/userController')

const router = express.Router()




router.post('/', signupUser)

router.post('/login', login)

router.post('/changePassword', changePassword)





module.exports = router