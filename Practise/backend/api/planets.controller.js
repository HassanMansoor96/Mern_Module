import PlanetsDAO from '../dao/planetsDAO.js'
export default class PlanetsController {
    static async apiGetPlanets(req, res, next) {
        const planetsPerPage = req.query.planetsPerPage ?
            parseInt(req.query.planetsPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0
        let filters = {}
        if (req.query.orderFromSun) {
            filters.orderFromSun = req.query.orderFromSun
        }
        else if (req.query.name) {
            filters.name = req.query.name
        }
        const { planetsList, totalNumPlanets } = await
            PlanetsDAO.getPlanets({ filters, page, planetsPerPage })
        let response = {
            planets: planetsList,
            page: page,
            filters: filters,
            entries_per_page: planetsPerPage,
            total_results: totalNumPlanets,
        }
        res.json(response)
    }
}