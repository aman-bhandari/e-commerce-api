const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController')
const {
  authenticateUser,
  authorisePermissions,
} = require('../middleware/authentication')
router
  .route('/')
  .get(authenticateUser, authorisePermissions('admin', 'owner'), getAllUsers)
router.route('/show-me').get(authenticateUser, showCurrentUser)
router.route('/update-user').patch(updateUser)
router.route('/update-user-password').patch(updateUserPassword)
router.route('/:id').get(authenticateUser, getSingleUser)

module.exports = router
