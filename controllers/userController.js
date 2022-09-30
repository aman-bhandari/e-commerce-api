const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const customError = require('../errors')
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password')
  res.status(StatusCodes.OK).json({ users })
}
const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (!user)
    throw new customError.NotFoundError(
      `User not found with id ${req.params.id}`
    )
  res.status(StatusCodes.OK).json({ user })
}
const showCurrentUser = async (req, res) => {
  res.send('show current user')
}
const updateUser = async (req, res) => {
  res.send(req.body)
}
const updateUserPassword = async (req, res) => {
  res.send(req.body)
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
