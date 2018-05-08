import { collection, aprop, prop } from '../decorators/mongoose'
import { Email } from './email'

@collection('User')
export class User {
  @prop()
  username: string
  @prop()
  password: string
  @prop()
  email?: Email
}

export interface IUser extends User {}