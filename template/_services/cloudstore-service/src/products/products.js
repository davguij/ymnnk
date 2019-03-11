const { findAll, findOneById, saveOne } = require('../services/cloudstore');
const schemas = require('./schemas');

const entityType = 'Products';

async function routes(fastify, options) {
  fastify.get(
    '/products',
    { schema: { response: schemas.multipleResponseSchema } },
    async (request, reply) => {
      try {
        return findAll(entityType);
      } catch (e) {
        return e;
      }
    }
  );

  fastify.get(
    '/products/:id',
    {
      schema: {
        params: { id: { type: 'number' } },
        response: schemas.singleResponseSchema,
      },
    },
    async (request, reply) => {
      const productId = request.params.id;
      try {
        const found = await findOneById(entityType, productId);
        if (!found) {
          reply.code(204);
          return;
        }
        return found;
      } catch (e) {
        return e;
      }
    }
  );

  fastify.post(
    '/products',
    { schema: { body: schemas.productSchema } },
    async (request, reply) => {
      const newProduct = request.body;
      try {
        const saved = await saveOne(entityType, newProduct);
        reply.code(201);
        return { id: saved.id, ...newProduct };
      } catch (e) {
        return e;
      }
    }
  );
}

module.exports = routes;
