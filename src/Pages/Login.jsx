import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { localTokenKey } from "../constants/index";
import { loadMarketData } from "../Store/slices/market";

const Login = () => {
  const [values, setValues] = useState({
    phone: "",
    password: "",
  });

  function handleInputChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();

    if (!values.phone || !values.password)
      return toast("Please, fill all the fields!", { type: "error" });

    // Validations

    try {
      let { data } = await axios.post("/auth/market", values);

      let { token, message, market } = data;

      localStorage.setItem(localTokenKey, token);
      axios.defaults.headers.common["x-auth-token"] = `Bearer ${token}`;
      toast(message, { type: "success" });
      dispatch(loadMarketData(market));
      navigate(market.isCompleted ? "/" : "/complete-info");
    } catch (error) {
      if (error.response) {
        if (error.response.data.message)
          toast(error.response.data.message, { type: "error" });
        error.response.data.errors?.forEach((err) =>
          toast(`${err.param} ${err.msg}`, { type: "error" })
        );
      }
    }
  }

  let token = localStorage.getItem(localTokenKey);

  return token ? (
    <Navigate to="/" />
  ) : (
    <div className="min-vh-100 d-flex align-items-center">
      <form
        onSubmit={handleLogin}
        className="w-50 mx-auto p-5 bg-black rounded-5"
      >
        <h1 className="text-center text-primary mb-3">Login</h1>
        <div className="my-3">
          <label className="form-label" htmlFor="phone">
            Your Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="form-control"
            value={values.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="password">
            Your Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={values.password}
            onChange={handleInputChange}
          />
        </div>
        <button className="my-3 btn btn-primary w-100">Submit</button>
        <p className="text-center">
          No account yet?{" "}
          <Link to="/register" className="text-decoration-none">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
