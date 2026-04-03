const User = require('../../models/userModel')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const sendEmail = require('../../services/sendEmail')


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



    // remove sensitive fields
    const userObj = userFound.toObject();
    delete userObj.password;
    delete userObj.__v;

    
    res.status(200).json({
        message: "Login successful.",
        token,
        user: userObj
    })
}




//forget password
exports.forgetPassword = async(req, res) => {
    const {email} = req.body     //forntend should send email

    //if email not provided
    if(!email) {
        return res.status(400).json({
            message: "Please enter an email"
        })
    }

    const userExist = await User.findOne({email}) 
    if(!userExist){
        return res.status(404).json({
            message: "Email is not registered."
        })
    }

    //console.log(userExist)

    //if user exist then send OTP to that email
    const otp = Math.floor(Math.random() * 10000)   // 4 digit otp


     // save OTP to db
    userExist.otp = otp
    await userExist.save()

    await sendEmail({
        email: email,
        subject: "OTP for Buyer Portal password reset",
        message: `The OTP for password reset is ${otp}`
    })

    res.status(200).json({
        message: "OTP sent successfully"
    })
}




//verify otp
exports.verifyOtp = async (req, res) => {
    const {email, otp} = req.body

    if(!email || !otp){
        return res.status(400).json({
            message: "Please enter email and OTP"
        })
    }


    //checks if email is registered or not
    const userExist = await User.findOne({ email })
    if(!userExist){
        return res.status(404).json({
            message: "This email is not registered"
        })
    }

    // console.log(otp)
    // console.log(userExist)

    // checks if the otp matched or not
    if(userExist.otp !== otp) {
        res.status(400).json({
            message: "Invalid OTP. Try again"
        })
    } else {
        res.status(200).json({
            message: "OTP verified"
        })

        //dispose OTP after verifyed so that it will not be matched next time
        userExist.otp = undefined
        userExist.isOtpVerified = true
        await userExist.save()
    }

}





//reset new password
exports.resetPassword = async (req, res) => {
    const {email, newPassword, confirmPassword} = req.body

    if(!email || !newPassword || ! confirmPassword){
        return res.status(400).json({
            message: "Provide email, newPassword and confirmPassword"
        })
    }

    //checks if newPassword and confirmPassword are same or not
    if(newPassword !== confirmPassword) {
        return res.status(400).json({
            message: "newPassword and confirmPassword didn't match"
        })
    }

    const userExist = await User.find({email})
    if(userExist.length == 0){
        return res.status(400).json({
            message: "The email you entered is not registered"
        })
    }

    //check otp verified or not
    if(userExist[0].isOtpVerified !== true){
        return res.status(403).json({
            message: "You cannot perform this action"
        })
    }
    
    //replace the password with newPassword in db
    userExist[0].password = bcrypt.hashSync(newPassword, 10)
    userExist[0].isOtpVerified = false
    await userExist[0].save()

    res.status(200).json({
        message: "Password changed successfully"
    })

}