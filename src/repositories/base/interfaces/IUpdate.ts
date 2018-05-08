export default interface IUpdate<T> {
  update (conditions: any, doc: any, options?: any): Promise<any>
  updateOne (conditions: any, doc: any, options?: any): Promise<any>
}
