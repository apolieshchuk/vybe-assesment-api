import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SolanaRpcModule } from './modules/solana-rpc/solana-rpc.module';
import { validate } from './env.validation';
import { AppEnvConfig } from './app-env.config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    SolanaRpcModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => validate(env, AppEnvConfig),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 30 * 1000, // 30 seconds
        limit: 10,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
