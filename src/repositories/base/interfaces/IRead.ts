export default interface IRead<T> {
  find (conditions? : any, projections?: any, options?: any): Promise<T[]>
  findOne (condition?: any, projections?: any, options?: any): Promise<T>
}
