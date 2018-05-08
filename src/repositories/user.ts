import { Document, Connection } from 'mongoose'
import { User, IUser } from '../dto/user'
import { buildModel } from '../decorators/mongoose'
import MongooseRepository from './base/mongoose'

export interface IUserDocument extends IUser, Document {}

export class UserRepository extends MongooseRepository<IUser, IUserDocument> {
  constructor (conn : Connection) {
    super(buildModel<IUserDocument>(conn, User))
  }
}