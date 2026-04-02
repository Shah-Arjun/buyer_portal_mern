const { registerUser } = require('../controllers/authController')
const catchAsync = require('./../services/catchAsync')

const router = require('express').Router()


router.route('/register').post(catchAsync(registerUser))


module.exports = router