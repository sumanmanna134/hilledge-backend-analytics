import { Test, TestingModule } from '@nestjs/testing';
import { IpLocationService } from './ip-location.service';

describe('IpLocationService', () => {
  let service: IpLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpLocationService],
    }).compile();

    service = module.get<IpLocationService>(IpLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
