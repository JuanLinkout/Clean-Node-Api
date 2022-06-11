import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser/body-parser'

export const applyMiddlewares = (app: Express) => {
  app.use(bodyParser)
}
