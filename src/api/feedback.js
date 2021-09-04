import express from 'express'
import Feedbacks from '../models/feedbackModel.js'
import { protect, admin } from '../auth/authMiddleware.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

//*@desc fetch all Feedback
//*@Api Get /api/v1/feedback
//*@Access Admin

router.get(
  '/feedback',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const feedback = await Feedbacks.find({}).populate('user')
    console.log(feedback)
    if (feedback) {
      res.json(feedback)
    } else {
      res.status(404)
    }
  })
)

//*@desc delete Feedback
//*@Api delete /api/v1/feedback/:id
//*@Access Admin

router.delete(
  '/feedback/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await Feedbacks.findById(req.params.id)
    if (user) {
      await user.remove()
      res.json({ message: 'Feedbacks is removed' })
    } else {
      res.status(404)
      throw new Error('Feedbacks is not found')
    }
  })
)

//*@desc Fetch each Feedbacks
//*@Api GET /api/v1/feedback/:id
//*@Access Admin

router.get(
  '/feedback/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const feedback = await Feedbacks.findById(req.params.id).populate('user')
    if (feedback) {
      res.json(feedback)
    } else {
      throw new Error('Feedbacks not found')
    }
  })
)

//*@desc Create Feedback
//*@Api POST /api/v1/feedback
//*@Access Admin

router.post(
  '/feedback',
  protect,
  asyncHandler(async (req, res) => {
    const { feedback } = req.body

    const feebackk = new Feedbacks({
      user: req.user._id,
      feedback,
    })

    const createdIncident = await feebackk.save()
    if (createdIncident) {
      res.status(201).json(createdIncident)
    } else {
      throw new Error(error)
    }
  })
)

//*@desc Edit Feedback
//*@Api PUT /api/v1/editfeedback/:id
//*@Access Admin

router.put(
  '/editfeedback/:id',
  protect,
  asyncHandler(async (req, res) => {
    const feedb = await Feedbacks.findById(req.params.id).populate('user')
    if (feedb) {
      feedb.feedback = req.body.feedback || feedb.feedback

      const updatedFeedback = await feedb.save()
      res.status(200).json(updatedFeedback)
    } else {
      res.status(404)
      throw new Error('Feedbacks is not foundedd . ')
    }
  })
)

export default router
