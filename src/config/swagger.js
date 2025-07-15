import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TraveStore Swagger API Documentation',
      version: '1.0.0',
      description: 'Swagger documentation for travel_store',
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default {
  specs,
  swaggerUi,
};