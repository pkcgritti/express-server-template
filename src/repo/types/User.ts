import { MongooseType, basicField, arrayField, objectField, ModelBuilder } from '../base/MongooseType'
import MongooseRepository from '../base/MongooseRepository'
import { Document, Model, Connection } from 'mongoose'
import { SemiPartialJoiner, Omit } from '../../helpers/types'

export class UserType extends MongooseType {
  @basicField({ required: true })
  username: string
  @basicField()
  password: string
  @basicField()
  firstName: string
  @basicField()
  lastName: string
  @basicField()
  email: string
}

export class UserRepository extends MongooseRepository<UserType, UserType & Document> {
  constructor (model: Model<UserType & Document>) {
    super(model)
  }
}

export default function (connection: Connection) {
  const TypeInstance = new UserType()
  const schema = TypeInstance.getSchema()
  const model = connection.model<UserType & Document>('User', schema)
  return new UserRepository(model)
}


