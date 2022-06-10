import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        body: {
          email: 'any_email',
          password: 'any_password',
          passwordConfirmation: 'any_password_confirmation',
        },
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })

  test('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  })

  // test('Should return 400 if no password is provided', () => {
  //   const sut = new SignUpController()
  //   const httpRequest = {
  //     body: {
  //       name: 'any_name',
  //       email: 'any_email',
  //       passwordConfirmation: 'any_password_confirmation',
  //     },
  //   }
  //   const httpResponse = sut.handle(httpRequest)
  //   expect(httpResponse.statusCode).toBe(400)
  // })

  // test('Should return 400 if no passwordConfirmation is provided', () => {
  //   const sut = new SignUpController()
  //   const httpRequest = {
  //     body: {
  //       name: 'any_name',
  //       email: 'any_email',
  //       password: 'any_password',
  //     },
  //   }
  //   const httpResponse = sut.handle(httpRequest)
  //   expect(httpResponse.statusCode).toBe(400)
  // })
})
