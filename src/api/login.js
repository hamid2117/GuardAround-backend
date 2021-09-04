import express from 'express'
import Users from '../models/usersModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../auth/genrateToken.js'

//*@desc Auth the Admin
//*@Api GET /api/v1/login
//*@Access Public

const router = express.Router()

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { phone } = req.body
    const user = await Users.findOne({ phone })

    if (!user)
      return res.status(404).json({ message: 'This account is not found .' })

    if (user) {
      res.json({
        _id: user._id,
        user: user.phone,
        type: user.type,
        token: generateToken(user._id),
      })
    } else {
      return res.status(403).json({ message: 'The User is not registerd .' })
    }
  })
)

export default router
