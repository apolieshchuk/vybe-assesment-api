import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SolanaRpcModule } from './modules/solana-rpc/solana-rpc.module';
import { validate } from './env.validation';
import { AppEnvConfig } from './app-env.config';

@Module({
  imports: [
    SolanaRpcModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => validate(env, AppEnvConfig),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
