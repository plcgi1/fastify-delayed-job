module.exports = (fastify) => {
  const { subscribers } = fastify
  const subscriberNames = Object.keys(subscribers)

  return {
    list: {
      query: {
        name: { type: 'string' },
        state: { type: 'string' }
      }
    },
    create: {
      body: {
        type: 'object',
        required: ['name', 'template'],
        properties: {
          name: {
            type: 'string',
            enum: subscriberNames
          },
          template: { type: 'string' },
          // TODO add check format for psql interval strings
          startAfter: { type: 'string', default: '0' },
          vars: {
            type: 'object',
            properties: {
              // Generic object
            }
          }
        }
      }
    }
  }
}
