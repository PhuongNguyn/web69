const fs = require("fs")
const readFile = require('../utils/readFile')
const jwt = require("jsonwebtoken")

const login = (req, res) => {
    const userId = req.query.userId
    const result = readFile("user.json")
    const checkUser = result.find(item => item.userId == userId)

    if(!checkUser){
        return res.status(401).json({message: "Dang nhap that bai"})
    }

    const token = jwt.sign({userId: checkUser.userId}, process.env.SECRET_KEY, {
        expiresIn: "1d"
    })


    return res.status(200).json({token, message: "dang nhap thanh cong"})
}

const getUser = (req, res) => {
    const data = fs.readFileSync('user.json')
    const result = readFile('user.json')

    return res.status(200).json({result})
}

const createUser = (req, res) => {
    const userId = req.body.userId
    const username = req.body.username

    const result = readFile('user.json')

    const newResult = [...result, {userId, username}]
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