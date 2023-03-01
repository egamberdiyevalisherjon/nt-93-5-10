import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center flex-column">
      <h1>Sorry, the page you are looking for is not found</h1>
      <Link className="btn btn-primary" to="/">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
