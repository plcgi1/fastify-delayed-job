# @plcgi1/fastify-delayed-job plugin

## DESCRIPTION

REST api interface to make delayed jobs with [pg-boss](https://github.com/timgit/pg-boss)

## FEATURES

1. swagger UI for frontend developers
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

Full usage example in ./examples folder

## ISSUES

PR and issues are welcome

## DEPENDENCIES

1. [fastify](https://www.fastify.io/)
2. [fastify-plugin](https://github.com/fastify/fastify-plugin)
3. [fastify-swagger](https://github.com/fastify/fastify-swagger)
4. [mongo-sql](https://github.com/goodybag/mongo-sql)
5. [sanitize-html](https://github.com/apostrophecms/sanitize-html)
6. [autoloader]()
7. [dotenv]()