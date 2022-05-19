let shipwrecks
export default class ShipwrecksDAO{
static async injectDB(conn){
if(shipwrecks){
return
}
try{
shipwrecks = await conn.db(process.env.SHIPWRECKS_NS)
.collection('shipwreck')
}
catch(e){
console.error(`unable to connect in shipwrecksDAO: ${e}`)
}
}
static async getShipwrecks({// default filter
    filters = null,
    page = 0,
    shipwrecksPerPage = 20, // will only get 20 shipwrecks at once
    } = {}){
    let query
    if(filters){
    if("chart" in filters){
    query = { $text: { $search: filters['chart']}}
    }else if("watlev" in filters){
    query = { "watlev": { $eq: filters['watlev']}}
    }
    }
    let cursor
    try{
    cursor = await shipwrecks
    .find(query)
    .limit(shipwrecksPerPage)
.skip(shipwrecksPerPage * page)
const shipwrecksList = await cursor.toArray()
const totalNumShipwrecks = await shipwrecks.countDocuments(query)
return {shipwrecksList, totalNumShipwrecks}
}
catch(e){
console.error(`Unable to issue find command, ${e}`)
return { shipwrecksList: [], totalNumShipwrecks: 0}
}
}
}