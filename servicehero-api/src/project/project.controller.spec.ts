import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { ProjectController } from './project.controller';
import { ProjectModule } from './project.module';

describe('Project Controller', () => {
  let controller: ProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ProjectModule],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
