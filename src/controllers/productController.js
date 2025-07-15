import Product from '../models/Product.js';
import { ErrorHandler } from '../utils/errorHandler.js';
import mongoose from 'mongoose';

export async function getAllProducts(req, res, next) {
  try {
    const { category } = req.query;
    
    // filter by category
    const filter = category ? { category: new RegExp(category, 'i') } : {};
    
    const products = await Product.find(filter);
    res.status(200).json({ 
      success: true, 
      count: products.length,
      products 
    });
  } catch (err) {
    next(err);
  }
}

export async function getProductById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw new ErrorHandler('Invalid product ID', 400);
    }
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new ErrorHandler('Product not found', 404);
    }
    
    res.status(200).json({ success: true, product });
  } catch (err) {
    next(err);
  }
}

export async function createProduct(req, res, next) {
  try {
    console.log("Request body:", req.body);
    const { name, category, price, imageUrl } = req.body;

    console.log("Creating product with data:", { name, category, price, imageUrl });
    
    // Validation
    if (!name || !category || !price || !imageUrl) {
      throw new ErrorHandler('Name, category, price, and image URL are required', 400);
    }
    
    if (price < 0) {
      throw new ErrorHandler('Price cannot be negative', 400);
    }
    
    const product = new Product({ name, category, price, imageUrl });
    await product.save();
    
    res.status(201).json({ success: true, product });
  } catch (err) {
    next(err);
  }
}