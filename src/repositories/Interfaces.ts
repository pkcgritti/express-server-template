export interface ICreate<T> {
  create (doc: T[]): Promise<any>
  createOne (docs: T): Promise<T>
}

export interface IRead<T> {
  find (conditions? : any, projections?: any, options?: any): Promise<T[]>
  findOne (condition?: any, projections?: any, options?: any): Promise<T>
}

export interface IUpdate<T> {
  update (conditions: any, doc: any, options?: any): Promise<any>
  updateOne (conditions: any, doc: any, options?: any): Promise<any>
}

export interface IDelete<T> {
  delete (conditions?: any): Promise<any>
  deleteOne (conditions?: any): Promise<any>
}

export type Writable<T> = ICreate<T> & IUpdate<T> & IDelete<T>

export type Readable<T> = IRead<T>