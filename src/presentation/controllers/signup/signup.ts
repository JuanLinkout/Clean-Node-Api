import { AddAccount } from '../../../domain/usecases'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, internalServerError, ok } from '../../helpers'
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from './signup-protocols'

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password, passwordConfirmation, name } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }

      const addAccountModel = {
        email,
        password,
        name,
      }
      const account = await this.addAccount.add(addAccountModel)

      return ok(account)
    } catch (e) {
      return internalServerError()
    }
  }
}
