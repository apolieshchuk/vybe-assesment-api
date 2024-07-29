import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AppEnvConfig } from '../../app-env.config';
import { RpcResponseInterface } from './interfaces/rpc-response.interface';
import { GetTokenSupplyInterface } from './interfaces/get-token-supply.interface';
import {
  MintAddressTokenMap,
  SOLANA_LAMPORT,
  SOLANA_WALLETS,
} from './constants';
import { RaydimResponseInterface } from './interfaces/raydim-response.interface';
import { GetRecentPerformanceInterface } from './interfaces/get-recent-performance.interface';
import { GetBalanceInterface } from './interfaces/get-balance.interface';
import { MarketCapDto } from "./dto/market-cap.dto";
import { ApiResponse } from "./interfaces/api-response";
import { TpsDto } from "./dto/tps.dto";
import { WalletBalanceDto } from "./dto/wallet-balance.dto";

@Injectable()
export class SolanaRpcService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService<AppEnvConfig>,
  ) {}
  async marketCap(): Promise<ApiResponse<MarketCapDto[]>> {
    // Shuffle array (generates random num from -0.5 to 0.5 for elements sorting)
    const shuffled = Object.keys(MintAddressTokenMap).sort(
      () => 0.5 - Math.random(),
    );

    // Get 5 tokens after shuffling;
    const tokens = shuffled.slice(0, 5);

    const tokensSupplies = await this.solanaRpcRequest<GetTokenSupplyInterface>(
      'getTokenSupply',
      tokens,
    );

    const observer$ = this.httpService.get<RaydimResponseInterface>(
      `${this.config.get('RAYDIUM_API_URL')}/mint/price?mints=${tokens.join()}`,
    );
    const tokensPrice = await lastValueFrom(observer$);

    // Calculate market cap for each token if token amount and price are available
    const data = tokens.reduce<MarketCapDto[]>((acc, token, i) => {
      const tokenAmount = Number(tokensSupplies[i].value.uiAmount);
      const tokenPrice = Number(tokensPrice.data.data[token]);
      if (tokenAmount && tokenPrice) {
        acc.push({
          tokenName: MintAddressTokenMap[token],
          tokenAddress: token,
          marketCap: Math.round(tokenAmount * tokenPrice * 100) / 100,
        });
      }
      return acc;
    }, []);
    return { data }
  }

  async tps(): Promise<ApiResponse<TpsDto[]>> {
    const nMins = 12 * 60; // 720 mins
    const groupBy = 60; // 1 hour

    // Get recent performance samples
    const [recentPerformance] = await this.solanaRpcRequest<
      GetRecentPerformanceInterface[]
    >('getRecentPerformanceSamples', [nMins]);

    // Group by hours
    const groupedByHours = recentPerformance.reduce((acc, item, i) => {
      const index = Math.floor(i / groupBy);
      acc[index] = acc[index] || {
        ...item,
        numTransactions: 0,
        samplePeriodSecs: 0,
      };
      acc[index].numTransactions += item.numTransactions;
      acc[index].samplePeriodSecs += item.samplePeriodSecs;
      return acc;
    }, [] as GetRecentPerformanceInterface[]);

    const data: TpsDto[] = groupedByHours.map((item, i) => ({
      tps: Math.round(item.numTransactions / item.samplePeriodSecs),
      ts: i === 0 ? new Date() : new Date(Date.now() - i * groupBy * 1000 * 60),
    }));

    return { data };
  }

  async walletBalance(): Promise<ApiResponse<WalletBalanceDto[]>> {
    // Shuffle array (generates random num from -0.5 to 0.5 for elements sorting)
    const shuffled = SOLANA_WALLETS.sort(() => 0.5 - Math.random());

    // Get 5 wallets after shuffling;
    const wallets = shuffled.slice(0, 10);

    const balances = await this.solanaRpcRequest<GetBalanceInterface>(
      'getBalance',
      wallets,
    );
    const data = balances.map((item, i) => {
      return {
        wallet: wallets[i].slice(0, 8) + '...' + wallets[i].slice(-3),
        balance: Math.round(item.value / SOLANA_LAMPORT),
      };
    });
    return { data };
  }

  async solanaRpcRequest<T>(
    method: string,
    params: Array<string | any> = [],
  ): Promise<T[]> {
    const observable$ = this.httpService.post<RpcResponseInterface<T>[]>(
      `https://solana-mainnet.rpc.extrnode.com/${this.config.get('SOLANA_RPC_ID')}`,
      params.map((param) => ({
        jsonrpc: '2.0',
        id: 1,
        method,
        params: [param],
      })),
    );
    const response = await lastValueFrom(observable$);
    return response.data.map((item) => item.result);
  }
}
