import { UserRepository } from './user'
import connection from '../db'

export default {
  User: new UserRepository(connection)
}
