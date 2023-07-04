const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./router')
const path = require('path')
const PORT = 3001

app.use(express.json())
app.use(morgan("combined"))
app.use(router)
app.use(express.static(path.join(__dirname, 'data')))

app.listen(PORT, () => {
    console.log("Server is listening on http://localhost:"+PORT)
})