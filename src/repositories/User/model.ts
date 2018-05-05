import { Schema, Document, Connection } from 'mongoose'

export interface IUser {
  username : string
  password : string
  email : string
}

export interface IUserInstance extends IUser {
  _id? : any
}

export interface IUserDocument extends IUser, Document {
}

export const UserSchema = new Schema({
  username: { type: String, required: [ true, 'Nome de usuário é obrigatório' ] },
  password: { type: String, required: [ true, 'Senha é obrigatória' ] },
  email: { type: String, required: [ true, 'Email é obrigatório' ] }
})
UserSchema.set('versionKey', false)

export const UserBuilder = (conn : Connection) => conn.model<IUserDocument>('User', UserSchema, 'users')
