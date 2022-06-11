import { DbAddAccount } from './db-add-account'
import { Encrypter } from './db-add-account-protocols'

const makeSut = () => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve(''))
    }
  }

  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)

  return { sut, encrypterStub }
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
})
