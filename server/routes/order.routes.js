import express from 'express';
import Order from '../models/order.model.js';
import { authenticateToken, checkAdmin } from './auth.middleware.js'; // Reuse middlewares

const router = express.Router();

router.post('/place-order', authenticateToken, async (req, res) => {
  const { products, totalAmount } = req.body;

  try {
    // Validate input
    if (!Array.isArray(products) || products.length === 0 || !totalAmount) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    // Create a new order
    const order = new Order({
      user: req.user.id,
      products,
      totalAmount,
      status: 'Pending' // Default status
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/orders', authenticateToken, checkAdmin, async (req, res) => {
  try {
    // Retrieve all orders and populate user information
    const orders = await Order.find().populate('user', 'name email').populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/orders/my-orders', authenticateToken, async (req, res) => {
  try {
    // Retrieve orders for the logged-in user
    const orders = await Order.find({ user: req.user.id }).populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/orders/:id', authenticateToken, checkAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate('user', 'name email').populate('products.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/orders/:id', authenticateToken, checkAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Assuming you want to update the status of an order

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status || order.status; // Update status if provided
    await order.save();

    res.json({ message: 'Order updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete('/orders/:id', authenticateToken, checkAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Order.findByIdAndDelete(id);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/orders/cancel/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Find the order by ID and ensure it's the user's order
    const order = await Order.findOne({ _id: id, user: req.user.id });

    if (!order) {
      return res.status(404).json({ message: 'Order not found or you do not have permission to cancel this order' });
    }

    // Update order status to 'Cancelled'
    order.status = 'Cancelled';
    await order.save();

    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




export default router;
