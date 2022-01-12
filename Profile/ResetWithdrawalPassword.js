import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { withRouter } from "react-router-dom";

import { accountAction, AccountService } from "@Inwoker/tgs-api";

import Textbox from "../../Wap/Share/Textbox";
import TextboxWithButton from "../../Wap/Share/TextboxWithButton";
import Button from "../../Wap/Share/Button";
import i18n from "../../../utils/i18n";
import Step from "../Share/Step";

class ResetResetWithdrawalPassword extends Component {
  state = {
    selectedTab: 0,
    answer: "",
    phone: "",
    username: "",
    sessionId: "",
    email: "",
    code: "",
    step: 1,
    countdownToken: 0,
    password: "",
    confirmPassword: "",
    securityKey: "",
    getCodeClicked: false,
  };
  componentDidMount() {}

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };

  handlePhoneChange = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
  };

  handleCodeChange = (e) => {
    this.setState({ ...this.state, code: e.target.value });
  };
  handlePassword = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handleConfirmPassword = (e) => {
    this.setState({ ...this.state, confirmPassword: e.target.value });
  };
  handleGetCodeClick = (e) => {
    if (this.state.countdownToken > 1) return;

    AccountService.GetChangeWithdrawalPasswordVerificationCode().then(
      (response) => {
        this.getCodeResponse(response);
      }
    );
  };
  getCodeResponse = (response) => {
    if (response.IsSuccess) {
      this.setState({
        securityKey: response.data,
        countdownToken: 60,
<<<<<<< HEAD
        getCodeClicked: true
      })
      this.showInfoMessage(i18n.t('common.msgTokenSent'))
=======
        getCodeClicked: true,
      });
      this.showInfoMessage(i18n.t("common.msgTokenSent"));
>>>>>>> release/current
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    } else {
      this.showInfoMessage(response.info);
    }
  };
  checkCountdownToken = () => {
    if (this.state.countdownToken > 0) {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    } else {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
    }
  };
  handleNextClick = () => {
    if (this.state.code !== "") {
      this.setState({ ...this.state, step: 2 });
    }
  };
  handleBackClick = () => {
    if (this.state.code !== "") {
      this.setState({ ...this.state, step: 1 });
    }
  };
  handleSubmitClicked = (e) => {
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    if (password !== confirmPassword) {
<<<<<<< HEAD
      this.props.alert('', i18n.t('common.msgInvalidConfirmPass'))
      return
=======
      this.props.alert("", i18n.t("common.msgInvalidConfirmPass"));
      return;
>>>>>>> release/current
    }
    AccountService.ChangeWithdrawalPassword(
      password,
      this.state.code,
      this.state.securityKey
    ).then((response) => {
      if (response.IsSuccess) {
        this.props.alert(
<<<<<<< HEAD
          '',
          i18n.t(
            'profile.resetResetWithdrawalPassword.resetSuccess'
          )
        )
        this.props.appHistory.goBack()
=======
          "",
          i18n.t("profile.resetResetWithdrawalPassword.resetSuccess")
        );
        this.props.appHistory.goBack();
>>>>>>> release/current
      } else {
        this.props.alert("", response.info);
        // if (response.code === 405) {
        //   this.props.alert('', i18n.t('common.msgInvalidPhoneCode'))
        // } else {
        //   this.props.alert('', response.info)
        // }
      }
    });
  };
  showInfoMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   variant: "info"
    // });
  };
  showErrorMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   variant: "error"
    // });
  };
  checkCountdown = () => {
    if (this.state.countdownToken > 0) {
      this.timer = setTimeout(() => {
        this.setState({
          ...this.state,
          countdownToken: this.state.countdownToken - 1,
        });
        this.checkCountdown();
      }, 1000);
    }
  };
  handleCSClick = () => {
<<<<<<< HEAD
    this.props.appHistory.push('/' + i18n.language + '/chat')
  }
=======
    this.props.appHistory.push("/" + i18n.language + "/chat");
  };
>>>>>>> release/current
  render() {
    return (
      <React.Fragment>
        <Step
          steps={[
            {
              label: i18n.t(
<<<<<<< HEAD
                'profile.resetResetWithdrawalPassword.verifiedEmail'
              )
            },
            { label: i18n.t('common.reset') }
=======
                "profile.resetResetWithdrawalPassword.verifiedEmail"
              ),
            },
            { label: i18n.t("common.reset") },
>>>>>>> release/current
          ]}
          currentStep={this.state.step}
        ></Step>
        {this.state.step === 1 ? (
          <React.Fragment>
            <Textbox
              style={{ margin: "100px auto 20px auto" }}
              value={this.props.account.info.member_email}
<<<<<<< HEAD
              placeholder={i18n.t('common.msgEnterEmail')}
              type={'text'}
              disabled={true}
              label={i18n.t('common.emailAddress')}
=======
              placeholder={i18n.t("common.msgEnterEmail")}
              type={"text"}
              disabled={true}
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
              style={{ margin: "20px auto 20px auto" }}
              value={this.state.code}
              onChange={this.handleCodeChange}
<<<<<<< HEAD
              placeholder={i18n.t('common.msgEnterEmailCode')}
              label={i18n.t('common.token')}
=======
              placeholder={i18n.t("common.msgEnterEmailCode")}
              label={i18n.t("common.token")}
>>>>>>> release/current
              onClick={this.handleGetCodeClick}
              maxLength={6}
              type={"text"}
            ></TextboxWithButton>
            <Button
<<<<<<< HEAD
              style={{ margin: '40px auto 0 auto' }}
              label={i18n.t('common.nextStep')}
=======
              style={{ margin: "40px auto 0 auto" }}
              label={i18n.t("common.nextStep")}
>>>>>>> release/current
              onClick={this.handleNextClick}
              disabled={
                !this.state.getCodeClicked || this.state.code.length < 6
              }
            ></Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Textbox
              type={"password"}
              style={{ margin: "100px auto 20px auto" }}
              value={this.state.password}
              onChange={this.handlePassword}
<<<<<<< HEAD
              placeholder={i18n.t('common.msgEnterNewPass')}
              label={i18n.t('common.NewPass')}
=======
              placeholder={i18n.t("common.msgEnterNewPass")}
              label={i18n.t("common.NewPass")}
>>>>>>> release/current
            ></Textbox>
            <Textbox
              type={"password"}
              style={{ margin: "20px auto 20px auto" }}
              value={this.state.confirmPassword}
              onChange={this.handleConfirmPassword}
<<<<<<< HEAD
              placeholder={i18n.t('common.msgEnterConfirmPass')}
              label={i18n.t('common.ConfirmPass')}
            ></Textbox>

            <Button
              style={{ margin: '40px auto 0 auto' }}
              label={i18n.t('common.submit')}
              onClick={this.handleSubmitClicked}
            ></Button>
            <Button
              style={{ margin: '20px auto 0 auto' }}
              label={i18n.t('common.back')}
=======
              placeholder={i18n.t("common.msgEnterConfirmPass")}
              label={i18n.t("common.ConfirmPass")}
            ></Textbox>

            <Button
              style={{ margin: "40px auto 0 auto" }}
              label={i18n.t("common.submit")}
              onClick={this.handleSubmitClicked}
            ></Button>
            <Button
              style={{ margin: "20px auto 0 auto" }}
              label={i18n.t("common.back")}
>>>>>>> release/current
              onClick={this.handleBackClick}
            ></Button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,

    account: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetResetWithdrawalPassword));
