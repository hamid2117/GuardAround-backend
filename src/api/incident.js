import express from 'express'
import Incidents from '../models/incidentModel.js'
import { protect, admin } from '../auth/authMiddleware.js'
import asyncHandler from 'express-async-handler'
import { uploadImages } from '../auth/uploadImage.js'

import path from 'path'
import multer from 'multer'
const router = express.Router()

//*@desc fetch all Incident
//*@Api delete /api/v1/incident
//*@Access Admin

router.get(
  '/incidents',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const incident = await Incidents.find({})

    if (incident) {
      res.json(incident)
    } else {
      res.status(404)
    }
  })
)
//*@desc fetch unverified Incident .
//*@Api delete /api/v1/unverifiedincident
//*@Access Admin

router.get(
  '/unverifiedincidents',
  asyncHandler(async (req, res) => {
    const incident = await Incidents.find({})
    const unverifiedIncident = incident.filter(
      (data) => data.status === 'unvarified'
    )
    if (unverifiedIncident) {
      res.json(unverifiedIncident)
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

//*@desc Create  Incident
//*@Api POST /api/v1/incident
//*@Access Admin

router.post(
  '/incident',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { status, type, title, description } = req.body

    const incident = new Incidents({
      status,
      user: req.user._id,
      location: { type: 'Point', coordinates: [0, 0] },
      type,
      title,
      description,
    })

    const createdIncident = await incident.save()
    if (createdIncident) {
      res.status(201).json(createdIncident)
    } else {
      throw new Error(error)
    }
  })
)
const Storage = multer.diskStorage({
  destination: './public',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    )
  },
})

// const upload = multer({
//   storage: Storage,
// }).single('image') //name of input (frontend)
// const upload = multer({
//   storage: Storage,
// }).array('image') //name of input (frontend)

const upload = multer({
  storage: Storage,
}).fields([
  { name: 'images', maxCount: 100 },
  { name: 'vedios', maxCount: 100 },
]) //name of input (frontend)

router.post(
  '/incidentimg/:id',
  asyncHandler(async (req, res) => {
    const incident = await Incidents.findById(req.params.id)
    upload(req, res, async (err) => {
      if (err) {
        console.log(err)
        res.status(380).json(err)
      } else {
        var { images, vedios } = req.files
        if (!images) images = []
        if (!vedios) vedios = []
        var files = []
        images.map((item) => {
          files.push({ type: 'image', path: item.path })
        })
        vedios.map((item) => {
          files.push({
            type: 'vedio',
            path: item.path,
          })
        })
        if (incident) {
          incident.files = files || incident.files

          const updatedIncident = await incident.save()
          console.log(updatedIncident)
          res.status(200).json(updatedIncident)
        }
      }
    })
  })
)
router.post(
  '/incidentimg',
  // protect,
  // admin,
  asyncHandler(async (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.log(err)
        res.status(380).json(err)
      } else {
        console.log(req.file)
        res.send('Image upload Sucessfully ....')
      }
    })
  })
)

//*@desc Edit  Incident
//*@Api POST /api/v1/editincident
//*@Access Admin

router.put(
  '/editincident/:id',
  protect,
  asyncHandler(async (req, res) => {
    const incident = await Incidents.findById(req.params.id)
    if (incident) {
      incident.status = req.body.status || incident.status
      incident.files = req.body.files || incident.files
      incident.type = req.body.type || incident.type
      incident.title = req.body.title || incident.title
      incident.description = req.body.description || incident.description

      const updatedIncident = await incident.save()
      res.status(200).json(updatedIncident)
    } else {
      res.status(404)
      throw new Error('Incident is not Updated. ')
    }
  })
)

export default router
