import { DbAddAccount } from '../../../data/usecases/db-add-account'
import { BCryptAdapter } from '../../../infra/cryptography/bcrypt-adapter'
import { MongoAccountRepository } from '../../../infra/db/mongodb/account-repository/mongo-account-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../../utils/email-validator/email-validator-adapter'

export const makeSignupController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const ecrypter = new BCryptAdapter()
  const addAccountRepository = new MongoAccountRepository()
  const dbAddAccount = new DbAddAccount(ecrypter, addAccountRepository)
  return new SignUpController(emailValidator, dbAddAccount)
}
