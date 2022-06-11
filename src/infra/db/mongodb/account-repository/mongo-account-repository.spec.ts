import { MongoHelper } from '../helpers/mongo-helper'
import { MongoAccountRepository } from './mongo-account-repository'

describe('MongoAccountRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('account')
    await accountCollection.deleteMany({})
  })

  test('Should return account on success', async () => {
    const sut = new MongoAccountRepository()
    const account = {
      name: 'name',
      email: 'email',
      password: 'password',
    }
    const responseAccount = await sut.add(account)

    expect(responseAccount).toBeTruthy()
    expect(responseAccount.id).toBeTruthy()
    expect(responseAccount.email).toBe(account.email)
    expect(responseAccount.name).toBe(account.name)
    expect(responseAccount.password).toBe(account.password)
  })
})
