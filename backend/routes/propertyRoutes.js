const { addProperty, deleteProperty, getProperties, getProperty } = require('../controllers/property/propertyController')
const catchAsync = require('../services/catchAsync')
const isAuthenticated = require('./../middleware/isAuthenticated')
const restrictTo = require('./../middleware/restrictTo')

const router = require('express').Router()



router.route('/')
    .get(catchAsync(getProperties))
    .post(isAuthenticated, restrictTo('seller'), catchAsync(addProperty))
    

router.route('/:id')
    .get(catchAsync(getProperty))
    .delete(isAuthenticated, restrictTo('seller'), catchAsync(deleteProperty))


module.exports = router