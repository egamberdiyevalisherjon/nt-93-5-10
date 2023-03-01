import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { info } = useSelector(({ market }) => market);

  return info ? (
    <div className="container">
      <h1>{info.name}</h1>
      <h3>{info.phone}</h3>
      <p>{info.inCharge}</p>
      <p>{info.status}</p>
      <p>{info.address.city.name.uz}</p>
      <p>{info.address.region.name.uz}</p>
      <p>{info.address.full}</p>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Dashboard;
