import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { useGetProductsQuery } from "../utils/slices/productsApiSlice";
import { useGetUsersQuery } from "../utils/slices/userApiSlice";
import { useFetchOrdersQuery } from "../utils/slices/ordersApiSlice";
import { useFetchReviewsByProductQuery } from "../utils/slices/reviewsApiSlice";

const AdminPanel = () => {
  const { data: products = [], isLoading: productsLoading } =
    useGetProductsQuery();
  const { data: orders = [], isLoading: ordersLoading } = useFetchOrdersQuery();
  const { data: reviews = [], isLoading: reviewsLoading } =
    useFetchReviewsByProductQuery();
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();

  const loading =
    productsLoading || ordersLoading || reviewsLoading || usersLoading;

  const productData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: "Stock",
        data: products.map((product) => product.stock),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const orderData = {
    labels: orders.map((order) => order._id),
    datasets: [
      {
        label: "Order Total",
        data: orders.map((order) => order.totalPrice),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const reviewData = {
    labels: reviews.map((review) => review.product.name),
    datasets: [
      {
        label: "Ratings",
        data: reviews.map((review) => review.rating),
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const userData = {
    labels: users.map((user) => user.name),
    datasets: [
      {
        label: "Users",
        data: users.map((user) => 1), // Each user counts as 1
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>
      <div className="products-section">
        <h2>Products</h2>
        <Bar data={productData} />
      </div>
      <div className="orders-section">
        <h2>Orders</h2>
        <Pie data={orderData} />
      </div>
      <div className="reviews-section">
        <h2>Reviews</h2>
        <Bar data={reviewData} />
      </div>
      <div className="users-section">
        <h2>Users</h2>
        <Pie data={userData} />
      </div>
      <div className="product-list">
        <h2>All Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.name} - Stock: {product.stock}
            </li>
          ))}
        </ul>
      </div>
      <div className="order-list">
        <h2>All Orders</h2>
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Order ID: {order._id} - Total Price: {order.totalPrice}
            </li>
          ))}
        </ul>
      </div>
      <div className="review-list">
        <h2>All Reviews</h2>
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              {review.user.name}: {review.comment} - Rating: {review.rating}
            </li>
          ))}
        </ul>
      </div>
      <div className="user-list">
        <h2>All Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - Email: {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
