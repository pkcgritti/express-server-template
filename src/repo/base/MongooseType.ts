import 'reflect-metadata'
import * as mongoose from 'mongoose'

export abstract class MongooseType {
  public getSchema () {
    var schema = Reflect.getMetadata('schema', this)
    console.log(schema)
    return schema
  }
}

export function basicField (options?: any) {
  return function (target: any, propName: string) {
    var type = Reflect.getMetadata('design:type', target, propName);
    // console.log(`${propName}: ${type.name}`);

    var schema = Reflect.getMetadata('schema', target)
    if (!schema) schema = {}
    schema[propName] = { type: type, ...options }
    Reflect.defineMetadata('schema', schema, target)
    Reflect.defineMetadata('schema:' + target.constructor.name, schema, MongooseType)
  }
}

export function arrayField (fieldType: Function, options?: any) {
  return function (target: any, propName: string) {
    var type = Reflect.getMetadata('design:type', target, propName)
    // console.log(`${propName}: ${fieldType.name}[]`)

    var schema = Reflect.getMetadata('schema', target)
    if (!schema) schema = {}
    schema[propName] = [ { type: fieldType, ...options } ]
    Reflect.defineMetadata('schema', schema, target)
  }
}

export function objectField (fieldType: Function, options?: any) {
  return function (target: any, propName: string) {
    var type = Reflect.getMetadata('design:type', target, propName)
    // console.log(`${propName}: ${fieldType.name} Object`)
    var foreing_schema = Reflect.getMetadata('schema:' + fieldType.name, MongooseType)
    var schema = Reflect.getMetadata('schema', target)
    if (!schema) schema = {}
    schema[propName] = { ...foreing_schema }
    Reflect.defineMetadata('schema', schema, target)
    Reflect.defineMetadata('schema:' + target.constructor.name, schema, MongooseType)
  }
}

export function ModelBuilder<T extends MongooseType> (connection: mongoose.Connection, type: T) {
  
}

export default MongooseType
