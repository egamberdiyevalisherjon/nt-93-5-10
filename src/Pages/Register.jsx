import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { localTokenKey } from "../constants/index";
import { loadMarketData } from "../Store/slices/market";

const Register = () => {
  const [values, setValues] = useState({
    phone: "",
    password: "",
    confirmedPassword: "",
  });

  function handleInputChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleRegister(e) {
    e.preventDefault();

    if (!values.phone || !values.password || !values.confirmedPassword)
      return toast("Please, fill all the fields!", { type: "error" });

    if (values.password !== values.confirmedPassword)
      return toast("Passwords do not match!", { type: "error" });

    // Validations

    try {
      let { data } = await axios.post("/markets", values);

      let { token, message, market } = data;

      localStorage.setItem(localTokenKey, token);
      axios.defaults.headers.common["x-auth-token"] = `Bearer ${token}`;
      toast(message, { type: "success" });
      dispatch(loadMarketData(market));
      navigate("/complete-info");
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
        onSubmit={handleRegister}
        className="w-50 mx-auto p-5 bg-black rounded-5"
      >
        <h1 className="text-center text-primary mb-3">Register</h1>
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
        <div className="my-3">
          <label className="form-label" htmlFor="confirmedPassword">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmedPassword"
            id="confirmedPassword"
            className="form-control"
            value={values.confirmedPassword}
            onChange={handleInputChange}
          />
        </div>
        <button className="my-3 btn btn-primary w-100">Submit</button>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
