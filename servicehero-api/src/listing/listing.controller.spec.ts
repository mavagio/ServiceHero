import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { ListingController } from './listing.controller';
import { ListingModule } from './listing.module';

describe('Listing Controller', () => {
  let controller: ListingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ListingModule],
    }).compile();

    controller = module.get<ListingController>(ListingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
