import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8000;
console.log("Swagger port:", port);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TraveStore Swagger API Documentation',
      version: '1.0.0',
      description: 'Swagger documentation for travel_store',
    },
    servers: [
      {
        url: 'http://localhost:' + port,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default {
  specs,
  swaggerUi,
};