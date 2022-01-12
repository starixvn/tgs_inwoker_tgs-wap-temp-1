import React from "react";
import { connect } from "react-redux";
import { accountAction } from "@Inwoker/tgs-api";
import { withRouter } from "react-router-dom";
import Textbox from "../Share/Textbox";
import TextboxWithButton from "../Share/TextboxWithButton";
import Step from "../Share/Step";
import BaseProfile from "./BaseProfile";
import { AccountService } from "@Inwoker/tgs-api";

import i18n from "../../../utils/i18n";
class ChangeEmail extends BaseProfile {
  componentDidMount() {
    this.setState({
      ...this.state,
      email: this.props.account.info.member_email,
      code: "",
      currentStep: 1,
      countdownToken: 0,
      securityKey: "",
    });
  }

  handleChangeEmail = (e) => {
    this.setState({ ...this.state, email: e.target.value });
    this.onTextChanged();
  };
  handleChangeCode = (e) => {
    this.setState({ ...this.state, code: e.target.value });
    this.onTextChanged();
  };
  checkCountdownToken = () => {
    if (this.state.countdownToken > 0) {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
        btnTokenLabel: this.state.countdownToken - 1,
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    } else {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
<<<<<<< HEAD
        btnTokenLabel: i18n.t('common.btnTokenLabel')
      })
=======
        btnTokenLabel: i18n.t("common.btnTokenLabel"),
      });
>>>>>>> release/current
    }
  };
  handleGetCodeClick = (e) => {
    if (this.state.countdownToken > 0) return;
    if (!this.state.email)
<<<<<<< HEAD
      return this.showErrorMessage(i18n.t('common.msgEnterEmail'))
    this.showLoading(true)
    AccountService.VerifyEmail(this.state.email)
      .then((response) => {
        if (response.IsSuccess) {
          this.showInfoMessage(i18n.t('common.msgTokenSent'))
=======
      return this.showErrorMessage(i18n.t("common.msgEnterEmail"));
    this.showLoading(true);
    AccountService.VerifyEmail(this.state.email)
      .then((response) => {
        if (response.IsSuccess) {
          this.showInfoMessage(i18n.t("common.msgTokenSent"));
>>>>>>> release/current

          this.setState({
            ...this.state,
            countdownToken: 60,
            securityKey: response.data,
          });
          setTimeout(() => {
            this.checkCountdownToken();
          }, 1000);
        } else {
          this.showErrorMessage(response.info);
          // if (response.code === 402) {
          //   this.showErrorMessage(i18n.t('common.msgInvalidEmail'))
          // } else {
          //   this.showErrorMessage(response.info)
          // }
        }

        this.showLoading(false);
      })
      .catch((err) => {
        this.showErrorMessage(err.Message);
      });
  };

  isDisableButton = () => {
    const code = this.state.code;
    const email = this.state.email;
    return !(code && email);
  };
  showErrorMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   key: "error"
    // });
  };
  showInfoMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   key: "info"
    // });
  };
  handleSubmitClicked = () => {
    if (this.state.code.length < 6) {
<<<<<<< HEAD
      this.showErrorMessage(i18n.t('common.msgEnterCode'))
      return
=======
      this.showErrorMessage(i18n.t("common.msgEnterCode"));
      return;
>>>>>>> release/current
    }
    this.showLoading(true);
    if (this.state.currentStep === 1) {
      AccountService.UpdateEmail(this.state.securityKey, this.state.code)
        .then((response) => {
          if (response.IsSuccess) {
            this.setState({
              ...this.state,
              email: "",
              code: "",
              securityKey: "",
              currentStep: 2,
              countdownToken: 0,
            });
          } else {
            // if (response.code === 405) {
            //   this.showErrorMessage(
            //     i18n.t('common.msgInvalidPhoneCode')
            //   )
            // } else {
            //   this.showErrorMessage(response.info)
            // }
            this.showErrorMessage(response.info);
          }

          this.showLoading(false);
        })
        .catch((err) => {
          this.showErrorMessage(err);
          this.showLoading(false);
        });
    } else {
      AccountService.UpdateEmail(this.state.securityKey, this.state.code)
        .then((response) => {
          if (response.IsSuccess) {
            this.props.getAccountProfile(true).then((responseUpdate) => {
              if (responseUpdate.IsSuccess) {
                this.props.appHistory.replace(
<<<<<<< HEAD
                  '/' + i18n.language + '/profile/email'
                )
=======
                  "/" + i18n.language + "/profile/email"
                );
>>>>>>> release/current
              }
              this.showLoading(false);
            });
          } else {
            // if (response.code === 405) {
            //   this.showErrorMessage(
            //     i18n.t('common.msgInvalidPhoneCode')
            //   )
            // } else {
            //   this.showErrorMessage(response.info)
            // }
            this.showErrorMessage(response.info);
            this.showLoading(false);
          }
        })
        .catch((err) => {
          this.showErrorMessage(err);
          this.showLoading(false);
        });
    }
  };
  render() {
    return this.setupContent(
<<<<<<< HEAD
      i18n.t('profile.email.editEmail'),
      <React.Fragment>
        <Step
          steps={[
            { label: i18n.t('profile.email.verifyEmail') },
            { label: i18n.t('profile.email.addEmail') }
=======
      i18n.t("profile.email.editEmail"),
      <React.Fragment>
        <Step
          steps={[
            { label: i18n.t("profile.email.verifyEmail") },
            { label: i18n.t("profile.email.addEmail") },
>>>>>>> release/current
          ]}
          currentStep={this.state.currentStep}
        ></Step>
        <Textbox
          style={{ margin: "50px auto 20px auto" }}
          value={this.state.email}
          onChange={this.handleChangeEmail}
<<<<<<< HEAD
          placeholder={i18n.t('profile.email.plsEnterEmail')}
          disabled={this.state.currentStep === 1}
          label={i18n.t('common.emailAddress')}
=======
          placeholder={i18n.t("profile.email.plsEnterEmail")}
          disabled={this.state.currentStep === 1}
          label={i18n.t("common.emailAddress")}
>>>>>>> release/current
        ></Textbox>
        <TextboxWithButton
          buttonlabel={
            this.state.countdownToken <= 0
<<<<<<< HEAD
              ? i18n.t('common.msgSendToken')
              : i18n.t('common.btnTokenResendLabel') +
                '(' +
=======
              ? i18n.t("common.msgSendToken")
              : i18n.t("common.btnTokenResendLabel") +
                "(" +
>>>>>>> release/current
                this.state.countdownToken +
                "s)"
          }
          type={"text"}
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.code}
          onChange={this.handleChangeCode}
<<<<<<< HEAD
          placeholder={i18n.t('common.msgEnterEmailCode')}
          label={i18n.t('common.token')}
=======
          placeholder={i18n.t("common.msgEnterEmailCode")}
          label={i18n.t("common.token")}
>>>>>>> release/current
          onClick={this.handleGetCodeClick}
          maxLength={6}
        ></TextboxWithButton>
      </React.Fragment>,
      this.state.currentStep === 1
<<<<<<< HEAD
        ? i18n.t('common.nextStep')
        : i18n.t('common.submit')
    )
=======
        ? i18n.t("common.nextStep")
        : i18n.t("common.submit")
    );
>>>>>>> release/current
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
)(withRouter(ChangeEmail));
