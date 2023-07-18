const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./router')
const path = require('path')
const cors = require("cors")
const PORT = 3001
const dotenv = require("dotenv")
const {connectToDb} = require("./database")

dotenv.config()
app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use(morgan("combined"))
connectToDb()
app.use(router)
app.use(express.static(path.join(__dirname, 'data')))


app.listen(PORT, () => {
    console.log("Server is listening on http://localhost:"+PORT)
})


