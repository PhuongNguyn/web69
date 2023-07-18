const mongoose = require("mongoose")

const connectToDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://web69:vungga12@web69.f5qbhj2.mongodb.net/web69`)
        console.log("Connect to db successful")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    connectToDb
}
