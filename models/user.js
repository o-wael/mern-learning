const mongoose = require('mongoose')

const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const userSchema = new Schema({

    username: {
        type: String,
        required: 'Username is required',
        unique: true
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    name: {
        "firstname": {
            "type": "string",
            required: true
        },
        "lastname": {
            "type": "string",
            required: true
        }
    },
    password: {
        type: String,
        required: 'password is required',

    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
   
}, {
    timestamps: true
})


userSchema.statics.signup = async function (username, email,  password, firstname, lastname, address,phoneNumber) {

    const emailExists = await this.findOne({
        email
    })
    const usernameExists = await this.findOne({
        username
    })

    if (emailExists)
        throw Error('Email already in use')
    if (usernameExists)
        throw Error('Username already in use')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        email,
        username,
        password: hash,
        name: {
            firstname: firstname,
            lastname: lastname
        },
        address,
        phoneNumber
    })

    return user

}
userSchema.statics.login = async function (username, password) {

    if (!username || !password)
        throw Error('All fields must be filled')

    const user = await this.findOne({
        username
    })

    if (!user)
        throw Error('Incorrect username')

    const match = await bcrypt.compare(password, user.password)

    if (!match)
        throw Error('Incorrect password')

    return user

}
userSchema.statics.changePassword = async function (username, oldPassword, newPassword) {

    if (!username || !newPassword)
        throw Error('All fields must be filled')

    const user = await this.findOne({
        username
    })

    if (!user)
        throw Error('Incorrect username')

    const match = await bcrypt.compare(oldPassword, user.password)

    if (!match)
        throw Error('Incorrect password')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)
    
    return await this.findByIdAndUpdate({
        _id: user._id
    }, {
        password: hash
    })

}

userSchema.statics.changeEmail = async function (_id,email, newEmail) {

    if (!email || !newEmail || !_id)
        throw Error('All fields must be filled')

    const user = await this.findOne({
        email
    })

    if (!user)
        throw Error('Incorrect email')


    return await this.findByIdAndUpdate({
        _id
    }, {
        email: newEmail
    })


}
userSchema.statics.deleteUser = async function (user_id) {
    await this.deleteOne({
        _id: user_id
    })
}


module.exports = mongoose.model('user',userSchema)


