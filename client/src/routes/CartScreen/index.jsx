import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { FaTrash } from "react-icons/fa";
// import Message from "../components/Message";
import { addToCart, removeFromCart } from "../../utils/slices/cartSlice";
import { Trash, Trash2 } from "lucide-react";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="flex flex-col md:flex-row p-4">
      <div className="md:w-2/3">
        <h1 className="text-2xl mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>
            Your cart is empty{" "}
            <Link to="/" className="text-blue-500">
              Go Back
            </Link>
          </p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex items-center border-b py-4">
                <div className="w-1/6">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full object-cover rounded"
                  />
                </div>
                <div className="w-1/3 px-4">
                  <Link to={`/product/${item._id}`} className="text-blue-500">
                    {item.name}
                  </Link>
                </div>
                <div className="w-1/6">${item.price}</div>
                <div className="w-1/6">
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                    className="border rounded-md p-1"
                  >
                    {[...Array(item.stock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/6">
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="md:w-1/3 mt-4 md:mt-0 md:pl-4">
        <div className="border rounded-md p-4">
          <h2 className="text-xl mb-4">
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            items
          </h2>
          <div className="text-lg font-bold mb-4">
            $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </div>
          <button
            type="button"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
