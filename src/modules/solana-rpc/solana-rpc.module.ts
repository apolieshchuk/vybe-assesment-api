import { Module } from '@nestjs/common';
import { SolanaRpcController } from './solana-rpc.controller';
import { SolanaRpcService } from './solana-rpc.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SolanaRpcController],
  providers: [SolanaRpcService],
})
export class SolanaRpcModule {}
