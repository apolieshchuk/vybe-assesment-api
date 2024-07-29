import { IsNotEmpty, IsUUID } from 'class-validator';

export class AppEnvConfig {
  @IsNotEmpty()
  @IsUUID(4)
  SOLANA_RPC_ID: string;
}
