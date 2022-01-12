import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import Header from "../Share/Header";

import { AccountService } from "@Inwoker/tgs-api";

import Textbox from "../../Wap/Share/Textbox";
import TextboxWithButton from "../../Wap/Share/TextboxWithButton";
import Button from "../../Wap/Share/Button";
import config from "../../../config/config";
import i18n from "../../../utils/i18n";

const Container = styled.div`
  margin: 0 auto;

  width: 635px;
  height: 80px;
  border-radius: 6px;

  background-color: #ffffff;
`;
const SelectContainer = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  color: #000;
  font-size: 30px;
  background-color: #fff;
  border-radius: 16px;
`;
const CustomInput = styled.input`
  height: 50px;
  width: 405px;
  font-size: 28px;
  margin-top: 18px;
  border-radius: 8px;
  padding: 16px 32px;
  font-weight: 500;
  border: 0;
  display: flex;
  flex: 1;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
    font-size: 28px;
  }
  &:disabled {
    background: #fff;

    opacity: 1;
  }
`;

const CustomText = styled.div`
  width: 700px;
  height: 170px;
  padding: 20px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-left: 3px;
  color: ${({ theme }) => theme.secondary};
`;

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
    areaCode: "+852",
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
      AccountService.VerifyForgotPassword(
        "",
        this.state.areaCode,
        this.state.phone
      ).then((response) => {
        this.getCodeResponse(response);
      });
    } else {
      AccountService.VerifyForgotPassword(this.state.email).then((response) => {
        this.getCodeResponse(response);
      });
    }
  };

  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handlePassword2Change = (e) => {
    this.setState({ ...this.state, password2: e.target.value });
  };
  getCodeResponse = (response) => {
    if (response.IsSuccess) {
<<<<<<< HEAD
      this.props.alert('', i18n.t('common.msgTokenSent'))
=======
      this.props.alert("", i18n.t("common.msgTokenSent"));
>>>>>>> release/current

      this.setState({
        ...this.state,
        securityKey: response.data,
        loading: true,
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
      if (this.state.code.length === 6) {
        this.setState({ ...this.state, step: 2 });
      }
    } else {
      if (this.state.password !== this.state.password2) {
<<<<<<< HEAD
        this.props.alert(
          '',
          i18n.t('forgotPassword.invalidConfirmPass')
        )
=======
        this.props.alert("", i18n.t("forgotPassword.invalidConfirmPass"));
>>>>>>> release/current
      } else {
        AccountService.ResetPassword(
          this.state.securityKey,
          this.state.code,
          this.state.password
        ).then((response) => {
          if (response.IsSuccess) {
<<<<<<< HEAD
            this.props.alert(
              '',
              i18n.t('forgotPassword.updateSuccess')
            )
            this.props.appHistory.replace('/' + i18n.language + '/')
=======
            this.props.alert("", i18n.t("forgotPassword.updateSuccess"));
            this.props.appHistory.replace("/" + i18n.language + "/");
>>>>>>> release/current
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
<<<<<<< HEAD
          title={i18n.t('forgotPassword.title')}
=======
          title={i18n.t("forgotPassword.title")}
>>>>>>> release/current
        ></Header>
        {(() => {
          if (this.state.step === 1) {
            return config.features.SMSVerification ? (
              <React.Fragment>
                <CustomText>
<<<<<<< HEAD
                  <CustomLabel>
                    {i18n.t('common.phoneNumber')}
                  </CustomLabel>
=======
                  <CustomLabel>{i18n.t("common.phoneNumber")}</CustomLabel>
>>>>>>> release/current
                  <Container
                    style={{
                      margin: "18px 5px 0 0",
                      width: "180px",
                      float: "left",
                      padding: "10px",
                    }}
                  >
                    <SelectContainer
                      value={this.state.areaCode}
                      onChange={(e) => {
                        this.setState({
                          ...this.state,
                          areaCode: e.target.value,
                        });
                      }}
                    >
                      <option value={"+852"}>+852</option>
                    </SelectContainer>
                  </Container>
                  <CustomInput
                    value={this.state.phone}
                    onChange={this.handlePhoneChange}
<<<<<<< HEAD
                    placeholder={i18n.t('common.msgEnterPhone')}
                    type={'text'}
                    label={i18n.t('common.msgEnterPhone')}
=======
                    placeholder={i18n.t("common.msgEnterPhone")}
                    type={"text"}
                    label={i18n.t("common.msgEnterPhone")}
>>>>>>> release/current
                  ></CustomInput>
                </CustomText>

                <TextboxWithButton
<<<<<<< HEAD
                  buttonlabel={i18n.t('common.msgSendToken')}
                  style={{ margin: '20px auto 20px auto' }}
                  value={this.state.code}
                  onChange={this.handleCodeChange}
                  placeholder={i18n.t('common.msgEnterCode')}
                  label={i18n.t('common.token')}
=======
                  buttonlabel={i18n.t("common.msgSendToken")}
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.code}
                  onChange={this.handleCodeChange}
                  placeholder={i18n.t("common.msgEnterCode")}
                  label={i18n.t("common.token")}
>>>>>>> release/current
                  onClick={this.handleGetCodeClick}
                  type={"text"}
                ></TextboxWithButton>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.email}
                  onChange={this.handleEmailChange}
<<<<<<< HEAD
                  placeholder={i18n.t('common.msgEnterEmail')}
                  type={'text'}
                  label={i18n.t('common.emailAddress')}
                ></Textbox>
                <TextboxWithButton
                  buttonlabel={i18n.t('common.msgSendToken')}
                  style={{ margin: '20px auto 20px auto' }}
                  value={this.state.code}
                  onChange={this.handleCodeChange}
                  placeholder={i18n.t('common.msgEnterCode')}
                  label={i18n.t('common.token')}
=======
                  placeholder={i18n.t("common.msgEnterEmail")}
                  type={"text"}
                  label={i18n.t("common.emailAddress")}
                ></Textbox>
                <TextboxWithButton
                  buttonlabel={i18n.t("common.msgSendToken")}
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.code}
                  onChange={this.handleCodeChange}
                  placeholder={i18n.t("common.msgEnterCode")}
                  label={i18n.t("common.token")}
>>>>>>> release/current
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
<<<<<<< HEAD
                  placeholder={i18n.t('wap.register.password')}
                  type={'password'}
                  label={i18n.t('common.NewPass')}
=======
                  placeholder={i18n.t("wap.register.password")}
                  type={"password"}
                  label={i18n.t("common.NewPass")}
>>>>>>> release/current
                ></Textbox>

                <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.password2}
                  onChange={this.handlePassword2Change}
<<<<<<< HEAD
                  placeholder={i18n.t('common.msgEnterConfirmPass')}
                  type={'password'}
                  label={i18n.t('common.ConfirmPass')}
=======
                  placeholder={i18n.t("common.msgEnterConfirmPass")}
                  type={"password"}
                  label={i18n.t("common.ConfirmPass")}
>>>>>>> release/current
                ></Textbox>
              </React.Fragment>
            );
          }
        })()}

        <Button
          style={{ margin: "40px auto 0 auto" }}
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
<<<<<<< HEAD
              ? i18n.t('common.nextStep')
              : i18n.t('common.confirm')
=======
              ? i18n.t("common.nextStep")
              : i18n.t("common.confirm")
>>>>>>> release/current
          }
          onClick={this.handleNextClick}
        ></Button>
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
