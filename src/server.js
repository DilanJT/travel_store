import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import { errorHandler } from './utils/errorHandler.js';
import swaggerConfig from './config/swagger.js';
const { swaggerUi, specs } = swaggerConfig;

dotenv.config();

const app = express();

app.use(express.json());
// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'TraveStore Swagger API Documentation',
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to TraveStore API',
    documentation: 'http://localhost:8000/api-docs',
    endpoints: {
      'GET /api/products': 'Get all products',
      'GET /api/products/:id': 'Get product by ID',
      'GET /api/products?category=Apparel': 'Filter products by category',
      'POST /api/products': 'Create new product',
    },
  });
});


app.use('/api/products', productRoutes);
app.use(errorHandler);

console.log("mongoDB URI:", process.env.MONGODB_URI);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation available at: http://localhost:${PORT}/api-docs`);
});