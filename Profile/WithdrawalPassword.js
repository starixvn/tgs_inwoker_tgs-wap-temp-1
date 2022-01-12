import React from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import Textbox from "../Share/Textbox";
import { AccountService } from "@Inwoker/tgs-api";
import BaseProfile from "./BaseProfile";

import { accountAction } from "@Inwoker/tgs-api";

import i18n from "../../../utils/i18n";

class WithdrawalPassword extends BaseProfile {
  componentDidMount() {}
  handleOldPassword = (e) => {
    this.setState({ ...this.state, oldPassword: e.target.value });
    this.onTextChanged();
  };
  handlePassword = (e) => {
    this.setState({ ...this.state, password: e.target.value });
    this.onTextChanged();
  };
  handleConfirmPassword = (e) => {
    this.setState({ ...this.state, confirmPassword: e.target.value });
    this.onTextChanged();
  };
  handleSubmitClicked = (e) => {
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    var expr = /^.{6,20}$/;
    if (!expr.test(password)) {
<<<<<<< HEAD
      this.props.alert('', i18n.t('common.msgRegisterPassInvalid'))
      return
=======
      this.props.alert("", i18n.t("common.msgRegisterPassInvalid"));
      return;
>>>>>>> release/current
    }

    if (password !== confirmPassword) {
      this.props.alert(
<<<<<<< HEAD
        '',
        i18n.t('profile.withdrawalPassword.msgInvalidConPass')
      )
      return
=======
        "",
        i18n.t("profile.withdrawalPassword.msgInvalidConPass")
      );
      return;
>>>>>>> release/current
    }

    this.showLoading(true);
    AccountService.AddWithdrawalPassword(password).then((response) => {
      if (response.IsSuccess) {
        this.props.getAccountProfile().then((responseUpdate) => {
          this.showLoading(false);
          this.props.appHistory.goBack();
        });
      } else {
        this.props.alert("", response.msg);
        this.showLoading(false);
        // this.props.enqueueSnackbar(response.msg, {
        //   key: "error"
        // });
      }
    });
  };
  isDisableButton = () => {
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    const isDisableButton = !(password && confirmPassword);
    return isDisableButton;
  };
  render() {
    return this.setupContent(
<<<<<<< HEAD
      i18n.t('profile.withdrawalPassword.title'),
=======
      i18n.t("profile.withdrawalPassword.title"),
>>>>>>> release/current
      <React.Fragment>
        <Textbox
          type={"password"}
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.password}
          onChange={this.handlePassword}
<<<<<<< HEAD
          placeholder={i18n.t(
            'profile.withdrawalPassword.msgEnterNewPass'
          )}
          label={i18n.t('profile.withdrawalPassword.newPass')}
=======
          placeholder={i18n.t("profile.withdrawalPassword.msgEnterNewPass")}
          label={i18n.t("profile.withdrawalPassword.newPass")}
>>>>>>> release/current
        ></Textbox>
        <Textbox
          type={"password"}
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.confirmPassword}
          onChange={this.handleConfirmPassword}
<<<<<<< HEAD
          placeholder={i18n.t(
            'profile.withdrawalPassword.msgEnterConPass'
          )}
          label={i18n.t('profile.withdrawalPassword.conPass')}
=======
          placeholder={i18n.t("profile.withdrawalPassword.msgEnterConPass")}
          label={i18n.t("profile.withdrawalPassword.conPass")}
>>>>>>> release/current
        ></Textbox>
      </React.Fragment>
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
    getAccountProfile: (token) =>
      dispatch(accountAction.getAccountProfile(true)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WithdrawalPassword));
