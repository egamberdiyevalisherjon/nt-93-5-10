import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { localTokenKey } from "../constants/index";
import useFetch from "../hooks/useFetch";
import { loadMarketData } from "../Store/slices/market";

const Private = () => {
  let token = localStorage.getItem(localTokenKey);

  const { data } = useFetch("markets/me");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      dispatch(loadMarketData(data.market));

      if (!data.market.isCompleted) navigate("/complete-info");
    }
  }, [data, dispatch, navigate]);

  return token ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Private;
