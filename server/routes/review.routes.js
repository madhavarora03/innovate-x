import express from 'express';
import Review from '../models/review.model.js'; // Adjust the path as needed
import { authenticateToken, checkAdmin } from './auth.middleware.js'; // Adjust the path as needed

const router = express.Router();

// Create a new review
router.post('/', authenticateToken, async (req, res) => {
  const { productId, rating, comment } = req.body;

  if (!productId || !rating) {
    return res.status(400).json({ message: 'Product ID and rating are required' });
  }

  try {
    const review = new Review({
      user: req.user.id,
      product: productId,
      rating,
      comment
    });

    await review.save();
    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all reviews for a product
router.get('/product/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ product: productId }).populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a review
router.put('/:id', authenticateToken, async (req, res) => {
  const { rating, comment } = req.body;
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied. You cannot edit this review.' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();
    res.json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a review
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied. You cannot delete this review.' });
    }

    await review.remove();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin route to delete any review
router.delete('/admin/:id', authenticateToken, checkAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.remove();
    res.json({ message: 'Review deleted successfully by admin' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
