const productSchema = {
  type: 'object',
  required: ['name', 'description', 'price'],
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    price: {
      type: 'object',
      required: ['amount', 'currency'],
      properties: {
        amount: { type: 'number' },
        currency: { type: 'string', enum: ['USD'] },
      },
    },
  },
};

const singleResponseSchema = {
  200: {
    ...productSchema,
    properties: {
      id: { type: 'string' },
      ...productSchema.properties,
    },
  },
};

const multipleResponseSchema = {
  200: {
    type: 'array',
    items: {
      ...productSchema,
      properties: {
        id: { type: 'string' },
        ...productSchema.properties,
      },
    },
  },
};

module.exports = {
  productSchema,
  singleResponseSchema,
  multipleResponseSchema,
};
