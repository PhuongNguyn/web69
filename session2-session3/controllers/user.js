const fs = require("fs")
const readFile = require('../utils/readFile')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const login = (req, res) => {
    const username = req.body.username
    const userPassword = req.body.password

    const result = readFile("user.json")

    const checkExistUser = result.find(item => item.username == username)

    if(!checkExistUser){
        return res.status(404).json({message: "Khong tim thay user"})
    }

    const checkPassword = bcrypt.compareSync(userPassword, checkExistUser.password)

    if(!checkPassword){
        return res.status(400).json({message: "Sai mat khau"})
    }

    const token = jwt.sign({userId: checkExistUser.userId}, process.env.SECRET_KEY, {
        expiresIn: "1h"
    })

    const {password, ...returnUser} = checkExistUser

    return res.status(200).json({token, user: returnUser})
}

const getUser = (req, res) => {
    const data = fs.readFileSync('user.json')
    const result = readFile('user.json')

    return res.status(200).json({result})
}

const createUser = (req, res) => {
    const userId = req.body.userId
    const username = req.body.username
    const password = req.body.password

    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(password, salt)

    const result = readFile('user.json')

    const newResult = [...result, {userId, username, password: hash}]
    const writeToFile = fs.writeFileSync('user.json',JSON.stringify(newResult))

    return res.status(200).json({
        message: "Create user success"
    })

}

const deleteUser = (req, res) => {
    const deleteUser = req.params.id
    
    const result = readFile('user.json')

    const newResult = result.filter(item => item.userId != deleteUser)

    const writeToFile = fs.writeFileSync('user.json',JSON.stringify(newResult))

    return res.status(200).json({
        message: "Delete user success"
    })
}

module.exports = {
    getUser,
    createUser,
    deleteUser,
    login
}