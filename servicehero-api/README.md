## ServiceHero API

The back end of Service hero is built using Typescript in combination with [NestJs](https://nestjs.com/)


The API was built using best practices from official documentation, dividing the code into modules, enhancing the security by using [Casl](https://github.com/stalniy/casl), for Authorization and more. Enabling user Authentication with Passport js local JWT strategy. Overall this setup provides flexibility in extending the features as well as this decoupling achieves more maintainable setup.

The data-source for this project is MongoDb. Therefore you need to provide any valid MongoDb URL in `.env` file in order to start the application. 
For more read the instructions on how to run the code.

## How to run the code:
In order for the code to run the `.env` file is included with environment variables. In production like environment those variables are sensitive therefore it should not be included in the source. However for testing purposes we leave it here.
- Install all dependencies by `yarn` or `npm i`.
- You can change the `.env` file with the following variables:
  - `DB_URL` url to connect to mongodb instance (can be locally or remotely)
  - `PORT` for where to run the code (e.g. 8080)
  - `JWT_SECRET` secret key for encrypting Json Web Tokens
- After `.env` file is created in the root of this directory you can run the api by `yarn start` or `yarn start:dev` for starting it in development mode.
- There are some unit tests and to end tests. For running those use `yarn test` and `yarn test:e2e` accordingly.

