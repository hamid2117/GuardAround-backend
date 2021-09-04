import Admin from '../models/usersModel.js'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decode = jwt.verify(token, 'dimahdani9530')
      req.user = await Admin.findById(decode.id)
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('no authorized catch, no token')
    }
  } else {
  }
  if (!token) {
    res.status(401)
    throw new Error('no authorized , no token')
  }
})
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.type === 'admin') {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized for admin')
  }
})

export { protect, admin }