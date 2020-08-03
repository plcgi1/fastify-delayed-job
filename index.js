const fp = require('fastify-plugin')
const PgBoss = require('pg-boss')
const subscribersLoader = require('./src/helpers/subscriber-loader')

let boss

const init = async (fastify, config, done) => {
  /*
  config: {
      db: {},
      subscribersPath:
  }
  */

  fastify.register(require('./src/api/version'), { prefix: '/delayed-jobs/version' })
  fastify.register(require('./src/api/tasks'), { prefix: '/delayed-jobs/tasks' })

  const subscribers = subscribersLoader(config.subscribersPath)

  if(!boss) {
    const { host, database, user, password, port } = config.db

    if (!host || !database || !port) {
      throw new Error('Set db options in environment')
    }

    const options = {
      port,
      host,
      database,
      user,
      password,
      poolSize: 5, // or max: 5
      archiveCompletedJobsEvery: '2 days'
    };

    boss = new PgBoss(options);

    await boss.start()

    Object.keys(subscribers).forEach(eventName => {
      // TODO add options for pgboss.subscribe
      boss.subscribe(eventName, {}, (job) => {
        subscribers[eventName].handler(job)
        job.done()
      })
    })

    fastify.pgboss = boss

    console.info('Pgboss started')
  }

  fastify.decorate('fpDelayedJobConfig', config)
  fastify.decorate('subscribers', subscribers)
  fastify.decorateRequest('subscribers', subscribers)
  fastify.decorateRequest('pgboss', boss)

  done()
}

module.exports = fp(init)
