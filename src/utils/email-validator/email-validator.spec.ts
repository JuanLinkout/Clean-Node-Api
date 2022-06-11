import { EmailValidatorAdapter } from './email-validator-adapter'

describe('EmailValidator', () => {
  test('Should return false if email is invalid', () => {
    const sut = new EmailValidatorAdapter()
    const email = 'invalid_email'
    const isValid = sut.isValid(email)
    expect(isValid).toBe(false)
  })
})
