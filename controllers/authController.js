const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const customError = require('../errors')
const { createJWT } = require('../utils')
const register = async (req, res) => {
  const { email, name, password } = req.body
  let emailAllreadyExist = await User.findOne({ email })
  if (emailAllreadyExist)
    throw new customError.BadRequestError('Email already exist')
  let firstUser = (await User.countDocuments({})) === 0
  let role = firstUser ? 'admin' : 'user'
  const user = await User.create({ email, name, password, role })
  const tokenUser = { name: user.name, userId: user._id, role: user.role }
  const token = createJWT({ payload: tokenUser })
  const oneDay = 1000 * 60 * 60 * 24
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  })
  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}
const logIn = async (req, res) => {
  res.send('user log-in')
}
const logOut = async (req, res) => {
  res.send('user log-out')
}

module.exports = {
  register,
  logIn,
  logOut,
}
