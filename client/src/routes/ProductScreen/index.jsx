import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
import Rating from "../../components/Rating.jsx";
import Loader from "../../components/Loader.jsx";
// import Message from "../components/Message";
// import Meta from "../components/Meta";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../utils/slices/productsApiSlice";
import { addToCart } from "../../utils/slices/cartSlice";
// import { Loader } from "lucide-react";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      // toast.success("Review submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      // toast.error(err?.data?.message || err.error);
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <>
          {/* <Meta title={product.name} /> */}
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full object-cover"
              />
            </div>
            <div className="md:w-3/5 md:pl-4">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
                <p className="text-lg">Price: ${product.price}</p>
                <p>Description: {product.description}</p>
              </div>
            </div>
            <div className="md:w-1/4 card mt-4 md:mt-0">
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-bold">${product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-bold">
                    {product.stock > 0 ? "In Stock" : "Out Of Stock"}
                  </span>
                </div>
                {product.stock > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Qty</span>
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="border rounded-md p-1"
                    >
                      {[...Array(product.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  className={`w-full py-2 mt-4 text-white btn btn-primary`}
                  type="button"
                  disabled={product.stock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 md:w-3/5">
            <h2 className="text-2xl font-bold">Reviews</h2>
            {product.reviews.length === 0 ? (
              <p>No Reviews</p>
            ) : (
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review._id} className="border rounded-md p-4">
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Write a Customer Review</h2>
              {loadingProductReview && <Loader />}
              {userInfo ? (
                <form onSubmit={submitHandler} className="space-y-4">
                  <div>
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Rating
                    </label>
                    <select
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="mt-1 block w-full border rounded-md p-2"
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      rows="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mt-1 block w-full border rounded-md p-2"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white font-bold rounded-md"
                    disabled={loadingProductReview}
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <p>
                  Please{" "}
                  <Link to="/login" className="text-blue-500">
                    sign in
                  </Link>{" "}
                  to write a review
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
