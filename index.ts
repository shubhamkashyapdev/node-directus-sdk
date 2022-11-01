import express, { Express, query, Request, Response } from 'express'
import dotenv from 'dotenv'
import { Directus } from '@directus/sdk'
dotenv.config()
const app: Express = express()
const directus = new Directus('http://115.124.108.237:8080/')
const PORT = process.env.PORT || 5000
const ENVIRONMENT = process.env.NODE_ENV

app.get('/users', async (req: Request, res: Response) => {
  const fieldsQuery = req.query.fields as string
  const welcome_message = `API IS WORKING ON PORT:${PORT} IN ${ENVIRONMENT}  ENVIRONMENT`
  const readByQuery = { meta: `*` } as any
  if (fieldsQuery) {
    readByQuery.fields = fieldsQuery
  }
  const publicData = await directus.items('users').readByQuery(readByQuery)
  res.json(publicData)
})

app.listen(PORT, () => {
  console.log(
    `API IS WORKING ON ${PORT} IN ${ENVIRONMENT} ENVIRONMENT AT http://localhost:${PORT}`
  )
})
