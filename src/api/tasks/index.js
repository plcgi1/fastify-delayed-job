const builder = require('mongo-sql')
const schemaBuilder = require('../../schemas/task.schema')
const commonSchema = require('../../schemas/common.schema')
const sanitizeContent = require('../../middleware/sanitize-content')

async function routes (fastify, options) {
  const schema = schemaBuilder(fastify)

  const defaultPreHandler = () => {}

  const authHandler = fastify.fpDelayedJobConfig.authHandler
    ? fastify.fpDelayedJobConfig.authHandler
    : defaultPreHandler;

  fastify
    .get(
      '/list',
      {
        preHandler: [authHandler],
        schema: {
          query: schema.list.query,
          summary: 'Tasks list',
          tags: ['tasks']
        }
      },
      async (req, reply) => {
        const { pgboss, query } = req
        try {
          // TODO add search params
          const { db } = pgboss
          const fields = ['name', 'state']

          const where = {
            $not: { name: { $like: '\\_%' } }
          }

          fields.forEach(name => {
            if (query[name]) {
              where[name] = query[name]
            }
          })

          // TODO paging

          const queryOpts = {
            type: 'select',
            // TODO get schema name from pgboss
            table: 'pgboss.job',
            where
          }
          const stmt = builder.sql(queryOpts);

          queryOpts.columns = [{
            expression: { expression: 'count(*)' }
          }]

          const countStmt = builder.sql(queryOpts);

          const result = await db.pool.query(stmt.query, stmt.values)
          const countResult = await db.pool.query(countStmt.query, countStmt.values)

          return { data: result.rows, count: countResult.rows[0].count }
        } catch (error) {
          reply.code(500).send(error)
        }
      }
    )
    .post(
      '/',
      {
        preValidation: [sanitizeContent],
        preHandler: [authHandler],
        schema: {
          body: schema.create.body,
          summary: 'Add new task for scheduled workers',
          tags: ['tasks'],
          security: [
            {
              "apiKey": []
            }
          ]
        }
      },
      async (req, reply) => {
        const { body, pgboss } = req
        const job = {}

        job.vars = { ...body.vars, template: body.template }
        job.options = { ...body.options, startAfter: body.startAfter ? body.startAfter : '0' }

        try {
          const id = await pgboss.publish(body.name, job.vars, job.options)

          return {id}
        } catch (error) {
          reply.code(500).send(error)
        }
      }
    )
    .delete(
      '/:id',
      {
        preHandler: [authHandler],
        schema: {
          params: commonSchema.params,
          summary: 'Remove task',
          tags: ['tasks'],
          security: [
            {
              "apiKey": []
            }
          ]
        }
      },
      async (req, reply) => {
        const { pgboss, params } = req
        try {
          const result = await pgboss.cancel(params.id)

          return result
        } catch (error) {
          reply.code(500).send(error)
        }
      }
    )
}

module.exports = routes
