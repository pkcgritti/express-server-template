import ICreate from './ICreate';
import IRead from './IRead';
import IUpdate from './IUpdate';
import IDelete from './IDelete';

export type ICreate<T> = ICreate<T>;
export type IRead<T> = IRead<T>;
export type IUpdate<T> = IUpdate<T>;
export type IDelete<T> = IDelete<T>;
export type Writer<T> = ICreate<T> & IUpdate<T> & IDelete<T>;
export type Reader<T> = IRead<T>;