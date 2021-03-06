import request from 'supertest'
import { app } from '../../config'

describe('Cors middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_cors')
      .expect('access-controll-allow-origins', '*')
      .expect('access-controll-allow-headers', '*')
      .expect('access-controll-allow-methods', '*')
  })
})
