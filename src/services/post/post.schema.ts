const baseSchema = {
  $schema: 'http://json-schema.org/draft/2019-09/schema#',
  description: 'Post',
  type: 'object',
};

const requestSchema = {
  ...baseSchema,
  title: 'Post Request',
  required: ['title', 'body'],
  properties: {
    title: {
      description: 'Post title',
      example: 'New Title!',
      type: 'string',
    },
    body: {
      description: 'Post body',
      example: 'New Body!',
      type: 'string',
    },
    comments: {
      description: 'Post comments',
      type: 'array',
      items: {
        type: 'string',
      },
    }
  }
};

const responseSchema = {
  ...baseSchema,
  title: 'Post Response',
  required: ['title', 'body', 'createdAt', 'updatedAt'],
  properties: {
    title: {
      description: 'Post title',
      example: 'New Title!',
      type: 'string',
    },
    body: {
      description: 'Post body',
      example: 'New Body!',
      type: 'string',
    },
    createdAt: {
      'title': 'ISODateFormat',
      'description': '[System Generated] ISO format date-time',
      'example': '2020-01-01T01:01:01.001Z',
      'format': 'date-time',
      'type': 'string'
    },
    updatedAt: {
      'title': 'ISODateFormat',
      'description': '[System Generated] ISO format date-time',
      'example': '2020-01-01T01:01:01.001Z',
      'format': 'date-time',
      'type': 'string'
    },
  },
};

export { requestSchema, responseSchema };
