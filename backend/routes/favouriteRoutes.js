const catchAsync = require('../services/catchAsync')
const isAuthenticated = require('../middleware/isAuthenticated')
const restrictTo = require('../middleware/restrictTo')
const { toggleFavourite, getFavourites } = require('../controllers/favourite/favouriteController')

const router = require('express').Router()


router.route('/').get(isAuthenticated, restrictTo("buyer"), catchAsync(getFavourites))
router.route('/toggle').post(isAuthenticated, restrictTo("buyer"), catchAsync(toggleFavourite))


module.exports = router