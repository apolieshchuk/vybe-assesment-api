import { MintAddressTokenMap } from "../constants";
import { ApiProperty } from "@nestjs/swagger";

export class MarketCapDto {
  @ApiProperty({
    description: 'Token name',
    example: 'JUP'
  })
  tokenName: string;

  @ApiProperty({
    description: 'Token address',
    example: '27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4'
  })
  tokenAddress: string;

  @ApiProperty({
    description: 'Calculated market cap',
    example: 11865131260.42
  })
  marketCap: number;
}