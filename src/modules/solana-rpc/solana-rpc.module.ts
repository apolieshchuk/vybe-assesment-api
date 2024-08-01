import { Module } from '@nestjs/common';
import { SolanaRpcController } from './solana-rpc.controller';
import { SolanaRpcService } from './solana-rpc.service';
import { HttpModule } from '@nestjs/axios';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppEnvConfig } from '../../app-env.config';
import { NodeEnv } from '../../enums/node-env.enum';

@Module({
  imports: [
    HttpModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppEnvConfig>) => ({
        store:
          config.get('ENV') === NodeEnv.Dev ? 'memory' : (redisStore as any),
        ttl: config.get('ENV') === NodeEnv.Dev ? 30 * 1000 : 30, // for redisStore in seconds for memory in ms
        max: 10, // maximum number of items in cache,
        socket: {
          host: config.get('REDIS_HOST'),
          port: 6379,
        },
      }),
    }),
  ],
  controllers: [SolanaRpcController],
  providers: [SolanaRpcService],
})
export class SolanaRpcModule {}
