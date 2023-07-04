const fs = require("fs")
const readFile = require('../utils/readFile')

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
    deleteUser
}