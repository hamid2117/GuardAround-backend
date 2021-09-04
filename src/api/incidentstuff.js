import express from 'express'
import Incidents from '../models/incidentModel.js'
import Comment from '../models/commentModel.js'
import Like from '../models/likeModel.js'
import Feedback from '../models/feedbackModel.js'
import Users from '../models/usersModel.js'

import { protect, admin } from '../auth/authMiddleware.js'
import asyncHandler from 'express-async-handler'
const router = express.Router()

router.get(
  '/numbers',
  asyncHandler(async (req, res) => {
    const incident = await Incidents.find({})
    const comment = await Comment.find({})
    const feedback = await Feedback.find({})
    const user = await Users.find({})

    const unverifiedIncident = incident.filter(
      (data) => data.status === 'unvarified'
    )
    const numberUnverified = unverifiedIncident.length
    const numberIncident = incident.length
    const numbercomment = comment.length
    const numberfeedback = feedback.length
    const numberuser = user.length
    const Numberss = {
      numberUnverified: numberUnverified,
      numberIncident: numberIncident,
      numbercomment: numbercomment,
      numberfeedback: numberfeedback,
      numberuser: numberuser,
    }
    if (Numberss) {
      res.json(Numberss)
    } else {
      throw new Error('Users not found')
    }
  })
)

//*@desc fetch all Incident
//*@Api delete /api/v1/incident
//*@Access Admin

router.get(
  '/comments/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    let incidentid = req.params.id
    const incidents = await Comment.findOne({ incident: incidentid }).populate(
      'comments.user'
    )
    if (incidents) {
      res.json(incidents)
    } else {
      return res.status(404).json({ message: 'Data is not available' })
    }
  })
)
//*@desc fetch all Incident
//*@Api delete /api/v1/incident
//*@Access Admin

router.delete(
  '/comment/:id',
  asyncHandler(async (req, res) => {
    let commentId = req.params.id
    Comment.update(
      { 'comments._id': commentId },
      { $pull: { comments: { _id: commentId } } },
      { safe: true, multi: true },
      function (err, obj) {
        if (obj) {
          res.send(204)
        }
        if (err) {
          res.send(404)
        }
      }
    )
  })
)

//*@desc fetch all Incident
//*@Api delete /api/v1/incident
//*@Access Admin

router.get(
  '/likes/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    let incidentid = req.params.id
    const incidents = await Like.findOne({ incident: incidentid })

    if (incidents) {
      res.json(incidents)
    } else {
      res.status(404)
    }
  })
)

//*@desc delete Incident
//*@Api delete /api/v1/incident/:id
//*@Access Admin

router.delete(
  '/incident/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const incident = await Incidents.findById(req.params.id)
    if (incident) {
      await incident.remove()
      res.json({ message: 'Incident is removed' })
    } else {
      res.status(404)
      throw new Error('Incident is not found')
    }
  })
)

//*@desc Fetch each Incident
//*@Api GET /api/v1/incident/:id
//*@Access Admin

router.get(
  '/incident/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await Incidents.findById(req.params.id)
    if (user) {
      res.json(user)
    } else {
      throw new Error('Users not found')
    }
  })
)
//*@desc Fetch each Incident
//*@Api GET /api/v1/numbers
//*@Access Admin

export default router
