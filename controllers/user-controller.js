const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createTokenUser, attachCookiesToResponse } = require('../utils')
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password')
  res.status(StatusCodes.OK).json({ users })
}
const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (!user)
    throw new CustomError.NotFoundError(
      `User not found with id ${req.params.id}`
    )
  res.status(StatusCodes.OK).json({ user })
}
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}
const updateUser = async (req, res) => {
  const { name, email } = req.body
  if (!name || !email)
    throw new CustomError.BadRequestError('Please provide values')
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { name, email },
    { new: true, runvalidators: true }
  )
  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser })
}
const updateUserPassword = async (req, res) => {
  const { newPassword, oldPassword } = req.body
  if (!newPassword || !oldPassword)
    throw new CustomError.BadRequestError('Please provide values')
  const user = await User.findOne({ _id: req.user.userId })
  const isPasswordCorrect = await user.comparePassword(oldPassword)
  if (!isPasswordCorrect)
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  user.password = newPassword
  await user.save()
  res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated' })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
