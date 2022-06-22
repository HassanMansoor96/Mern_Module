import app from './server.js' //we import app that we have previously created and exported in server.js.
import mongodb from "mongodb" // we import mongodb to access our database
import dotenv from "dotenv" // we import dotenv to access our enviroment variables
import MoviesDAO from './dao/moviesDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'

async function main() { // We create an asynchronous function main() to connect to our MongoDB cluster and call functions that access our database.
    dotenv.config() // we call dotenv.config() to load in the environment variables
    const client = new mongodb.MongoClient( //we create an instance of MongoClient and pass in the database URI
        process.env.MOVIEREVIEWS_DB_URI
    )
    const port = process.env.PORT || 8000 //We retrieve the port from our environment variable. If we can’t access it, we use port 8000
    try {
        // Connect to the MongoDB cluster
        await client.connect() //In the try block, we then call client.connect to connect to the database. client.connect() returns a promise. We use the await keyword to indicate that we block further execution until that operation has completed.
        await MoviesDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => { //app.listen starts the server and listens via the specified port. The callback function provided in the 2nd argument is executed when the server starts listening. In our case, when the server starts, it logs a message ‘server is running in port 5000’ for example.
            console.log('server is running on port:' + port);
        })
    } catch (e) {
        console.error(e);
        process.exit(1)
    }
}

main().catch(console.error); //With the main() function implemented, we then call it and send any errors to the console.