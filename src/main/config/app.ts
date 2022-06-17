import express from 'express'
import { applyMiddlewares } from './middlewares'
import { setupRoutes } from './routes'

const app = express()
applyMiddlewares(app)
setupRoutes(app)

export { app }
