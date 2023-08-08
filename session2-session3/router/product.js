const { createProduct, getProduct, deleteProduct } = require("../controllers/product")
const authentication = require("../middlewares/authentication")

const router = require("express").Router()

router.post("/", authentication ,createProduct)
router.get("/", getProduct)
router.delete("/:id",authentication, deleteProduct)

module.exports = router