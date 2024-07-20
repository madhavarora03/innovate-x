import express from 'express';
import Product from '../models/product.model.js';
import { authenticateToken, checkAdmin } from './auth.middleware.js'; // Reuse middlewares

const router = express.Router();

// Route to add a new product (admin only)
router.post('/add-product', authenticateToken, checkAdmin, async (req, res) => {
  const { name, price, description, category, stock, imageUrl } = req.body;

  try {
    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      imageUrl
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('reviews');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get a specific product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to edit a product (admin only)
router.put('/edit-product/:id', authenticateToken, checkAdmin, async (req, res) => {
  const { name, price, description, category, stock, imageUrl } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    product.imageUrl = imageUrl || product.imageUrl;

    await product.save();
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update specific details of a product (admin only)
router.patch('/update-product/:id', authenticateToken, checkAdmin, async (req, res) => {
  const updates = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Object.keys(updates).forEach(key => {
      product[key] = updates[key] || product[key];
    });

    await product.save();
    res.json({ message: 'Product details updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a product (admin only)
router.delete('/delete-product/:id', authenticateToken, checkAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
