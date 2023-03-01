import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { localTokenKey } from "../constants/index";
import { removeMarketData } from "../Store/slices/market";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem(localTokenKey);
    delete axios.defaults.headers.common["x-auth-token"];
    dispatch(removeMarketData());
    toast("Logged out", { type: "info" });
    navigate("/login");
  }

  return (
    <header className="text-bg-primary">
      <div className="container d-flex align-items-center justify-content-between">
        <Link className="h1 text-decoration-none text-reset" to="/">
          Shopify
        </Link>

        <div className="d-flex gap-3 align-items-center">
          <Link className="text-decoration-none text-reset" to="/dashboard">
            Dashboard
          </Link>
          <Link className="text-decoration-none text-reset" to="/dashboard">
            Dashboard
          </Link>
          <Link className="text-decoration-none text-reset" to="/dashboard">
            Dashboard
          </Link>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
