# SuperHero

**SuperHero** is a service focused on superheroes. 
It allows you to create and edit superheroes. 
You can also add up to 10 pictures to each hero.
And of course you can view the created heroes

## Manually
1. Create and fill all `.env` files. These files are:

   - `server/.env`
   - `client/.env`

   You should use these files as a reference:
   - `server/.env.example`
   - `client/.env.example`

2. Install dependencies (`node_modules`). Run `npm run install:all` in the root folder.


3. Run the database. You can either run it in docker using command `cd server && docker-compose up -d`


4. Apply migrations: `cd server && npm run db:migrate:dev:local`


5. Run seed if you wont `cd server && npm run seed:soft`


6. Run server: `cd server && npm run start:dev:local`


7. Run client: `cd client && npm run start:dev:local`

## Testing

- Run test on client: `cd client && npm run test`
- Run test on server: `cd server && npm run test`
