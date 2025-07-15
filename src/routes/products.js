// src/routes/products.js - Complete Swagger Documentation
import express from 'express';
import { getAllProducts, getProductById, createProduct } from '../controllers/productController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *         - imageUrl
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated MongoDB ObjectId
 *           example: "676063ba23e59f11d4567890"
 *         name:
 *           type: string
 *           description: The product name
 *           example: "Carabiner"
 *         category:
 *           type: string
 *           description: The product category
 *           example: "Camping Gear"
 *         price:
 *           type: number
 *           minimum: 0
 *           description: The product price in USD
 *           example: 25.00
 *         imageUrl:
 *           type: string
 *           format: uri
 *           description: URL to the product image
 *           example: "https://example.com/images/carabiner.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Product creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Product last update timestamp
 *     ProductInput:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *         - imageUrl
 *       properties:
 *         name:
 *           type: string
 *           description: The product name
 *           example: "Hiking Boots"
 *         category:
 *           type: string
 *           description: The product category
 *           example: "Apparel"
 *         price:
 *           type: number
 *           minimum: 0
 *           description: The product price in USD
 *           example: 150.00
 *         imageUrl:
 *           type: string
 *           format: uri
 *           description: URL to the product image
 *           example: "https://example.com/images/hiking-boots.jpg"
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         count:
 *           type: number
 *           description: Number of products returned
 *           example: 4
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         product:
 *           $ref: '#/components/schemas/Product'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           description: Error message
 *           example: "Product not found"
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API endpoints
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all products or filter by category
 *     description: Retrieve a list of all products. Can be filtered by category using query parameter.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter products by category (case-insensitive)
 *         example: "Apparel"
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 4
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *             examples:
 *               all_products:
 *                 summary: All products example
 *                 value:
 *                   success: true
 *                   count: 4
 *                   products:
 *                     - _id: "676063ba23e59f11d4567890"
 *                       name: "Carabiner"
 *                       category: "Camping Gear"
 *                       price: 25.00
 *                       imageUrl: "https://example.com/images/carabiner.jpg"
 *                       createdAt: "2024-01-01T00:00:00.000Z"
 *                       updatedAt: "2024-01-01T00:00:00.000Z"
 *               filtered_products:
 *                 summary: Filtered by category example
 *                 value:
 *                   success: true
 *                   count: 1
 *                   products:
 *                     - _id: "676063ba23e59f11d4567891"
 *                       name: "Hiking Boots"
 *                       category: "Apparel"
 *                       price: 150.00
 *                       imageUrl: "https://example.com/images/hiking-boots.jpg"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Server Error"
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a single product using its unique MongoDB ObjectId
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product MongoDB ObjectId
 *         example: "676063ba23e59f11d4567890"
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *             example:
 *               success: true
 *               product:
 *                 _id: "676063ba23e59f11d4567890"
 *                 name: "Carabiner"
 *                 category: "Camping Gear"
 *                 price: 25.00
 *                 imageUrl: "https://example.com/images/carabiner.jpg"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 updatedAt: "2024-01-01T00:00:00.000Z"
 *       400:
 *         description: Invalid product ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Invalid product ID"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Product not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the e-commerce catalog with validation
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *           examples:
 *             hiking_boots:
 *               summary: Hiking Boots Example
 *               value:
 *                 name: "Hiking Boots"
 *                 category: "Apparel"
 *                 price: 150.00
 *                 imageUrl: "https://example.com/images/hiking-boots.jpg"
 *             camping_tent:
 *               summary: Camping Tent Example
 *               value:
 *                 name: "2-Person Camping Tent"
 *                 category: "Camping Gear"
 *                 price: 89.99
 *                 imageUrl: "https://example.com/images/camping-tent.jpg"
 *             backpack:
 *               summary: Adventure Backpack Example
 *               value:
 *                 name: "Adventure Backpack"
 *                 category: "Camping Gear"
 *                 price: 75.50
 *                 imageUrl: "https://example.com/images/adventure-backpack.jpg"
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *             example:
 *               success: true
 *               product:
 *                 _id: "676063ba23e59f11d4567892"
 *                 name: "Hiking Boots"
 *                 category: "Apparel"
 *                 price: 150.00
 *                 imageUrl: "https://example.com/images/hiking-boots.jpg"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 updatedAt: "2024-01-01T00:00:00.000Z"
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missing_fields:
 *                 summary: Missing required fields
 *                 value:
 *                   success: false
 *                   error: "Name, category, price, and image URL are required"
 *               negative_price:
 *                 summary: Negative price error
 *                 value:
 *                   success: false
 *                   error: "Price cannot be negative"
 *               invalid_data:
 *                 summary: Invalid data format
 *                 value:
 *                   success: false
 *                   error: "Invalid input data format"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Server Error"
 */
router.post('/', createProduct);

export default router;