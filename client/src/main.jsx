import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/store.js";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
// import Board from "./pages/Board.jsx";
// import Contact from "./Contact.jsx";
import "./index.css";
import LeaderBoard from "./pages/LeaderBoard/Leaderboard.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" index element={<HomePage />} />
            <Route path="/board" element={<LeaderBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
