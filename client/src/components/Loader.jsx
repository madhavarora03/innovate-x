import React from "react";

const Loader = () => {
  return (
    <span
      className="loading loading-spinner loading-lg"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
      role="status"
    ></span>
  );
};

export default Loader;
