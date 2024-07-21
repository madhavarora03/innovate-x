import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/store.js";
import App from "./App.jsx";
import HomeScreen from "./routes/HomeScreen";
import CartScreen from "./routes/CartScreen";
import LeaderboardScreen from "./routes/LeaderboardScreen";
import SignUpScreen from "./routes/SignUp/index.jsx";
import SignInScreen from "./routes/SignIn/index.jsx";
import ProductScreen from "./routes/ProductScreen";
// import Contact from "./Contact.jsx";
import "./index.css";
<<<<<<< HEAD
<<<<<<< HEAD
import AdminPanel from "./components/AdminPanel.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomeScreen />}
      />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/board" element={<LeaderboardScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/signin" element={<SignInScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Route>
  )
);
=======
import Page from "./pages/Page.jsx";
>>>>>>> ec0a080 (added landing page)
=======
import Page from "./pages/Page.jsx";
=======
import AdminPanel from "./components/AdminPanel.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomeScreen />}
      />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/board" element={<LeaderboardScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/signin" element={<SignInScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Route>
  )
);
>>>>>>> 008ef79 (Final)
>>>>>>> 6cefe73 (Final)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
<<<<<<< HEAD
<<<<<<< HEAD
      <RouterProvider router={router} />
=======
=======
>>>>>>> 6cefe73 (Final)
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" index element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/board" element={<Board />} />
<<<<<<< HEAD
            <Route path="/lp" element={<Page />} />
=======
<<<<<<< Updated upstream
=======
            <Route path="/landing" element={<Page />} />
>>>>>>> Stashed changes
>>>>>>> 3e5786b (Update main.jsx)
          </Route>
        </Routes>
      </BrowserRouter>
<<<<<<< HEAD
>>>>>>> ec0a080 (added landing page)
=======
=======
      <RouterProvider router={router} />
>>>>>>> 008ef79 (Final)
>>>>>>> 6cefe73 (Final)
    </Provider>
  </React.StrictMode>
);
