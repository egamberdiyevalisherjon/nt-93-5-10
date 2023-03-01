import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";
import axios from "axios";
import { loadMarketData } from "../Store/slices/market";

const CompleteInfo = () => {
  const [values, setValues] = useState({
    name: "",
    inCharge: "",
    address: {
      city: "",
      region: "",
      full: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data } = useFetch("/regions");

  const { data: market } = useFetch("/markets/me");

  useEffect(() => {
    if (market) {
      dispatch(loadMarketData(market.market));
      if (market.market.isCompleted) navigate("/");
    }
  }, [market, dispatch, navigate]);

  const regions = data?.regions;

  function handleInputChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handleFullAddressChange(e) {
    setValues((v) => ({
      ...v,
      address: { ...v.address, full: e.target.value },
    }));
  }

  function handleRegionChange(e) {
    setValues((v) => ({
      ...v,
      address: {
        ...v.address,
        region: e.target.value,
        city: regions.find((r) => r._id === e.target.value).city._id,
      },
    }));
  }

  async function handleCompleteInfo(e) {
    e.preventDefault();
    if (
      !values.name ||
      !values.inCharge ||
      !values.address.full ||
      !values.address.region ||
      !values.address.city
    )
      return toast("Please, fill all the fields!", { type: "error" });

    try {
      let {
        data: { market, message },
      } = await axios.post("markets/me", values);

      dispatch(loadMarketData(market));
      toast(message, { type: "success" });
      navigate("/");
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

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <form
        onSubmit={handleCompleteInfo}
        className="w-50 mx-auto p-5 bg-black rounded-5"
      >
        <h1 className="text-center text-primary mb-3">Complete</h1>
        <div className="my-3">
          <label className="form-label" htmlFor="name">
            Market name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={values.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="inCharge">
            Person in charge
          </label>
          <input
            type="text"
            name="inCharge"
            id="inCharge"
            className="form-control"
            value={values.inCharge}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <label htmlFor="region" className="form-label">
            Region
          </label>

          <select
            name="region"
            id="region"
            value={values.address.region}
            onChange={handleRegionChange}
            className="form-select"
          >
            <option value="">Select region</option>
            {regions?.map?.((r) => (
              <option key={r._id} value={r._id}>
                {r.name.uz}
              </option>
            ))}
          </select>
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="full-address">
            Full address
          </label>
          <input
            type="text"
            name="full-address"
            id="full-address"
            className="form-control"
            value={values.address.full}
            onChange={handleFullAddressChange}
          />
        </div>
        <button className="my-3 btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default CompleteInfo;
