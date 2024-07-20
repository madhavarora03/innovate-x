import React from "react";
import ProdCard from "./ProdCard";

function Latest() {
  return (
    <div className="bg-base-100 shadow-xl p-4">
      <div className="card-body">
        <h1 className="card-title text-2xl mb-4">Latest Products</h1>
        <p className="mb-4">Check out our latest products</p>
        <div className="flex flex-wrap justify-center gap-4">
          <ProdCard />
          <ProdCard />
          <ProdCard />
          <ProdCard />
          <ProdCard />
          <ProdCard />
          <ProdCard />
          <ProdCard />
        </div>
      </div>
    </div>
  );
}

export default Latest;
