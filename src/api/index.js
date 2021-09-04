import express from 'express'
import loginApi from './login.js'
import usersApi from './users.js'
import incidentApi from './incident.js'
import feedbackApi from './feedback.js'
import incidentstuffApi from './incidentstuff.js'
const router = express.Router()

router.use(usersApi)
router.use(loginApi)
router.use(incidentApi)
router.use(incidentstuffApi)
router.use(feedbackApi)

export default router
