import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { UserController } from './user.controller';
import { UserModule } from './user.module';

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [AppModule, UserModule],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
