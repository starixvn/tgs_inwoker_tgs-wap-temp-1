import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import Header from "../Share/Header";

import { AccountService } from "../../../api-services/services/AccountService";

import Textbox from "../../Wap/Share/Textbox";
import TextboxWithButton from "../../Wap/Share/TextboxWithButton";
import config from "../../../config/config";
import i18n from "../../../utils/i18n";
import LegacyPhonefield from "../component/legacy-phonefield";
import LegacyVerificationfield from "../component/legacy-verification";
import Button from "../component/button";

const Wrapper = styled.div``;

class ForgotPassword extends Component {
  state = {
    email: "",
    code: "",
    step: 1,
    countdownToken: 0,
    loading: false,
    password: "",
    password2: "",
    securityKey: "",
    phone: "",
    areaCode: config.features.PhonePrefix,
    successGetCode: false,
  };
  handleCodeChange = (e) => {
    this.setState({ ...this.state, code: e.target.value });
  };
  handleEmailChange = (e) => {
    this.setState({ ...this.state, email: e.target.value });
  };
  handlePhoneChange = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
  };
  handleGetCodeClick = (e) => {
    if (this.state.countdownToken > 0) return;

    if (config.features.SMSVerification) {
      if (
        this.state.phone.length < 8 ||
        this.state.phone.length > (config.features.MAX_PHONE_LENGTH || 10)
      ) {
        this.props.alert(
          "",
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
        );
        return;
      }
      AccountService.VerifyForgotPassword(
        "",
        this.state.areaCode,
        this.state.phone
      ).then((response) => {
        this.getCodeResponse(response);
      });
    } else {
      if (this.state.email.length > 0) {
        AccountService.VerifyForgotPassword(this.state.email).then(
          (response) => {
            this.getCodeResponse(response);
          }
        );
      } else {
        this.props.alert("", i18n.t("common.msgEnterEmail"));
      }
    }
  };

  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handlePassword2Change = (e) => {
    this.setState({ ...this.state, password2: e.target.value });
  };

  resetGetCode = () => {
    this.setState({
      ...this.state,
      successGetCode: false,
    });
  };
  getCodeResponse = (response) => {
    if (response.IsSuccess) {
      this.props.alert("", i18n.t("common.msgTokenSent"));

      this.setState({
        ...this.state,
        securityKey: response.data,
        loading: true,
        successGetCode: true,
      });
    } else {
      // if (response.code === 201) {
      //   this.props.alert('', i18n.t('error.ERR201'))
      // } else {
      //   this.props.alert('', response.info)
      // }
      this.props.alert("", response.info);
    }
  };
  handleNextClick = () => {
    if (this.state.step === 1) {
      if (config.features.SMSVerification) {
        if (
          this.state.phone.length < 8 ||
          this.state.phone.length > (config.features.MAX_PHONE_LENGTH || 10)
        ) {
          this.props.alert(
            "",
            i18n
              .t("common.noReachMin")
              .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
          );
          return;
        }
      }
      if (this.state.code.length === 6) {
        this.setState({ ...this.state, step: 2 });
      }
    } else {
      if (this.state.password !== this.state.password2) {
        this.props.alert("", i18n.t("forgotPassword.invalidConfirmPass"));
      } else {
        AccountService.ResetPassword(
          this.state.securityKey,
          this.state.code,
          this.state.password
        ).then((response) => {
          if (response.IsSuccess) {
            this.props.alert("", i18n.t("forgotPassword.updateSuccess"));
            this.props.appHistory.replace("/login");
          } else {
            this.props.alert("", response.info);
          }
        });
      }
    }
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
    this.props.GetSupportUrl("", "", "", "");
  };

  handleBackClick = () => {
    if (this.state.step === 2) {
      this.setState({ ...this.state, step: 1 });
    } else {
      this.props.appHistory.goBack();
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header
          onBackClick={this.handleBackClick}
          title={i18n.t("forgotPassword.title")}
        ></Header>
        <Wrapper>
          {(() => {
            if (this.state.step === 1) {
              return config.features.SMSVerification ? (
                <React.Fragment>
                  <LegacyPhonefield
                    areaCode={this.state.areaCode}
                    onAreaCodeChange={(e) => {
                      this.setState({
                        ...this.state,
                        areaCode: e.target.value,
                      });
                    }}
                    phone={this.state.phone}
                    onPhoneChange={this.handlePhoneChange}
                    placeholder={i18n.t("common.msgEnterPhone")}
                    maxLength={config.features.MAX_PHONE_LENGTH || 10}
                  >
                    <option value={config.features.PhonePrefix}>
                      {config.features.PhonePrefix}
                    </option>
                  </LegacyPhonefield>
                  <LegacyVerificationfield
                    code={this.state.code}
                    onCodeChange={this.handleCodeChange}
                    placeholder={i18n.t("common.msgEnterCode")}
                    onGetCode={this.handleGetCodeClick}
                    resetGetCode={this.resetGetCode}
                    successGetCode={this.state.successGetCode}
                  ></LegacyVerificationfield>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Textbox
                    style={{ margin: "20px auto 20px auto" }}
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    placeholder={i18n.t("common.msgEnterEmail")}
                    type={"text"}
                    label={i18n.t("common.emailAddress")}
                  ></Textbox>
                  <TextboxWithButton
                    buttonlabel={i18n.t("common.msgSendToken")}
                    style={{ margin: "20px auto 20px auto" }}
                    value={this.state.code}
                    onChange={this.handleCodeChange}
                    placeholder={i18n.t("common.msgEnterCodeEmail")}
                    label={i18n.t("common.token")}
                    onClick={this.handleGetCodeClick}
                    type={"text"}
                  ></TextboxWithButton>
                </React.Fragment>
              );
            } else if (this.state.step === 2) {
              return (
                <React.Fragment>
                  <Textbox
                    style={{ margin: "20px auto 20px auto" }}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    placeholder={i18n.t("wap.register.password")}
                    type={"password"}
                    label={i18n.t("common.NewPass")}
                  ></Textbox>

                  <Textbox
                    style={{ margin: "20px auto 20px auto" }}
                    value={this.state.password2}
                    onChange={this.handlePassword2Change}
                    placeholder={i18n.t("common.msgEnterConfirmPass")}
                    type={"password"}
                    label={i18n.t("common.ConfirmPass")}
                    successGetCode={this.state.successGetCode}
                  ></Textbox>
                </React.Fragment>
              );
            }
          })()}

          <Button
            style={{ width: "auto ", margin: "0px 20px" }}
            disabled={
              this.state.step === 1
                ? (config.features.SMSVerification
                    ? this.state.phone.length < 1
                    : this.state.email.length < 1) || this.state.code.length < 6
                : this.state.password.length < 6 ||
                  this.state.password2.length < 6
            }
            label={
              this.state.step === 1
                ? i18n.t("common.nextStep")
                : i18n.t("common.confirm")
            }
            onClick={this.handleNextClick}
          ></Button>
        </Wrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,

    token: state.account.token,
  };
};
export default connect(mapStateToProps, null)(withRouter(ForgotPassword));
