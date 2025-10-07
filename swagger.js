const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-commerce API',
    description: 'API documentation for the e-commerce application',
  },
  host: 'ecommerce-api-05ik.onrender.com',
  schemes: ['https'],
  basePath: '/', //The part below is for OAuth2 configuration
  securityDefinitions: {
    cookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'connect.sid',
      description: 'Session cookie for authentication (Passport sessions)',
    },
    oauth2: {
      type: 'oauth2',
      flow: 'accessCode',
      authorizationUrl: `${process.env.BASE_URL}/auth/google`,
      tokenUrl: `${process.env.BASE_URL}/auth/google/callback`,
      scopes: {},
    },
  },
};

//swaggerAutogen('./swagger-output.json', ['./routes/*.js'], doc);
const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

