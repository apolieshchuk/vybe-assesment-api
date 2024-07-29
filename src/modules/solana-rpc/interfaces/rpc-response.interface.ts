export interface RpcResponseInterface<T> {
  jsonrpc: string;
  id: number;
  result: T;
}
