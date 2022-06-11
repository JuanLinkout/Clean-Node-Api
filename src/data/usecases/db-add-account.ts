import { AccountModel } from '../../domain/models'
import { AddAccount, AddAccountModel } from '../../domain/usecases'
import { Encrypter } from '../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    const { password } = account

    const encryptedPassword = await this.encrypter.encrypt(password)
    return new Promise((resolve) =>
      resolve({ email: '', id: '', name: '', password: '' })
    )
  }
}
