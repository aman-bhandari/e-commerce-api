const express = require('express')
const router = express.Router()
const {
  authenticateUser,
  authorisePermissions,
} = require('../middleware/authentication')

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require('../controllers/order-controller')

router
  .route('/')
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorisePermissions('admin'), getAllOrders)

router.route('/showAllMyOrders').get(authenticateUser, getCurrentUserOrders)

router
  .route('/:id')
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder)

module.exports = router
