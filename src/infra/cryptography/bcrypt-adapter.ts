import { Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements Encrypter {
  async encrypt(value: string): Promise<string> {
    const hashedValues = await bcrypt.hash(value, 12)
    return hashedValues
  }
}
