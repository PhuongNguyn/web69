const { createProduct, getProduct } = require("../controllers/product")
const authentication = require("../middlewares/authentication")

const router = require("express").Router()

router.post("/", authentication ,createProduct)
router.get("/", getProduct)

module.exports = router