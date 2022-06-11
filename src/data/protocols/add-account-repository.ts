import {
  AccountModel,
  AddAccountModel,
} from '../usecases/db-add-account-protocols'

export interface AddAccountRepository {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
