import express from 'express'
import PlanetsController from './planets.controller.js'
const router = express.Router() // get access to express router
router.route('/').get(PlanetsController.apiGetPlanets)
export default router