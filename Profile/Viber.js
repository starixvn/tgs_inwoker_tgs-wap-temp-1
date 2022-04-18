import React from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import Textbox from "../Share/Textbox";

import BaseProfile from "./BaseProfile";
import i18n from "../../../utils/i18n";
import {accountAction} from "../../../api-services/actions/accountAction";
import {AccountService} from "../../../api-services/services/AccountService";
class Viber extends BaseProfile {
  state = {
    viber: "",
  };
  componentDidMount() {
    this.setState({ viber: this.props.account.info.member_viber });
  }

  handleChangeNumber = (e) => {
    this.setState({ viber: e.target.value });
    this.onTextChanged();
  };

  isDisableButton = () => {
    return !this.state.viber;
  };
  handleSubmitClicked = () => {
    const viber = this.state.viber;
    //validate here
    //sdasdasdasda
    // const re = new RegExp("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$");
    // if (!viber.match(re)) {
    //   this.props.alert("", i18n.t("profile.viber.msgInvalidViber"));
    //   // this.props.enqueueSnackbar("微信号码格式不正确", {
    //   //   key: "error"
    //   // });
    //   return;
    // }

    this.showLoading(true);
    //api
    AccountService.UpdateViber(viber)
      .then((response) => {
        if (response.IsSuccess) {
          this.props.getAccountProfile().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                viber: viber,
              });
            }
            this.props.alert("", i18n.t("common.msgSuccessUpdateProfile"));
            this.showLoading(false);
          });
        } else {
          this.props.alert("", response.msg);
          this.showLoading(false);
          // this.props.enqueueSnackbar(response.msg, {
          //   key: "error"
          // });
        }
      })
      .catch((err) => {
        this.props.alert("", err);
        // this.props.enqueueSnackbar(err, {
        //   key: "error"
        // });
        this.showLoading(false);
      });
  };

  render() {
    return this.setupContent(
      i18n.t("common.viber"),
      <Textbox
        style={{ margin: "50px auto 20px auto" }}
        value={this.state.viber}
        onChange={this.handleChangeNumber}
        placeholder={i18n.t("profile.viber.plsEnterViber")}
        label={i18n.t("common.viber")}
        maxLength={15}
      ></Textbox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAccountProfile: () => dispatch(accountAction.getAccountProfile(true)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Viber));
