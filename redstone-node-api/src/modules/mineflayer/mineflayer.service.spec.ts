import { Test, TestingModule } from '@nestjs/testing';
import { MineflayerService } from './mineflayer.service';

describe('MineflayerService', () => {
  let service: MineflayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MineflayerService],
    }).compile();

    service = module.get<MineflayerService>(MineflayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
