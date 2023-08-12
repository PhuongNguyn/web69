const { createProduct, getProduct, deleteProduct, getById, updateProduct } = require("../controllers/product")
const authentication = require("../middlewares/authentication")

const router = require("express").Router()

router.post("/", authentication ,createProduct)
router.get("/", getProduct)
router.delete("/:id",authentication, deleteProduct)
router.get("/:id", getById)
router.put("/:id", authentication, updateProduct)

module.exports = router