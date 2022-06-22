import express from 'express'
import cors from 'cors'
import movies from './api/movies.route.js'

const app = express() // initializing a web server. middleware
app.use(cors())
app.use(express.json())
app.use("/api/v1/movies", movies) // specify the initial routes
app.use('*', (req, res) => { // request data, respond data, * is obituary
    res.status(404).json({ error: "not found" }) //error message if route does not exist
})

export default app