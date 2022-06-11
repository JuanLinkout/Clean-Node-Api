import { Encrypter } from '../../data/protocols/encrypter'
import { BCryptAdapter } from './bcrypt-adapter'

interface SutTypes {
  sut: Encrypter
}

const makeSut = (): SutTypes => {
  const sut = new BCryptAdapter()
  return { sut }
}

describe('Bcryp Adapter', () => {
  test('Should call BCryptAdapter with correct value', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(sut, 'encrypt')
    await sut.encrypt('any_value')
    expect(spy).toHaveBeenCalledWith('any_value')
  })

  // Tem que mockar o retorno pq se não temos que ficar criando hashes
  test('Should return encrypted value', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'encrypt').mockImplementationOnce(() => {
      return new Promise((resolve) => resolve('hash'))
    })
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'encrypt').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
