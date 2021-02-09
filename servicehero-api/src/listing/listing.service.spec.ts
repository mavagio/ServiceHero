import { Test, TestingModule } from '@nestjs/testing';
import { ListingService } from './listing.service';
import { ListingModule } from './listing.module';
import { AppModule } from '../app.module';

describe('ListingService', () => {
  let service: ListingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ListingModule],
    }).compile();

    service = module.get<ListingService>(ListingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
