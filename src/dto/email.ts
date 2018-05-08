import { collection, aprop, prop } from '../decorators/mongoose'

export class Email {
  @prop()
  value: string
  @prop()
  validated?: boolean = false
}

export interface IEmail extends Email {}