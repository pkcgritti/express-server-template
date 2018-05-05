import connection from '../db'
import UserRepository from './User'

export default {
  User: new UserRepository(connection)
}
