import { Test, TestingModule } from '@nestjs/testing';
import { SolanaRpcController } from './solana-rpc.controller';
import { SolanaRpcService } from './solana-rpc.service';

describe('AppController', () => {
  let appController: SolanaRpcController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SolanaRpcController],
      providers: [SolanaRpcService],
    }).compile();

    appController = app.get<SolanaRpcController>(SolanaRpcController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
