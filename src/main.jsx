import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Styles
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Route
import { BrowserRouter as Router } from "react-router-dom";

// Toast
import { ToastContainer } from "react-toastify";

// Axios
import axios from "axios";
import { localTokenKey } from "./constants/index";

axios.defaults.baseURL = "http://localhost:5500/api/v1";
axios.defaults.headers.common["Content-Type"] = "application/json";

let token = localStorage.getItem(localTokenKey);
if (token) axios.defaults.headers.common["x-auth-token"] = `Bearer ${token}`;

// store
import { Provider } from "react-redux";
import store from "./Store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer theme="colored" />
  </Router>
);
