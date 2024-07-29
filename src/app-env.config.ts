import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { NodeEnv } from "./enums/node-env.enum";

export class AppEnvConfig {
  @IsNotEmpty()
  @IsUUID(4)
  SOLANA_RPC_ID: string;

  @IsEnum(NodeEnv)
  @IsNotEmpty()
  ENV: string;

  @IsString()
  @IsNotEmpty()
  REDIS_HOST: string;

  @IsString()
  @IsNotEmpty()
  RAYDIUM_API_URL: string;
}
