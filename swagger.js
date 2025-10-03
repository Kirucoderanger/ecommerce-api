const swaggerAutogen = require('swagger-autogen')();

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

