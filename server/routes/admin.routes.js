import express from 'express';
import Product from '../models/product.model.js'; // Adjust the path as needed
import Order from '../models/order.model.js'; // Adjust the path as needed
import Review from '../models/review.model.js'; // Adjust the path as needed
import User from '../models/user.model.js'; // Adjust the path as needed
import { authenticateToken, checkAdmin } from './auth.middleware.js'; // Adjust the path as needed

const router = express.Router();

// Get all products
router.get('/products', authenticateToken, checkAdmin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders
router.get('/orders', authenticateToken, checkAdmin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user').populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all reviews
router.get('/reviews', authenticateToken, checkAdmin, async (req, res) => {
  try {
    const reviews = await Review.find({}).populate('user').populate('product');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/users', authenticateToken, checkAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
