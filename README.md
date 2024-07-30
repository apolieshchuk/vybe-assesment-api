## Description Vybe Assesment API
- Project built with NestJS, Docker, Redis and Swagger.
- The project is a simple API that allows users to get some metrics from solana rpc
- API created in the module pattern
- The project is dockerized and can be run with docker-compose
- For caching, `Redis` was used
- `Swagger` was used to document the API. Can be accessed at `https://{baseUrl}/api`
- The project-api is hosted on heroku and can be accessed at https://vybe-assesment-d090f83d67ce.herokuapp.com/api
- Basic throttling was implemented to prevent abuse of the API
- ENV file validation schema described in the `src/app-config.schema.ts` file. On app start, the app will validate the ENV file and throw an error if any required field is missing or invalid

## Installation and Running the app 

1. replace the .env.example file with .env and fill in the required fields
2. run the following command
`docker-compose -f docker-compose.yml --env-file ./.env up`
3. The app will be running on http://localhost:3000


## Test

```bash
# unit tests
$ npm run test
```
