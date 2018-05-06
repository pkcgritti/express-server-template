import { MongooseBaseModel, basicField, arrayField, objectField } from '../base/MongooseModel';

class UserModel extends MongooseBaseModel {
  @basicField()
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

type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T]
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>
type UserType = { [K in keyof UserModel]: UserModel[K] }
type A = Omit<UserModel, 'getSchema'>

