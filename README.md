# @plcgi1/fastify-delayed-job plugin

## DESCRIPTION

REST api interface to make delayed jobs with [pg-boss](https://github.com/timgit/pg-boss)

## FEATURES

1. swagger UI for developers
2. use [pg-boss](https://github.com/timgit/pg-boss) for delayed jobs with psql
3. add delayed job with variables
4. view list of delayed jobs
5. cancel delayed jobs 
6. To be continued...

## USE CASES

1. Send delayed emails to clients with templates
2. Execute some delayed jobs for your app, like as a cron with statistic in db(psql)

## INSTALL

```
npm install @plcgi1/fastify-delayed-job
```

## USAGE

Full usage example in ./examples folder. You can use it as boilerplate too

```
mkdir your-project
cd your-project
npm init
cp node_modules/@plcgi1/fastify-delayed-job/examples .
npm install

# edit .env file with your requirements
# create required database
# add subscribers logic.
#   Interface example in src/subscribers/default.js

npm start

# go to browser - http://localhost:3000/docs

```

### ADDITIONAL fastify objects

1. fastify.pgboss
2. req.pgboss
3. fastify.subscribers
4. req.subscribers

## ISSUES

PR and issues are welcome

## DEPENDENCIES

1. [fastify](https://www.fastify.io/)
2. [fastify-plugin](https://github.com/fastify/fastify-plugin)
3. [fastify-swagger](https://github.com/fastify/fastify-swagger)
4. [sanitize-html](https://github.com/apostrophecms/sanitize-html)
5. [pgboss](https://www.npmjs.com/package/pg-boss)
6. [mongo-sql](https://www.npmjs.com/package/mongo-sql)
6. [autoloader](https://www.npmjs.com/package/@specla/autoloader)
7. [dotenv](https://www.npmjs.com/package/dotenv)