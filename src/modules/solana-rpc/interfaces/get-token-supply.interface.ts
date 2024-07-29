export interface GetTokenSupplyInterface {
  context: {
    apiVersion: string;
    slot: number;
  };
  value: {
    amount: string;
    decimals: number;
    uiAmount: number;
    uiAmountString: string;
  };
}
