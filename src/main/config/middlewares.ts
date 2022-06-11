import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser/body-parser'
import { contentType } from '../middlewares/content-type/content-type'
import { cors } from '../middlewares/cors/cors'

export const applyMiddlewares = (app: Express) => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
