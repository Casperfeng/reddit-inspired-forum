# reddit-inspired-forum

Fullstack project with cool tech

- React
- TypeScript
- GraphQL
- URQL/Apollo
- Node.js
- PostgreSQL
- MikroORM/TypeORM
- Redis
- Next.js
- TypeGraphQL
- Chakra
- Docker

## Run local database for development

Setup an dev.env file in the server folder with these variables set:

```
POSTGRES_PASSWORD
POSTGRES_USER
POSTGRES_DB
```

After this you can run:

```
  docker-compose -f dev.docker-compose.yml up -d
```
