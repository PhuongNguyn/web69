const { createProduct } = require("../controllers/product")
const authentication = require("../middlewares/authentication")

const router = require("express").Router()

router.post("/", authentication ,createProduct)

module.exports = router