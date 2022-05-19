let planets
export default class PlanetsDAO{
static async injectDB(conn){
if(planets){
return
}
try{
planets = await conn.db(process.env.PLANETS_NS)
.collection('planets')
}
catch(e){
console.error(`unable to connect in planetsDAO: ${e}`)
}
}
static async getPlanets({// default filter
    filters = null,
    page = 0,
    planetsPerPage = 20, // will only get 20 movies at once
    } = {}){
    let query
    if(filters){
    if("name" in filters){
    query = { $text: { $search: filters['name']}}
    }else if("orderFromSun" in filters){
    query = { "orderFromSun": { $eq: filters['orderFromSun']}}
    }
    }
    let cursor
    try{
    cursor = await planets
    .find(query)
    .limit(planetsPerPage)
.skip(planetsPerPage * page)
const planetsList = await cursor.toArray()
const totalNumPlanets = await planets.countDocuments(query)
return {planetsList, totalNumPlanets}
}
catch(e){
console.error(`Unable to issue find command, ${e}`)
return { planetsList: [], totalNumPlanets: 0}
}
}
}