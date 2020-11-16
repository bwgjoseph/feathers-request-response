const baseSchema = {
  $schema: 'http://json-schema.org/draft/2019-09/schema#',
  description: 'Comment',
  type: 'object',
};

const requestSchema = {
  ...baseSchema,
  title: 'Comment Request',
  required: ['text'],
  properties: {
    text: {
      description: 'Comment text',
      example: 'HelloWorld!',
      type: 'string',
    },
  }
};

const responseSchema = {
  ...baseSchema,
  title: 'Comment Response',
  required: ['text', 'createdAt', 'updatedAt'],
  properties: {
    text: {
      description: 'Comment text',
      example: 'HelloWorld!',
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
