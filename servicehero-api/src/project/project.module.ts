import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.schema';
import { CaslModule } from '../casl/casl.module';
import { ListingModule } from '../listing/listing.module';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    AuthModule,
    CaslModule,
    ListingModule,
    UserModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
