import { Model, DocumentQuery, Document, Aggregate, Query } from 'mongoose'
import { IWrite, IRead } from './Interfaces'
import autoBind from '../helpers/binder'

abstract class MongooseRepository<Type, Native extends Document> implements IWrite<Type>, IRead<Type> {
  private model : Model<Native>

  constructor (model : Model<Native>) {
    this.model = model
    autoBind(this)
  }

  public pipeline () : Pipeline<Type, Native> {
    return new Pipeline(this.model)
  }

  private __find (conditions? : any, projection? : any, options? : any) : DocumentQuery<Native[], Native> {
    return this.model.find(conditions)
  }

  public $find (conditions? : any, projection? : any, options? : any) : Promise<Native[]> {
    return this.__find(conditions, projection, options).exec()
  }

  public find (conditions? : any, projection? : any, options? : any) : Promise<Type[]> {
    return this.__find(conditions, projection, options).lean().exec()
  }

  private __findOne (conditions? : any, projection? : any, options? : any) : DocumentQuery<Native, Native> {
    return this.model.findOne()
  }

  public $findOne (conditions? : any, projections? : any, options? : any) : Promise<Native> {
    return this.__findOne(conditions, projections, options).exec()
  }

  public findOne (conditions? : any, projections? : any, options? : any) : Promise<Type> {
    return this.__findOne(conditions, projections, options).lean().exec()
  }

  private __updateOne (conditions : any, doc : any, options : any = { new: true }) : DocumentQuery<Native, Native> {
    return this.model.findOneAndUpdate(conditions, doc, options)
  }

  public $updateOne (conditions : any, doc : any, options? : any) : Promise<Native> {
    return this.__updateOne(conditions, doc, options).exec()
  }

  public updateOne (conditions : any, doc : any, options? : any) : Promise<Type> {
    return this.__updateOne(conditions, doc, options).lean().exec()
  }

  public delete (conditions : any) : Promise<any> {
    return this.model.deleteMany(conditions).exec()
  }

  public deleteOne (conditions : any) : Promise<any> {
    return this.model.deleteOne(conditions).exec()
  }

  public create (doc : Type) : Promise<Type> {
    return this.model.create(doc)
      .then(native => <Type>native.toObject())
  }

  public $create (doc : Type) : Promise<Native> {
    return this.model.create(doc)
  }

  public createMany (docs : Type[]) : Promise<Type[]> {
    return this.model.create(docs)
      .then(docs => docs.map(doc => doc.toObject()))
  }

  public $createMany (docs : Type[]) : Promise<Native[]> {
    return this.model.create(docs)
  }

  public update (conditions : any, doc : Type, options : any) {
    return this.model.update(conditions, doc, options)
  }
}

class Pipeline<Type, Native extends Document> {
  private model : Model<Native>
  private stages : any[]

  constructor (model : Model<Native>) {
    this.model = model
    this.stages = []
  }

  private __append (stage : string, expression : Object | number) {
    this.stages.push({ [stage]: expression })
  }

  public match (expression : Object) : Pipeline<Type, Native> {
    this.__append('$match', expression)
    return this
  }

  public project (expression : Object) : Pipeline<Type, Native> {
    this.__append('$project', expression)
    return this
  }

  public group (expression : Object) : Pipeline<Type, Native> {
    this.__append('$group', expression)
    return this
  }

  public sort (expression : Object) : Pipeline<Type, Native> {
    this.__append('$sort', expression)
    return this
  }

  public limit (integer : number) : Pipeline<Type, Native> {
    this.__append('$limit', integer)
    return this
  }

  public build () : Function {
    return this.model.aggregate.bind(this, this.stages)
  }
}

export default MongooseRepository
