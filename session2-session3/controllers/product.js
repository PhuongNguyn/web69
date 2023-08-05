const productModel = require("../models/product.model")
const {uploadImage} = require("../cloudinary/index")

const createProduct = async (req, res) => {
    try {
        const data = req.body
        const user = req.user?._id
        const result = await uploadImage(req.files.image)
        
        // const product = await productModel.create({
        //     ...data, 
        //     user
        // })
        const product = await productModel.create({
            ...data, 
            user,
            image:result
        })

        return res.status(200).json({message: "Tao san pham thanh cong", product})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const getProduct = async (req, res) => {
    try {
        const pageSize = req.query.pageSize || 10
        const pageIndex = req.query.pageIndex || 1

        const products = await productModel.find().skip(pageSize * pageIndex - pageSize).limit(pageSize)
        const count = await productModel.countDocuments()
        const totalPage = Math.ceil(count / pageSize)

        return res.status(200).json({message: "Get product success", result: {
            products,
            count,
            totalPage,
            pageSize, 
            pageIndex
        }})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports = {
    createProduct,
    getProduct
}