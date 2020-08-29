# Forum inspired by Reddit

Fullstack project with cool tech

- React
- TypeScript
- GraphQL
- URQL/Apollo
- Node.js (with express)
- PostgreSQL
- MikroORM/TypeORM
- Redis
- Next.js
- TypeGraphQL
- Chakra
- Docker

## Server

Navigate to the server repository:

```
cd server
```

1.  Install dependencies

```
yarn
```

2. Start server with nodemon (running on js)

```
yarn run dev
```

3. Update js files in /dist folder

```
yarn run tsc -w
```

### Run local database for development

Setup an .env (used for dev environment) file in the server folder with these variables set:

```
POSTGRES_PASSWORD
POSTGRES_USER
POSTGRES_DB
```

After this you can run:

```
  docker-compose -f dev.docker-compose.yml up -d
```

## Client

Navigate to the client repository:

```
cd client
```

1.  Install dependencies

```
yarn
```

2. Start next.js client

```
yarn next dev
```
