import { AddAccountRepository } from '../protocols/add-account-repository'
import {
  AddAccount,
  Encrypter,
  AddAccountModel,
  AccountModel,
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly dbAddAccountRepository: AddAccountRepository
  ) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    const encryptedPassword = await this.encrypter.encrypt(account.password)
    const updatedAccount = Object.assign({}, account, {
      password: encryptedPassword,
    })
    const accountFromRepository = await this.dbAddAccountRepository.add(
      updatedAccount
    )
    return new Promise((resolve) => resolve(accountFromRepository))
  }
}
