import { SwaggerInitOptions } from 'feathers-swagger';

const swaggerConfig: SwaggerInitOptions = {
  openApiVersion: 3,
  idType: 'string',
  docsPath: '/swagger/docs',
  docsJsonPath: '/swagger/jsondocs',
  uiIndex: true,
  specs: {
    info: {
      title: 'API',
      description: 'API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3030',
        description: 'Developement server (uses dev data)',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    // Enable security per service
    security: [
      {
        BearerAuth: [],
      },
    ],
  }
};

export default swaggerConfig;
