const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./router')

app.use(express.json())
app.use(morgan("combined"))
app.use(router)

app.listen(PORT, () => {
    console.log("Server is listening on http://localhost:"+PORT)
})