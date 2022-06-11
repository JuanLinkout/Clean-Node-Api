import { AddAccountRepository } from '../protocols/add-account-repository'
import { DbAddAccount } from './db-add-account'
import {
  AccountModel,
  AddAccountModel,
  Encrypter,
} from './db-add-account-protocols'

const makeEncrypterStub = () => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

const makeAddAccountRepositoryStub = () => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: AddAccountModel): Promise<AccountModel> {
      return new Promise((resolve) =>
        resolve({
          id: 'valid_id',
          ...account,
        })
      )
    }
  }

  return new AddAccountRepositoryStub()
}

interface SutType {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutType => {
  const encrypterStub = makeEncrypterStub()
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return { sut, encrypterStub, addAccountRepositoryStub }
}

describe('DbAddAccount usecase', () => {
  test('Should call Encrypter with correct password', () => {
    const { encrypterStub, sut } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password',
    }
    sut.add(accountData)
    expect(encrypterSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const accountData = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password',
    }
    const promise = sut.add(accountData)
    expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password',
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      email: 'valid_email',
      name: 'valid_name',
      password: 'hashed_password',
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const accountData = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password',
    }
    const promise = sut.add(accountData)
    expect(promise).rejects.toThrow()
  })

  test('Should return account o success', async () => {
    const { sut } = makeSut()
    const accountData = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password',
    }
    const account = await sut.add(accountData)
    expect(account).toEqual({
      email: 'valid_email',
      name: 'valid_name',
      password: 'hashed_password',
      id: 'valid_id',
    })
  })
})
