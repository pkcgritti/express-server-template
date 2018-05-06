import { Model, DocumentQuery, Document, Aggregate, Query, ModelUpdateOptions } from 'mongoose'
import { Writable, Readable } from '../interfaces'
import { autoBind } from '../../helpers'

abstract class MongooseRepository<Custom, Native extends Document> implements Writable<Custom>, Readable<Custom> {
  private model: Model<Native>

  constructor (model: Model<Native>) {
    this.model = model
    autoBind(this)
  }

  public pipeline (): Pipeline<Custom, Native> {
    return new Pipeline(this.model)
  }

  private __find (conditions?: any, projection?: any, options?: any): DocumentQuery<Native[], Native> {
    return this.model.find(conditions, projection, options)
  }

  public $find (conditions?: any, projection?: any, options?: any): Promise<Native[]> {
    return this.__find(conditions, projection, options).exec()
  }

  public find (conditions?: any, projection?: any, options?: any): Promise<Custom[]> {
    return this.__find(conditions, projection, options).lean().exec()
  }

  private __findOne (conditions?: any, projection?: any, options?: any): DocumentQuery<Native, Native> {
    return this.model.findOne()
  }

  public $findOne (conditions?: any, projections?: any, options?: any): Promise<Native> {
    return this.__findOne(conditions, projections, options).exec()
  }

  public findOne (conditions?: any, projections?: any, options?: any): Promise<Custom> {
    return this.__findOne(conditions, projections, options).lean().exec()
  }

  public delete (conditions: any): Promise<any> {
    return this.model.deleteMany(conditions).exec()
  }

  public deleteOne (conditions: any): Promise<any> {
    return this.model.deleteOne(conditions).exec()
  }

  public create (docs: Custom[]): Promise<Custom[]> {
    return this.model.create(docs)
      .then(docs => docs.map(doc => <Custom>doc.toObject()))
  }

  public $create (docs: Custom[]): Promise<Native[]> {
    return this.model.create(docs)
  }

  public createOne (doc: Custom): Promise<Custom> {
    return this.model.create(doc)
      .then(doc => <Custom>doc.toObject())
  }

  public $createOne (doc: Custom): Promise<Native> {
    return this.model.create(doc)
  }

  public update (conditions: any, doc: any, options?: ModelUpdateOptions): Promise<any> {
    return this.model.updateMany(conditions, doc, options).exec()
  }

  public updateOne (conditions: any, doc: any, options: ModelUpdateOptions = { new: true }): Promise<any> {
    return this.model.updateOne(conditions, doc, options).exec()
  }
}

class Pipeline<Custom, Native extends Document> {
  private model: Model<Native>
  private stages: any[]

  constructor (model: Model<Native>) {
    this.model = model
    this.stages = []
  }

  private __append (stage: string, expression: Object | number) {
    this.stages.push({ [stage]: expression })
  }

  public match (expression: Object): Pipeline<Custom, Native> {
    this.__append('$match', expression)
    return this
  }

  public project (expression: Object): Pipeline<Custom, Native> {
    this.__append('$project', expression)
    return this
  }

  public group (expression: Object): Pipeline<Custom, Native> {
    this.__append('$group', expression)
    return this
  }

  public sort (expression: Object): Pipeline<Custom, Native> {
    this.__append('$sort', expression)
    return this
  }

  public limit (integer: number): Pipeline<Custom, Native> {
    this.__append('$limit', integer)
    return this
  }

  public execute () {
    return this.model.aggregate(this.stages)
  }

  public build (): Function {
    return this.execute.bind(this)
  }
}

export default MongooseRepository
