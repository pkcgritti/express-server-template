export type Difference<T extends string, U extends string> = ({ [P in T]: P } & {[P in U]: never } & { [x: string]: never })[T]
export type Union<T extends string, U extends string> = T | U
export type Intersect<T extends string, U extends string> = T & U
export type Omit<T, K extends keyof T> = Pick<T, Difference<keyof T, K>>
export type Rest<T, U extends keyof T> = Difference<keyof T, U>
export type PickAll<T> = { [P in keyof T]: T[P] }
export type SemiPartialJoiner<T, U extends keyof T> = PickAll<Pick<T, U> & Partial<Pick<T, Rest<T, U>>>>