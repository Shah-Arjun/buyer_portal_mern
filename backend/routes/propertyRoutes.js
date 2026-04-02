const { addProperty } = require('../controllers/property/propertyController')
const isAuthenticated = require('./../middleware/isAuthenticated')
const restrictTo = require('./../middleware/restrictTo')

const router = require('express').Router()


router.route('/add').post(isAuthenticated, restrictTo('seller'), addProperty)


module.exports = router