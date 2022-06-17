import { Express } from 'express'
import { bodyParser, cors, contentType } from '../middlewares'

export const applyMiddlewares = (app: Express) => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
