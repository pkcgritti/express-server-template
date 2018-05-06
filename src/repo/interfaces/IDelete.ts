export default interface IDelete<T> {
  delete (conditions?: any): Promise<any>
  deleteOne (conditions?: any): Promise<any>
}
