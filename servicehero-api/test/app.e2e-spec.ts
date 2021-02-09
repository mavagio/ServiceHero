import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserModule } from '../src/user/user.module';
import { AuthModule } from '../src/auth/auth.module';
import { UserService } from '../src/user/user.service';
import { UserType } from '../src/user/types';

const specialist = {
  name: 'Test Test',
  email: 'test@email.com',
  password: 'testPassword',
  type: UserType.Specialist,
};

describe('Test app (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        UserModule,
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    userService = moduleFixture.get<UserService>(UserService);
    await app.init();
  });

  const createSpecialist = async () => {
    return request(app.getHttpServer())
      .post('/user')
      .send(specialist);
  };

  const deleteSpecialist = async () => {
    userService.deleteByEmail(specialist.email);
  };

  describe('Test user authentication', () => {
    beforeEach(async () => {
      await createSpecialist();
    });

    afterEach(async () => {
      await deleteSpecialist();
    });

    it('/user (POST) login with correct credentials', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: specialist.email,
          password: specialist.password,
        })
        .expect(201);

      expect(res.body.access_token.length).toBeGreaterThan(0);
    });

    it('/user (POST) login with incorrect password', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: specialist.email,
          password: 'wrong_password',
        })
        .expect(401);
    });

    it('/user (POST) login with incorrect email', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'wrong_email@email.com',
          password: specialist.password,
        })
        .expect(401);
    });
  });
});
