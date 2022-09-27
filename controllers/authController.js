const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const customError = require('../errors')

const register = async (req, res) => {
  const user = await User.create(req.body)

  res.status(StatusCodes.CREATED).json({ user })
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
