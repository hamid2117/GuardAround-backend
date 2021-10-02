import express from 'express'
import User from '../models/usersModel.js'
import asyncHandler from 'express-async-handler'
import { sendSms } from '../auth/numbermsg.js'
import generateToken from '../auth/genrateToken.js'

const router = express.Router()

//*@desc To create a user
//*@Api POST /api/v1/register
//*@Access Public

router.post(
  '/register',
  sendSms,
  asyncHandler(async (req, res) => {
    const { phone } = req.body
    const alreadyExist = await User.findOne({ phone })
    if (alreadyExist) {
      return res
        .status(409)
        .json({ status: 'error', error: 'phone already in use' })
    } else {
      const user = await User.create({
        phone,
        codee: req.codee,
      })
      if (user) {
        res.status(201).json(user)
      }
    }
    return res.status(500).json({
      status: 'error',
      error: 'Cannot register user at the moment',
    })
  })
)
router.post(
  '/verifycode',
  asyncHandler(async (req, res) => {
    const { code, phone } = req.body
    const user = await User.findOne({ phone })
    if (user.codee === code) {
      user.status = 'verified'
      await user.save()
      res.status(200).json({
        _id: user._id,
        user: user.phone,
        type: user.type,
        token: generateToken(user._id),
      })
    } else {
      return res.status(403).json({ message: 'Wronge code!' })
    }
  })
)

export default router
