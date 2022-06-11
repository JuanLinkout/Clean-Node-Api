import {
  AddAccount,
  Encrypter,
  AddAccountModel,
  AccountModel,
} from './db-add-account-protocols'

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
