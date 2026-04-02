const User = require('./../models/userModel')
const bcrypt = require("bcryptjs")


//register user
exports.registerUser = async(req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        return res.status(400).json({
            message: "User name, email and password is required."
        })
    }

    const userFound = await User.findOne({email})
    if(userFound){
        return res.status(404).json({
            message: "User already registered with this email."
        })
    }

    const hashedPw = await bcrypt.hashSync(password, 10)


    await User.create({
        name,
        email,
        password: hashedPw
    })

    return res.status(200).json({
        message: "User registered successfully."
    })
}