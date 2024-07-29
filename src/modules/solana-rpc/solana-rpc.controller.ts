import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { SolanaRpcService } from './solana-rpc.service';
import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";
import { MarketCapDto } from "./dto/market-cap.dto";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ApiResponse } from "./interfaces/api-response";
import { TpsDto } from "./dto/tps.dto";
import { WalletBalanceDto } from "./dto/wallet-balance.dto";

@Controller()
export class SolanaRpcController {
  constructor(private readonly appService: SolanaRpcService) {}

  @Get('/market-cap')
  @ApiOperation({ summary: 'Get market capitalization', description: 'Returns the market capitalization of 5 random assets.' })
  @ApiOkResponse({ type: [MarketCapDto] })
  marketCap(): Promise<ApiResponse<MarketCapDto[]>> {
    return this.appService.marketCap();
  }

  @Get('/tps')
  @ApiOperation({ summary: 'Get transactions per second metric', description: 'Returns transactions per second metric for the last 12hours' })
  @ApiOkResponse({ type: [TpsDto] })
  @UseInterceptors(CacheInterceptor)
  tps(): Promise<ApiResponse<TpsDto[]>> {
    return this.appService.tps();
  }

  @Get('/wallet-balance')
  @ApiOperation({
    summary: 'Get wallet balance',
    description: 'Returns the balance of the 10 random wallets.'
  })
  @ApiOkResponse({ type: [WalletBalanceDto] })
  @UseInterceptors(CacheInterceptor)
  walletBalance(): Promise<ApiResponse<WalletBalanceDto[]>> {
    return this.appService.walletBalance();
  }
}
