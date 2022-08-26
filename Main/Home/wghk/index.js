import React from "react";
import { connect } from "react-redux";
import Landing from "./landing";
const WGHK = (props) => {
  return props.token ? <div>123</div> : <Landing />;
};

const mapStateToProps = (state) => {
  return {
    token: state.account.token,
  };
};

export default connect(mapStateToProps, null)(WGHK);
