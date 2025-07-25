import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (_req, res) => {
  res.send('Server is running')
})

export default app
