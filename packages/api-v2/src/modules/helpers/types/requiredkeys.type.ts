/**
 * From type T, mark K param as required
 */
export type RequiredKeys<T, K extends keyof T> = Exclude<T, K> & Required<Pick<T, K>>;
