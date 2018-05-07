import './db'

// import Repo from './repo'

import { MongooseType, basicField, arrayField, objectField, ModelBuilder } from './repo/base/MongooseType';

class StreetType extends MongooseType {
  @basicField()
  number: number
  @basicField()
  name: string
}

class AddressType extends MongooseType {
  @basicField()
  city: string
  @objectField(StreetType)
  street: StreetType
}

class UserType extends MongooseType {
  @basicField()
  username: string
  @basicField()
  password: string
  @arrayField(String)
  tags: string[]
  @objectField(AddressType)
  address: AddressType
}

let u = new UserType()
u.getSchema()