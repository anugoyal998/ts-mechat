require('./db')()
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import ENV from './config'
import router from "./router"
import { errorHandler } from "ts-auth-express"

const app: Application = express()
const { APP_PORT } = ENV

app.use(express.json())
app.use(cors())
app.use(errorHandler)

app.get("/",(req: Request, res: Response) => {
    res.send("<h1> Hello World!! </h1>")
})
app.use("/api",router)

app.listen(APP_PORT,()=> {
    console.log(`listening on http://localhost:${APP_PORT}`)
})