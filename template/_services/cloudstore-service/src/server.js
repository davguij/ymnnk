// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: process.env.NODE_ENV !== 'production',
});

fastify.register(require('fastify-blipp'));

// Declare a route
fastify.get('/status', async (request, reply) => {
  return { success: true };
});

// Declare a group of routes as a plugin
fastify.register(require('./products/products'));

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, '::');
    fastify.blipp();
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
