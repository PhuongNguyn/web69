const productModel = require("../models/product.model")
const {uploadImage} = require("../cloudinary/index")

const createProduct = async (req, res) => {
    try {
        const data = req.body
        const user = req.user?._id
       const result = await uploadImage(req.files.image)

       console.log(result)

        // const product = await productModel.create({
        //     ...data, 
        //     user
        // })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports = {
    createProduct
}