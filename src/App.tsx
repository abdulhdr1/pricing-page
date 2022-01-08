import React, { useEffect, useState } from "react";
import "./App.css";

interface iPlan {
  id: number;
  name: "loading" | string;
  monthlyPrice: number;
  annuallyDiscount: number;
  repos: number;
  support: string;
  storage: number;
  members: number;
}

const loadingPlan: iPlan = {
  id: 0,
  name: "loading",
  monthlyPrice: 0,
  annuallyDiscount: 0,
  repos: 0,
  support: "",
  storage: 0,
  members: 0,
};

function App() {
  const [monthly, setMonthly] = useState(true);
  const [tiers, setTiers] = useState<iPlan[]>([loadingPlan]);

  function handleChange() {
    setMonthly(!monthly);
  }

  useEffect(() => {
    fetch("http://localhost:9000/api/")
      .then((response) => response.json())
      .then((data) => {
        setTiers(data);
      });
  });

  const plans = tiers.map((value) => {
    return (
      <div className="col">
        <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 fw-normal">{value.name}</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">
              {monthly == true
                ? `$${Number(value.monthlyPrice / 100)}`
                : `$${Number(
                    (value.monthlyPrice * 12 * (100 - value.annuallyDiscount)) /
                      1000
                  )}`}
              <small className="text-muted fw-light">
                {monthly == true ? "/mo" : "/yr"}
              </small>
            </h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>
                {value.repos == 111 ? "Unlimited" : value.repos} repositories
              </li>
              <li>
                {value.members == 111 ? "Unlimited" : value.members} users
                included
              </li>
              <li>
                {value.storage >= 1000
                  ? `${Number(value.storage / 1000)} TB`
                  : `${Number(value.storage)} GB`}{" "}
                of storage
              </li>
              <li>
                {value.support} {value.support ? "support" : ""}
              </li>
            </ul>
            <button type="button" className="w-100 btn btn-lg btn-primary">
              {value.id === 1 ? "Sign up for free" : "Get started"}
            </button>
          </div>
        </div>
      </div>
    );
  });

  if (tiers[0].name === "loading") {
    return (
      <div className="loading-div">
        <div className="spinner-border text-primary m-auto" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App container py-3">
        <header className="my-5">
          <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 className="display-4 fw-normal">Pricing</h1>
            <h4 className="display-6 fw-normal">Try it now for free</h4>
            <p className="fs-5 text-muted">Monest - Coding challenge</p>
          </div>
        </header>
        <div className="switchButtonDiv">
          <h4 className="my-0 fw-normal ms-auto">Monthly</h4>
          <label className="switch mx-5">
            <input type="checkbox" onClick={handleChange} />
            <span className="slider round"></span>
          </label>
          <div className="annuallyDiv">
            <h4 className="my-0 fw-normal">Annualy</h4>
            <p className="text-danger">15 % discount</p>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
          {plans}
        </div>
      </div>
    );
  }
}

export default App;
