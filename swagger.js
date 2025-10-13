/*const swaggerAutogen = require('swagger-autogen')();

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

*/
/*
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

*/
/*
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-commerce API',
    description: 'A RESTful API for managing e-commerce operations (Products, Orders, Inventory, Payments)',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter JWT token as: **Bearer &lt;token&gt;**',
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
*/

/*
// swagger.js
const swaggerAutogen = require('swagger-autogen')();
process.env.NODE_ENV = 'swagger'; // Skip JWT middleware while generating docs

const doc = {
  info: {
    title: 'E-Commerce API',
    description:
      'A RESTful API for managing products, orders, inventory, and authentication with JWT and payment gateway integrations.',
  },

  // Local setup
  host: 'localhost:3000',
  schemes: ['http'],

  // If deployed, uncomment and adjust:
  // host: 'ecommerce-api-05ik.onrender.com',
  // schemes: ['https'],

  // Security definitions
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Provide JWT token as: **Bearer <token>**',
    },
  },

  // Global security application
  security: [{ bearerAuth: [] }],
};

// Output file
const outputFile = './swagger-output.json';

// Root entry file (includes all routes)
const endpointsFiles = ['./server.js'];

// Generate Swagger JSON
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('✅ Swagger documentation generated successfully.');
  process.exit();
});
*/

/*
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-commerce API',
    description: 'A simple CRUD API for managing e-commerce operations',
  },
  host: 'localhost:3000', // change to deployed host when live
  schemes: ['http'],

  // security definition for JWT
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter token in the format **Bearer <JWT>**',
    },
  },

  // apply security globally
  security: [{ bearerAuth: [] }],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);*/
/*


const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-commerce API',
    description: 'A simple CRUD API for managing products, orders, and inventory',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  // Global JWT security
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter token as **Bearer <JWT>**',
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger file generated successfully!');
});
// Run this file with `node swagger.js` to generate swagger-output.json

/*
// middleware/auth.js
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Invalid token format' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Token is not valid' });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};*/
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-commerce API',
    description: 'A simple CRUD API for managing products, orders, and inventory',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  // Global JWT security
  
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter token as **Bearer <JWT>**',
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger file generated successfully!');
});
// Run this file with `node swagger.js` to generate swagger-output.json


