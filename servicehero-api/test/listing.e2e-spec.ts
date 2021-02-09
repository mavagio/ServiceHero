import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserModule } from '../src/user/user.module';
import { AuthModule } from '../src/auth/auth.module';
import { UserType } from '../src/user/types';
import { ListingModule } from '../src/listing/listing.module';
import { ListingType } from '../src/listing/types';
import { UserService } from '../src/user/user.service';

const specialist = {
  name: 'Specialist 1',
  email: 'specialist2@email.com',
  password: 'testPassword',
  type: UserType.Specialist,
};

const specialist2 = {
  name: 'Specialist 2',
  email: 'specialist2@email.com',
  password: 'testPassword2',
  type: UserType.Specialist,
};

const client = {
  name: 'Test Test',
  email: 'test@email.com',
  password: 'testPassword',
  type: UserType.Client,
};

const listing = {
  type: ListingType.Moving,
  description: 'Mover description',
  hourlyRate: 20,
  availability: ['18:00', '19:00'],
};

describe('Test listing (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ListingModule, UserModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userService = moduleFixture.get<UserService>(UserService);
    await app.init();
  });

  const createUser = async user => {
    return request(app.getHttpServer())
      .post('/user')
      .send(user);
  };

  const deleteUser = async user => {
    return userService.deleteByEmail(user.email);
  };

  describe('Test listing authorization', () => {
    beforeEach(async () => {
      await createUser(client);
      await createUser(specialist);
      await createUser(specialist2);
    });

    afterEach(async () => {
      await deleteUser(client);
      await deleteUser(specialist);
      await deleteUser(specialist2);
    });

    it('/listing (POST) should not allow client to create listings', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: specialist.email,
          password: specialist.password,
        });

      const accessToken = res.body.access_token;
      expect(accessToken.length).toBeGreaterThan(0);

      return request(app.getHttpServer())
        .post('/listing')
        .send(listing)
        .expect(401);
    });

    it('/listing (POST) should not allow another specialist to delete listing', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: specialist.email,
          password: specialist.password,
        });

      const accessToken = res.body.access_token;
      expect(accessToken.length).toBeGreaterThan(0);

      return request(app.getHttpServer())
        .post('/listing')
        .send(listing)
        .expect(401);
    });
  });

  describe('Test listing creation', () => {
    beforeEach(async () => {
      await createUser(specialist);
    });

    afterEach(async () => {
      await deleteUser(specialist);
    });

    it('/listing (POST) should require login', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: specialist.email,
          password: specialist.password,
        });

      const accessToken = res.body.access_token;
      expect(accessToken.length).toBeGreaterThan(0);

      return request(app.getHttpServer())
        .post('/listing')
        .send(listing)
        .expect(401);
    });

    it('/listing (POST) (DELETE) should create listing and delete it', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: specialist.email,
          password: specialist.password,
        });

      const accessToken = res.body.access_token;
      expect(accessToken.length).toBeGreaterThan(0);

      const createdListing = await request(app.getHttpServer())
        .post('/listing')
        .set('Authorization', 'bearer ' + accessToken)
        .send(listing)
        .expect(201);

      const {
        _id,
        availability,
        hourlyRate,
        type,
        description,
      } = createdListing.body;
      expect({ availability, hourlyRate, type, description }).toMatchObject(
        listing,
      );

      const deletedListing = await request(app.getHttpServer())
        .delete(`/listing/${_id}`)
        .set('Authorization', 'bearer ' + accessToken)
        .send(listing)
        .expect(200);

      expect(deletedListing.body._id).toBe(_id);
    });
  });
});
