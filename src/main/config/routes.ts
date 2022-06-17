import { Express, Router } from 'express'
import fg from 'fast-glob'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use(router)
  fg.sync('**/src/main/routes/**route.ts').map(async (file) => {
    const route = (await import(`../../../${file}`)).default
    route(router)
  })
}