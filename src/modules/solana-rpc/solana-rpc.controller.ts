import { Controller, Get } from '@nestjs/common';
import { SolanaRpcService } from './solana-rpc.service';

@Controller()
export class SolanaRpcController {
  constructor(private readonly appService: SolanaRpcService) {}

  @Get('/market-cap')
  marketCap(): Promise<any> {
    return this.appService.marketCap();
  }

  @Get('/tps')
  tps(): Promise<string> {
    return this.appService.tps();
  }

  @Get('/wallet-balance')
  walletBalance(): Promise<number> {
    return this.appService.walletBalance();
  }
}
