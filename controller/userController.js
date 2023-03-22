const User = require("../models/user")

const signupUser = async (req, res) => {
    const {
        username,
        email,
        firstname,
        lastname,
        password,
        address,
        phoneNumber
    } = req.body
    try {
        
        if (!username || !email || !firstname || !lastname || !password || !address || !phoneNumber)
        throw Error('All fields must be filled')

        const user = await User.signup(username, email, password, firstname, lastname, address,phoneNumber)

        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const login = async (req, res) => {
    const {
        username,
        password,

    } = req.body
    try {
        
        if (!username || !password )
        throw Error('All fields must be filled')

        const user = await User.login(username,password)

        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}
const changePassword = async (req, res) => {
    const {
        username,
        password,
        newPassword

    } = req.body
    try {
        
        if (!username || !password || !newPassword)
        throw Error('All fields must be filled')

        const user = await User.changePassword(username,password,newPassword)

        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports = {
    signupUser,
    login,
    changePassword
  };