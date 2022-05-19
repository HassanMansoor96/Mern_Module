import express from 'express'
import cors from 'cors'
import planets from './api/planets.route.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1/planets", planets)
app.use('*', (req, res) => {
    res.status(404).json({ error: "not found" })
})
export default app