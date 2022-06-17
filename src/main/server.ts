import env from './config/env'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'

// TODO: Instalar o mongo para testar
MongoHelper.connect(env.mongoUrl)
  .then(async (_) => {
    const { app } = await import('./config')
    app.listen(env.port, () =>
      console.log('Server running at http://localhost:3333')
    )
  })
  .catch((e) => console.error(e))
