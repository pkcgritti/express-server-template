import MongooseRepository from '../MongooseRepository'
import { Connection, Model } from 'mongoose'
import { UserBuilder, IUserInstance, IUserDocument } from './model'

class UserRepository extends MongooseRepository<IUserInstance, IUserDocument> {
  constructor (conn : Connection) {
    super(UserBuilder(conn))
  }
}

export default UserRepository