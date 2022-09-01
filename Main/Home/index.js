import React from "react";
import config from "../../../../config/config";
import Default from "./default";
import WGHK from "./wghk";

const Home = () => {
  const homepageSwitcher = (brand) => {
    switch (brand) {
      case "WGHK":
        return <WGHK />;
      default:
        return <Default />;
    }
  };
  return <>{homepageSwitcher(config.brand)}</>;
};

export default Home;
