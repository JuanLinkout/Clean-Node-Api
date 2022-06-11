import request from 'supertest'
import { app } from '../../config'

describe('Body Parser', () => {
  test('Should parse body', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'name' })
      .expect({ name: 'name' })
  })
})
