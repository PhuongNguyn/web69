// => token => verify_token => token nay dung => se cho nguoi ta di qua (neu token sai => thi minh se chan lai)

const readFile = require("../utils/readFile")
const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {
    const bearerToken = req.headers.authorization // Token co dang  Bearer token
    if(!bearerToken){
        return res.status(401).json({message: "Ban chua dang nhap"})
    }
    const token = bearerToken.split(" ")[1]

    const verify_token = jwt.verify(token, 
                        process.env.SECRET_KEY)

    if(!verify_token){
        return res.status(401).json({message: "Ban chua dang nhap"})
    }

    const userId = verify_token.userId
    const result = readFile("user.json")
    const checkUser = result.find(item => item.userId == userId)

    if(checkUser){
        next()
    }

    return res.status(401).json({message: "Ban chua dang nhap"})
}

module.exports = authentication