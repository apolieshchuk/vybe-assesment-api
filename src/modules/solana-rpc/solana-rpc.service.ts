import { Injectable } from '@nestjs/common';
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

@Injectable()
export class SolanaRpcService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService<AppEnvConfig>,
  ) {}
  async marketCap(): Promise<any> {
    // Shuffle array (generates random num from -0.5 to 0.5 for elements sorting)
    const shuffled = Object.keys(MintAddressTokenMap).sort(
      () => 0.5 - Math.random(),
    );

    // Get 5 tokens after shuffling;
    const tokens = shuffled.slice(0, 5);

    const resProm = await this.solanaRpcRequest<GetTokenSupplyInterface>(
      'getTokenSupply',
      tokens,
    );

    const observer$ = this.httpService.get<RaydimResponseInterface>(
      `https://api-v3.raydium.io/mint/price?mints=${tokens.join()}`,
    );
    const result = await lastValueFrom(observer$);

    return tokens.map((token, i) => ({
      tokenName: MintAddressTokenMap[token],
      tokenAddress: token,
      res1: resProm[i].value,
      res2: result.data.data[token],
      marketCap:
        Math.round(
          +resProm[i].value.uiAmount * +result.data.data[token] * 100,
        ) / 100,
    }));
  }

  async tps(): Promise<any> {
    const nMins = 720;
    const groupBy = nMins / 10;
    const [resProm] = await this.solanaRpcRequest<
      GetRecentPerformanceInterface[]
    >('getRecentPerformanceSamples', [nMins]);
    const groupedBy5 = resProm.reduce((acc, item, i) => {
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
    return groupedBy5.slice(0, 15).map((item, i) => ({
      tps: Math.round(item.numTransactions / item.samplePeriodSecs),
      ts: i === 0 ? new Date() : new Date(Date.now() - i * groupBy * 1000 * 60),
    }));
  }

  async walletBalance(): Promise<any> {
    // Shuffle array (generates random num from -0.5 to 0.5 for elements sorting)
    const shuffled = SOLANA_WALLETS.sort(() => 0.5 - Math.random());

    // Get 5 wallets after shuffling;
    const wallets = shuffled.slice(0, 10);

    const resProm = await this.solanaRpcRequest<GetBalanceInterface>(
      'getBalance',
      wallets,
    );
    return resProm.map((item, i) => {
      return {
        wallet: wallets[i].slice(0, 8) + '...' + wallets[i].slice(-3),
        balance: Math.round(item.value / SOLANA_LAMPORT),
      };
    });
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
