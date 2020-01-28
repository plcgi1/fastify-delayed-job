const package = require('../../../package.json')

async function routes (fastify, options) {
  fastify.get(
    '/',
    {
      schema: {
        summary: 'API version',
      }
    },
    async () => {
      return { version: package.version }
    }
  )
}

module.exports = routes