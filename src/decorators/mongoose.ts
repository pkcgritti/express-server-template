import 'reflect-metadata'
import { Document, Schema, Connection } from 'mongoose'

export function appendSchemaType (metaKey: string, propName: string, propValue: any, target: any): any {
  let content = Reflect.getMetadata(metaKey, target)
  if (content === undefined) content = {}
  content[propName] = propValue
  Reflect.defineMetadata(metaKey, content, target)
  return content
}

export function getSchemaTypes (target: any): any {
  return Reflect.getMetadata('schema:types', target.prototype)
}

export function getSchemaName (target: any): any {
  return Reflect.getMetadata('schema:name', target)
}

export function aprop (subtype: Function, options?: any) {
  return function (target: any, propertyName: string): any | never {
    const type = Reflect.getMetadata('design:type', target, propertyName)
    if (type.name !== 'Array') throw new TypeError('Property must be array')
    const typeSchema = getSchemaTypes(subtype)
    if (typeSchema === undefined) {
      appendSchemaType('schema:types', propertyName, [ { type: subtype, ...options } ], target)
    } else {
      appendSchemaType('schema:types', propertyName, [ typeSchema ], target)
    }
  }
}

export function prop (options?: any) {
  return function (target: any, propertyName: string) {
    const type = Reflect.getMetadata('design:type', target, propertyName)
    const typeSchema = getSchemaTypes(type)
    if (typeSchema === undefined) {
      appendSchemaType('schema:types', propertyName, { type: type, ...options }, target)
    } else {
      appendSchemaType('schema:types', propertyName, typeSchema, target )
    }
  }
}

export function collection (name: string) {
  return function (target: any) {
    Reflect.defineMetadata('schema:name', name, target)
  }
}

export function index (expression: any) {
  return function (target: any) {
    Reflect.defineMetadata('schema:index', expression, target)
  }
}

export function method () {
  return function (target: any, propertyName: string, propertyDescriptor: PropertyDescriptor) {
    console.log(`${propertyName}: Function`)
  }
}

export function buildSchema (type: any) : Schema | never {
  let schemaTypes = getSchemaTypes(type)
  if (!schemaTypes) throw new TypeError(`Type ${type.name} does not contain a schema`)
  const schemaInstance = new Schema(schemaTypes, { versionKey: false })
  return schemaInstance;
}

export function buildModel<T extends Document> (connection: Connection, type: Function, options?: any) {
  const schemaName = getSchemaName(type)
  if (!schemaName) throw new TypeError(`Type ${type.name} does not contain a schema name`)
  const schema = buildSchema(type)
  return connection.model<T>(schemaName, schema)
}