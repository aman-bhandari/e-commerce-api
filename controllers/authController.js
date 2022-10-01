const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const customError = require('../errors')
const { attachCookiesToResponse } = require('../utils')
const register = async (req, res) => {
  const { email, name, password } = req.body
  let emailAllreadyExist = await User.findOne({ email })
  if (emailAllreadyExist)
    throw new customError.BadRequestError('Email already exist')
  let firstUser = (await User.countDocuments({})) === 0
  let role = firstUser ? 'admin' : 'user'
  const user = await User.create({ email, name, password, role })
  const tokenUser = { name: user.name, userId: user._id, role: user.role }
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}
const logIn = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    throw new customError.BadRequestError('Please provide email and password')
  const user = await User.findOne({ email })
  if (!user) throw new customError.UnauthenticatedError('Invalid Credentials')
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect)
    throw new customError.UnauthenticatedError('Invalid Credentials')
  const tokenUser = { name: user.name, userId: user._id, role: user.role }
  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}
const logOut = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  })
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}
module.exports = {
  register,
  logIn,
  logOut,
}
