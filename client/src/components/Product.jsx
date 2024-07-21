import { useNavigate } from "react-router-dom";
import { addToCart } from "../utils/slices/cartSlice";
import { useDispatch } from "react-redux";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="item hover:cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img src={product.imageUrl} alt={product.name} />
      <div className="title">{product.name}</div>
      <div className="price">{product.price.toLocaleString()}</div>
      <button
        onClick={() => {
          dispatch(addToCart({ ...product, qty: 1 }));
          navigate("/cart");
        }}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default Product;
