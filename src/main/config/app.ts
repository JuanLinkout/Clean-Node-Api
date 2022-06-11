import express from 'express'
import { applyMiddlewares } from './middlewares'

const app = express()
applyMiddlewares(app)

export { app }
