export interface ContractRes<T> {
  data: T;
  message: string;
  error: string | null;
}
