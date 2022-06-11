import { AddAccountRepository } from '../../../../data/protocols'
import { AccountModel } from '../../../../domain/models'
import { AddAccountModel } from '../../../../domain/usecases'
import { MongoHelper } from '../helpers/mongo-helper'

export class MongoAccountRepository implements AddAccountRepository {
  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('account')
    const response = await accountCollection.insertOne(account)
    const insertedAccount = { ...account, id: response.insertedId.toString() }
    return new Promise((resolve) => resolve(insertedAccount))
  }
}
