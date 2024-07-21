import { switchTheme } from "../utils/slices/themeSlice";
import { CircleUser, LogOut, MoonIcon, SunIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../utils/slices/userApiSlice";
import { logout } from "../utils/slices/authSlice";
import { resetCart } from "../utils/slices/cartSlice";

function Header() {
  const theme = useSelector((state) => state.themeReducer.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((acc, item) => {
    console.log(item);
    const quantity = Number(item.qty) || 0;
    return acc + quantity;
  }, 0);
  console.log(cartCount);

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/signin");
      console.log("Logged out");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="px-10">
      <div className="navbar glass fixed top-0 left-0 w-full z-10 h-[10vh]">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto mr-2" />
            Innovate
          </Link>
        </div>
        <div className="flex-none gap-5">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-100 "
            />
          </div>
          <div className="flex gap-2">
            <SunIcon />
            <input
              type="checkbox"
              className="toggle"
              checked={theme === "dim"}
              onClick={() => dispatch(switchTheme())}
            />
            <MoonIcon />
          </div>
          <Link
            to="/cart"
            className="tooltip tooltip-bottom"
            data-tip="My Cart"
          >
            <div role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cartCount}
                </span>
              </div>
            </div>
          </Link>
          {userInfo ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost">
                <CircleUser className="h-8 w-auto" />
              </div>
              <ul
                tabIndex={0}
                className="menu mt-3 dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="btn btn-sm btn-ghost">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={logoutHandler}
                  >
                    <LogOut />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/signin" className="btn btn-ghost btn-outline">
                Log In
              </Link>
              <Link to="/signup" className="btn btn-outline">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
