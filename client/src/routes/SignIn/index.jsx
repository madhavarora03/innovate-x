import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../utils/slices/userApiSlice";
import { setUser } from "../../utils/slices/authSlice";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setUser({ ...res }));
      navigate(redirect);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center dark: bg-gray-px-6 py-8 mx-auto h-[90vh] lg:py-0">
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/gradient-connection-background_52683-119859.jpg?w=1060&t=st=1721498776~exp=1721499376~hmac=bc4b88e5acf53926b683766295e899546b173090642f1a214d67353dcc265566')",
        }}
      ></div>
      <div className="relative z-10 w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 bg-opacity-90 backdrop-filter backdrop-blur-lg">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            <span className=" font-extrabold">Sign in</span> to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className=" btn btn-accent btn-outline w-full"
            >
              Sign in
            </button>
            {error && (
              <p className="text-red-500 text-xs text-center">
                Invalid credentials
              </p>
            )}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              New user?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="underline"
              >
                Register Now!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
