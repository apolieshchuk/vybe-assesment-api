import { MintAddressTokenMap } from "../constants";
import { ApiProperty } from "@nestjs/swagger";

export class TpsDto {
  @ApiProperty({
    description: 'Transactions per second',
    example: 3367
  })
  tps: number;

  @ApiProperty({
    description: 'Timestamp of the tps metric range end',
    example: '2024-07-29T05:10:08.244Z'
  })
  ts: Date;
}