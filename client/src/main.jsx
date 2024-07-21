import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/store.js";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import CartPage from "./pages/CartPage2.jsx";
import Board from "./pages/Board.jsx";
// import Contact from "./Contact.jsx";
import "./index.css";
import Page from "./pages/Page.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" index element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/board" element={<Board />} />
            <Route path="/landing" element={<Page />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
