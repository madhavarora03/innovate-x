import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateReviewMutation } from '../../utils/slices/reviewApiSlice';
import { authenticateToken } from '../../utils/slices/authSlice';

export default function ReviewCard({ productId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createReview, { isLoading, error }] = useCreateReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate('/login');
      return;
    }
    try {
      await createReview({ productId, rating, comment }).unwrap();
      setRating(0);
      setComment('');
      // Optionally, you can trigger a re-fetch of product reviews
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="review-card bg-gray-100 rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-bold">Add Your Review</h2>
      <form className="space-y-4" onSubmit={submitHandler}>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg"
          >
            <option value={0}>Select rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg"
        >
          Submit Review
        </button>
        {error && <p className="text-red-500 text-xs mt-2">Failed to submit review. Please try again.</p>}
      </form>
    </div>
  );
}
