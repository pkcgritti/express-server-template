import UserBuilder from './types/User'
import connection from '../db'

export default {
  User: UserBuilder(connection)
}