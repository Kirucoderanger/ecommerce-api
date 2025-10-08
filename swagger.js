/*const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-commerce API',
    description: 'API documentation for the e-commerce application',
  },
  host: 'ecommerce-api-05ik.onrender.com',
  schemes: ['https'],
};

//swaggerAutogen('./swagger-output.json', ['./routes/*.js'], doc);
const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

*/

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-commerce API',
    description: 'A simple CRUD API for managing e-commerce operations',
  },
  //host for deployed version
  //host: 'ecommerce-api-05ik.onrender.com',
  //schemes: ['https'],

  //host for local version
  //basePath: '/api/v1',
  host: 'localhost:3000',
  schemes: ['http'],

  // Add security definition
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter your bearer token in the format **Bearer <token>**',
    },
  },

  //  Apply security globally (all endpoints require token by default)
  security: [{ bearerAuth: [] }],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

