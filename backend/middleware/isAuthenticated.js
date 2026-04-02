const User = require('./../models/userModel')
const jwt = require('jsonwebtoken')


const isAuthenticated = async(req, res, next) => {
    try {
        const tokenBody = req.headers.authorization

        if(!tokenBody){
            return res.status(400).json({
                message: "Please Login"
            })
        }

        const token = tokenBody.includes('Bearer') ? tokenBody.split(' ')[1] :  tokenBody

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const doesUserExist = await User.findById(decoded.id)

        if(!doesUserExist){
            return res.status(404).json({
                message: "User not found with this ID"
            })
        }

        req.user = doesUserExist

        next();

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}


module.exports = isAuthenticated