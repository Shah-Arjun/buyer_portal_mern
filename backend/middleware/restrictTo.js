// function to restrict authorization
const restrictTo = (...roles) => {               
    //returning middleware
    return (req, res, next) => {
        const userRole = req.user.role   //req.user = user details send from isAuthenticated
        if(!roles.includes(userRole)){
            res.status(403).json({
                message: "You don't have permission for this. Forbidden"
            })
        } else {
            next()  
        }
    }
}


module.exports = restrictTo