import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { ListingModule } from './listing/listing.module';
import { CaslModule } from './casl/casl.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'testing'
        ? process.env.TEST_DB_URL
        : process.env.DB_URL,
      {
        useFindAndModify: false,
        useCreateIndex: true,
      },
    ),
    UserModule,
    AuthModule,
    ProjectModule,
    ListingModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
