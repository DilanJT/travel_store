import mongoose from 'mongoose';
import Product from './src/models/Product.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedProducts = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/travel_store');
    
    await Product.deleteMany();
    
    const productsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf-8')
    );
    
    await Product.insertMany(productsData);
    
    console.log('Sample products inserted successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedProducts();