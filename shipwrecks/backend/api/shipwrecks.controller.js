import ShipwrecksDAO from '../dao/shipwrecksDAO.js'
export default class ShipwrecksController {
    static async apiGetShipwrecks(req, res, next) {
        const shipwrecksPerPage = req.query.shipwrecksPerPage ?
            parseInt(req.query.shipwrecksPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0
        let filters = {}
        if (req.query.watlev) {
            filters.watlev = req.query.watlev
        }
        else if (req.query.chart) {
            filters.chart = req.query.chart
        }
        const { shipwrecksList, totalNumShipwrecks } = await
            ShipwrecksDAO.getShipwrecks({ filters, page, shipwrecksPerPage })
        let response = {
            shipwrecks: shipwrecksList,
            page: page,
            filters: filters,
            shipwrecks_per_page: shipwrecksPerPage,
            total_results: totalNumShipwrecks,
        }
        res.json(response)
    }
}