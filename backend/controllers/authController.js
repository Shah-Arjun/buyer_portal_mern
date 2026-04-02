const User = require('./../models/userModel')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


//register user
exports.registerUser = async(req, res) => {
    const { name, email, password, role } = req.body

    if(!name || !email || !password || !role){
        return res.status(400).json({
            message: "User name, email, role and password is required."
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
        password: hashedPw,
        role
    })

    res.status(200).json({
        message: "User registered successfully."
    })
}





//login user
exports.loginUser = async(req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json({
            message: "User email and password is required"
        })
    }

    // console.log(req.body)

    const userFound = await User.findOne({email})
    if(!userFound){
        return res.status(404).json({
            message: "User does not exists with this email."
        })
    }

    // console.log(userFound)

    const isMatch = bcrypt.compareSync(password, userFound.password)
    if(!isMatch){
        return res.status(400).json({
            message: "Wrong password. Try again."
        })
    }

    //generate token
    const token = jwt.sign({id: userFound._id}, process.env.SECRET_KEY, {
        expiresIn: '5h'
    })
    
    res.status(200).json({
        message: "Login successful.",
        token
    })
}