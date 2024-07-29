import { MintAddressTokenMap } from "../constants";
import { ApiProperty } from "@nestjs/swagger";

export class WalletBalanceDto {
  @ApiProperty({
    description: 'Wallet address',
    example: 'FWznbcNX...uN5'
  })
  wallet: string;

  @ApiProperty({
    description: 'Wallet balance',
    example: 2730000
  })
  balance: number;
}