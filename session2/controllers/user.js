const getUser = (req, res) => {
    return res.status(200).json({message: "get success"})
}

module.exports = {
    getUser
}