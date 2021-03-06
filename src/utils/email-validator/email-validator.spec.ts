import { EmailValidatorAdapter } from './email-validator-adapter'

const makeSut = () => {
  const sut = new EmailValidatorAdapter()
  return { sut }
}

describe('EmailValidator', () => {
  test('Should return false if email is invalid', () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'isValid').mockReturnValueOnce(false)
    const email = 'invalid_email@gmail.com'
    const isValid = sut.isValid(email)
    expect(isValid).toBe(false)
  })

  test('Should return true if email is valid', () => {
    const { sut } = makeSut()
    const email = 'valid_email@gmail.com'
    const isValid = sut.isValid(email)
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct value', () => {
    const { sut } = makeSut()
    const validatorSpy = jest.spyOn(sut, 'isValid')
    const email = 'valid_email@gmail.com'
    sut.isValid(email)
    expect(validatorSpy).toHaveBeenCalledWith(email)
  })
})
