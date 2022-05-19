import express from 'express'
import ShipwrecksController from './shipwreck.controller.js'
const router = express.Router() // get access to express router
router.route('/').get(ShipwrecksController.apiGetShipwrecks)
export default router