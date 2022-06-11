import { EmailValidatorAdapter } from './email-validator-adapter'

describe('EmailValidator', () => {
  test('Should return false if email is invalid', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(sut, 'isValid').mockReturnValueOnce(false)
    const email = 'invalid_email@gmail.com'
    const isValid = sut.isValid(email)
    expect(isValid).toBe(false)
  })

  test('Should return true if email is invalid', () => {
    const sut = new EmailValidatorAdapter()
    const email = 'valid_email@gmail.com'
    const isValid = sut.isValid(email)
    expect(isValid).toBe(true)
  })
})
