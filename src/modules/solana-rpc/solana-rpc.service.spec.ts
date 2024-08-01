import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable, of } from 'rxjs';
import { SolanaRpcService } from './solana-rpc.service';
import { RpcResponseInterface } from './interfaces/rpc-response.interface';
import { GetTokenSupplyInterface } from './interfaces/get-token-supply.interface';
import { RaydimResponseInterface } from './interfaces/raydim-response.interface';
import { GetRecentPerformanceInterface } from './interfaces/get-recent-performance.interface';
import { GetBalanceInterface } from './interfaces/get-balance.interface';
import {
  MintAddressTokenMap,
  SOLANA_LAMPORT,
  SOLANA_WALLETS,
} from './constants';
import { AxiosResponse } from 'axios';
import { MarketCapDto } from './dto/market-cap.dto';

describe('SolanaRpcService', () => {
  let service: SolanaRpcService;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SolanaRpcService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'RAYDIUM_API_URL':
                  return 'http://mock-raydium-api-url';
                case 'SOLANA_RPC_ID':
                  return 'mock-solana-rpc-id';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<SolanaRpcService>(SolanaRpcService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('marketCap', () => {
    it('should return market caps', async () => {
      const mockTokenSupplies: GetTokenSupplyInterface[] = [1, 2, 3, 4, 5].map(
        (i) =>
          ({
            value: {
              amount: `${i}00`,
              decimals: i * 100.0,
              uiAmountString: '' + i * 100,
              uiAmount: i * 100,
            },
          }) as GetTokenSupplyInterface,
      );

      const priceData = Object.keys(MintAddressTokenMap).reduce(
        (acc, token) => {
          return { ...acc, [token]: String(100 * Math.random()) };
        },
        {},
      );

      const mockRaydimResponseData: RaydimResponseInterface = {
        id: '1',
        success: true,
        data: priceData,
      };
      const mockRaydimResponse = <AxiosResponse<RaydimResponseInterface>>{
        data: mockRaydimResponseData,
      };

      jest
        .spyOn(service, 'solanaRpcRequest')
        .mockResolvedValue(mockTokenSupplies);
      jest.spyOn(httpService, 'get').mockReturnValue(of(mockRaydimResponse));

      const result = await service.marketCap();

      result.data.forEach((item) => {
        expect(item.tokenName).toBeDefined();
        expect(item.tokenAddress).toBeDefined();
        expect(item.marketCap).toBeDefined();
        expect(item.marketCap).toBeGreaterThan(0);
      });
    });
  });

  describe('tps', () => {
    it('should return TPS data', async () => {
      const mockPerformanceSamples = new Array(100).fill(null).map(
        (_, i) =>
          ({
            numTransactions: Math.max(Math.round(100 * i * Math.random()), 60),
            samplePeriodSecs: 60,
          }) as GetRecentPerformanceInterface,
      );

      jest
        .spyOn(service, 'solanaRpcRequest')
        .mockResolvedValue([mockPerformanceSamples]);

      const result = await service.tps();

      result.data.forEach((item) => {
        expect(item.tps).toBeGreaterThan(0);
        expect(item.ts).toBeDefined();
      });
    });
  });

  describe('walletBalance', () => {
    it('should return wallet balances', async () => {
      const mockBalances: GetBalanceInterface[] = [
        { value: 1000000000 } as GetBalanceInterface,
        { value: 2000000000 } as GetBalanceInterface,
        { value: 3000000000 } as GetBalanceInterface,
      ];

      jest.spyOn(service, 'solanaRpcRequest').mockResolvedValue(mockBalances);

      const result = await service.walletBalance();

      expect(result.data).toEqual([
        { wallet: expect.stringContaining('...'), balance: 1 },
        { wallet: expect.stringContaining('...'), balance: 2 },
        { wallet: expect.stringContaining('...'), balance: 3 },
      ]);
    });
  });
});
