export interface IWrite<T> {
  create (doc : T) : Promise<T>
  createMany (docs : T[]) : Promise<T[]>
}

export interface IRead<T> {
  
}