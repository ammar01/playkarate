// src/server/index.ts
import express from "express"
import { api } from "./api"

const app = express()
app.use(api)
app.get('/', (req, res) => {
    res.redirect(301, "/api/tasks")
})
app.listen(3002, () => console.log("Server started"))