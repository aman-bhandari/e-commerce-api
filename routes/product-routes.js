const express = require('express')
const router = express.Router()
const {
  authenticateUser,
  authorisePermissions,
} = require('../middleware/authentication')

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/product-controller')

const { getSingleProductReviews } = require('../controllers/review-controller')

router
  .route('/')
  .post([authenticateUser, authorisePermissions('admin')], createProduct)
  .get(getAllProducts)

router
  .route('/uploadImage')
  .post([authenticateUser, authorisePermissions('admin')], uploadImage)

router
  .route('/:id')
  .get(getSingleProduct)
  .patch([authenticateUser, authorisePermissions('admin')], updateProduct)
  .delete([authenticateUser, authorisePermissions('admin')], deleteProduct)

router.route('/:id/reviews').get(getSingleProductReviews)

module.exports = router
