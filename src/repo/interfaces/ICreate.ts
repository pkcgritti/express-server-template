export default interface ICreate<T> {
  create (doc: T[]): Promise<any>
  createOne (docs: T): Promise<T>
}
