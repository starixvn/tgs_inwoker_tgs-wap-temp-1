import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import ButtonSwitch from "./ButtonSwitch";
import Select from "./Select";
import VerificationCode from "./VerificationCode";
import Textbox from "./Textbox";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import {
  accountAction,
  generalAction,
  walletAction,
  gameAction,
  GeneralService,
  inboxAction,
  AccountService,
} from "@Inwoker/tgs-api";

import ButtonWap from "../../Share/ButtonWap";
import Loading from "../../Wap/Share/Loading";

import i18n from "../../../utils/i18n";
import BlowFishEncryption from "../../../utils/BlowFishEncryption";
import config from "../../../config/config";
const Container = styled.div`
  z-index: 10;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/login-bg.jpg`})
    no-repeat;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: scroll;
`;

const ContentWrap = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  width: 750px;
  padding-bottom: 60px;
`;
const Logo = styled.div`
  width: 400px;
  height: 200px;
  margin: 60px auto 60px auto;
  background: url("${(props) => props.img}") no-repeat center center;
  background-size: contain;
`;
const RememberPassContainer = styled.div`
  float: left;
  margin: 10px 0 0 90px;
`;
const RememberPassLabel = styled.div`
  float: left;
  font-size: 28px;
  margin-top: 14px;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.secondary};
`;
const CustomCheck = withStyles({
  root: {
    width: "50px",
    height: "50px",
    fontSize: "50px",
    float: "left",
  },
})(Checkbox);
const ForgotPassContainer = styled.div`
  float: right;
  margin: 10px 100px 0 0;
`;
const ForgotPassLabel = styled(RememberPassLabel)`
  float: right;
`;
const LoginActionContainer = styled.div`
  margin: 100px 0 0 0;
`;

const LanguageWrap = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.secondary};
  font-size: 28px;
  margin-top: 20px;
`;
const LanguageLink = styled.span`
  text-align: center;
  ${(props) =>
    props.selected == true ? `color:` + props.theme.primary + `;` : ``}
`;

const Version = styled.div`
  position: fixed;
  bottom: 5px;
  right: 5px;
  color: ${({ theme }) => theme.secondary};
`;

const TNC = styled(RememberPassLabel)`
  width: 515px;
  margin-bottom: 14px;
`;

const CustomWapButton = styled(ButtonWap)`
  background: transparent;
  border: solid 2px ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
`;

class Login extends Component {
  state = {
    selected: 0,
    isUpdate: false,
    hidePassword: true,
    hideConfirmPassword: true,
    username: "",
    password: "",
    withPromo: localStorage.getItem("promotionId") === "" ? false : true,
    promoId: this.props.match.params.promotionid
      ? this.props.match.params.promotionid
      : localStorage.getItem("promotionId"),
    promotionChannelId: localStorage.getItem("promotionChannelId"),
    withdrawalPassword: "",
    confirmWithdrawalPassword: "",
    withdrawalPassword: "",
    withdrawalPassword: "",
    confirmPassword: "",
    tnc: true,
    rememberMe: false,
    loading: false,
    areaCode: "+852",
    code: "",
    countdown: 0,
    securityKey: "",
    phone: "",
  };
  componentDidMount() {
    const promotionId = this.props.match.params.promotionid;
    const promotionChannelId = this.props.match.params.promotionchannelid;
    if (!isNaN(promotionId) && !isNaN(promotionChannelId)) {
      GeneralService.AffiliateClick(promotionId, promotionChannelId);
    }

    if (this.props.token != null) {
<<<<<<< HEAD
      this.props.appHistory.replace(
        '/' + i18n.language + '/main/home'
      )
=======
      this.props.appHistory.replace("/" + i18n.language + "/main/home");
>>>>>>> release/current
    } else {
      let urlParams = new URLSearchParams(this.props.location.search);
      if (urlParams.has("do")) {
        const doValue = urlParams.get("do");
        switch (doValue) {
          case "login":
          case "login_auth":
            this.handleChangeSelection(0);
            break;
          case "register":
          case "register_auth":
            this.handleChangeSelection(1);
            break;
        }
      } else {
        const username = localStorage.getItem("username");
        const remember = localStorage.getItem("remember");
        if (remember == "true") {
          this.setState({
            ...this.state,

            username: username,
            rememberMe: true,
          });
        } else {
          this.setState({
            ...this.state,
          });
        }
      }
    }
  }
  componentDidUpdate() {}
  handleChangeSelection = (index) => {
    if (this.state.selected !== index) {
      this.setState({
        ...this.state,
        selected: index,
        isUpdate: true,
      });
    }
  };
  handleLoginSuccess = (token) => {
    let urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("return_url")) {
      const returnValue = urlParams.get("return_url");
      if (returnValue) {
        window.location.href =
          returnValue + "?token=" + BlowFishEncryption.Encrypt(token);
      }
    }
    // this.props.getAccountInfo(token);
    // this.props.getAccountProfile(token, true);
    // this.props.getVIPInfo(token);
    // this.props.checkGame();
    this.props.getBalanceList();
    // this.props.getIDCardNo();
    // this.props.getDepositChannel();
    // this.props.getInviteLink();
<<<<<<< HEAD
    this.props.getMessageList(i18n.language, 1, 99)
    this.props.getBankCardList()
    this.props.getPlayerPromotionList(i18n.language)
    this.props.getAccountInfo()
=======
    this.props.getMessageList(i18n.language, 1, 99);
    this.props.getBankCardList();
    this.props.getPlayerPromotionList(i18n.language);
    this.props.getAccountInfo();
>>>>>>> release/current
    if (this.state.rememberMe === true) {
      localStorage.setItem("remember", true);

      localStorage.setItem("username", this.state.username);
    } else {
      localStorage.removeItem("remember");

      localStorage.removeItem("username");
    }
<<<<<<< HEAD
    this.props.appHistory.replace(
      '/' + i18n.language + '/main/home'
    )
  }
  handleBackToHomeClick = () => {
    this.props.appHistory.replace(
      '/' + i18n.language + '/main/home'
    )
  }
=======
    this.props.appHistory.replace("/" + i18n.language + "/main/home");
  };
  handleBackToHomeClick = () => {
    this.props.appHistory.replace("/" + i18n.language + "/main/home");
  };
>>>>>>> release/current
  handleLoginClick = () => {
    const username = this.state.username;
    const password = this.state.password;
    this.doLogin(username, password);
  };
  doLogin = (username, password) => {
<<<<<<< HEAD
    if (username === '') {
      this.props.alert(
        '',
        i18n.t('web.login.errorMsg.emptyUsername')
      )
=======
    if (username === "") {
      this.props.alert("", i18n.t("web.login.errorMsg.emptyUsername"));
>>>>>>> release/current
      // this.props.enqueueSnackbar("用户名不能为空", {
      //   variant: "warning"
      // });
      return;
    }
<<<<<<< HEAD
    if (username === '') {
      this.props.alert(
        '',
        i18n.t('web.login.errorMsg.emptyPassword')
      )
=======
    if (username === "") {
      this.props.alert("", i18n.t("web.login.errorMsg.emptyPassword"));
>>>>>>> release/current
      // this.props.enqueueSnackbar("密码不能为空", {
      //   variant: "warning"
      // });
      return;
    }
    this.setState({ ...this.state, loading: true });
    this.props.accountLogin(username, password).then((result) => {
      if (result.IsSuccess) {
        this.handleLoginSuccess(result.data);
      } else {
        if (result.code === 210) {
<<<<<<< HEAD
          this.props.appHistory.push(
            '/' + i18n.language + '/banned'
          )
=======
          this.props.appHistory.push("/" + i18n.language + "/banned");
>>>>>>> release/current
        } else {
          if (result.data.self_control === 1) {
            this.props.showLogin(false);
            this.setState({
              ...this.state,
              expired_time: result.data.expired_time,
              openSelfControlDialog: true,
              openDialog: false,
              loading: false,
            });
          } else {
<<<<<<< HEAD
            this.props.alert(
              '',
              i18n.t('common.msgInvalidUsername')
            )
=======
            this.props.alert("", i18n.t("common.msgInvalidUsername"));
>>>>>>> release/current
            // this.props.enqueueSnackbar(result.msg, {
            //   variant: "warning"
            // });
            this.setState({
              ...this.state,

              loading: false,
            });
          }
        }
      }
    });
  };
  handleForgotpasswordClick = () => {
<<<<<<< HEAD
    this.props.appHistory.push(
      '/' + i18n.language + '/forgot-password'
    )
  }

  handleGoDownloadPage = () => {
    this.props.appHistory.push(
      '/' + i18n.language + '/main/download'
    )
  }
=======
    this.props.appHistory.push("/" + i18n.language + "/forgot-password");
  };

  handleGoDownloadPage = () => {
    this.props.appHistory.push("/" + i18n.language + "/main/download");
  };
>>>>>>> release/current
  handleUsernameChange = (e) => {
    this.setState({
      ...this.state,
      username: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      ...this.state,
      password: e.target.value,
    });
  };
  handleAreaCodeChange = (e) => {
    this.setState({
      ...this.state,
      areaCode: e.target.value,
    });
  };
  handlePhoneChange = (e) => {
    this.setState({
      ...this.state,
      phone: e.target.value,
    });
  };
  handleCodeChange = (e) => {
    this.setState({
      ...this.state,
      code: e.target.value,
    });
  };
  handleConfirmPasswordChange = (e) => {
    this.setState({
      ...this.state,
      confirmPassword: e.target.value,
    });
  };
  handleWithdrawalPasswordChange = (e) => {
    this.setState({
      ...this.state,
      withdrawalPassword: e.target.value,
    });
  };
  handleConfirmWithdrawalPasswordChange = (e) => {
    this.setState({
      ...this.state,
      confirmWithdrawalPassword: e.target.value,
    });
  };
  handlePromoCodeChange = (e) => {
    this.setState({
      ...this.state,
      promoId: e.target.value,
    });
  };
  handleToggleShow = () => {
    this.setState({ ...this.state, hidePassword: !this.state.hidePassword });
  };
  handleRememberMeChange = (e) => {
    this.setState({ ...this.state, rememberMe: e.target.checked });
  };
  handleToggleConfirmPasswordShow = () => {
    this.setState({
      ...this.state,
      hideConfirmPassword: !this.state.hideConfirmPassword,
    });
  };
  handleActivationClick = async () => {
    const username = this.state.username;
    const password = this.state.password;
    const code = this.state.code;
    const securityKey = this.state.securityKey;

    var expr = /^[a-zA-Z0-9]{6,32}$/;
    if (!expr.test(username)) {
<<<<<<< HEAD
      this.props.alert(
        '',
        i18n.t('common.msgRegisterUserNameInvalid')
      )
      return
=======
      this.props.alert("", i18n.t("common.msgRegisterUserNameInvalid"));
      return;
>>>>>>> release/current
    }
    expr = /^.{6,20}$/;
    if (!expr.test(password)) {
<<<<<<< HEAD
      this.props.alert('', i18n.t('common.msgRegisterPassInvalid'))
      return
=======
      this.props.alert("", i18n.t("common.msgRegisterPassInvalid"));
      return;
>>>>>>> release/current
    }
    expr = /^[a-zA-Z0-9]{6}$/;
    if (!expr.test(code)) {
<<<<<<< HEAD
      this.props.alert('', i18n.t('common.msgEnterCode'))
      return
=======
      this.props.alert("", i18n.t("common.msgEnterCode"));
      return;
>>>>>>> release/current
    }

    AccountService.VerifyActivation(securityKey, code).then(
      async (response) => {
        if (response.IsSuccess) {
<<<<<<< HEAD
          this.props.alert('', i18n.t('common.msgTokenVerified'))
          this.doLogin(username, password)
=======
          this.props.alert("", i18n.t("common.msgTokenVerified"));
          this.doLogin(username, password);
>>>>>>> release/current
        } else {
          this.props.alert("", response.info);
        }
      }
    );
  };
  handleGetCodeClick = () => {
    const username = this.state.username;
    const password = this.state.password;
    const code = this.state.code;
    const countdown = this.state.countdown;
    const areacode = this.state.areaCode;
    const phone = this.state.phone;
    if (countdown <= 0) {
      var expr = /^[a-zA-Z0-9]{6,32}$/;
      if (!expr.test(username)) {
<<<<<<< HEAD
        this.props.alert(
          '',
          i18n.t('common.msgRegisterUserNameInvalid')
        )
        return
=======
        this.props.alert("", i18n.t("common.msgRegisterUserNameInvalid"));
        return;
>>>>>>> release/current
      }
      var expr = /^.{6,20}$/;
      if (!expr.test(password)) {
<<<<<<< HEAD
        this.props.alert(
          '',
          i18n.t('common.msgRegisterPassInvalid')
        )
        return
=======
        this.props.alert("", i18n.t("common.msgRegisterPassInvalid"));
        return;
>>>>>>> release/current
      }

      AccountService.Activation(username, password, areacode, phone).then(
        async (response) => {
          if (response.IsSuccess) {
<<<<<<< HEAD
            this.props.alert('', i18n.t('common.msgTokenSent'))
=======
            this.props.alert("", i18n.t("common.msgTokenSent"));
>>>>>>> release/current
            this.setState({
              ...this.state,
              countdown: 60,
              securityKey: response.data,
            });
            this.checkCountdown();
          } else {
            this.props.alert("", response.info);
          }
        }
      );
    }
  };
  timer = null;
  checkCountdown = () => {
    if (this.state.countdown > 0) {
      this.timer = setTimeout(() => {
        this.setState({ ...this.state, countdown: this.state.countdown - 1 });
        this.checkCountdown();
      }, 1000);
    }
  };
  handleTncClick = (e) => {
    this.setState({
      ...this.state,
      tnc: !this.state.tnc,
    });
  };
  handleRegisterClick = () => {
    const username = this.state.username;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    const withdrawalPassword = this.state.withdrawalPassword;
    const confirmWithdrawalPassword = this.state.confirmWithdrawalPassword;
    const promotion_id = this.state.promoId;
    const promotion_channel_id = this.state.promotionChannelId;
    const tnc = this.state.tnc;
    var expr = /^[a-zA-Z0-9]{6,32}$/;
    if (!expr.test(username)) {
<<<<<<< HEAD
      this.props.alert(
        '',
        i18n.t('common.msgRegisterUserNameInvalid')
      )
      return
=======
      this.props.alert("", i18n.t("common.msgRegisterUserNameInvalid"));
      return;
>>>>>>> release/current
    }
    var expr = /^.{6,20}$/;
    if (!expr.test(password)) {
<<<<<<< HEAD
      this.props.alert('', i18n.t('common.msgRegisterPassInvalid'))
=======
      this.props.alert("", i18n.t("common.msgRegisterPassInvalid"));
>>>>>>> release/current

      return;
    }

    if (password !== confirmPassword) {
<<<<<<< HEAD
      this.props.alert(
        '',
        i18n.t('common.msgRegisterPassMatchInvalid')
      )
=======
      this.props.alert("", i18n.t("common.msgRegisterPassMatchInvalid"));
>>>>>>> release/current

      return;
    }
    // if (withdrawalPassword.length < 6) {
    //   this.props.alert("", i18n.t("common.msgRegisterWithdrawalPassInvalid"));

    //   return;
    // }
    // if (withdrawalPassword !== confirmWithdrawalPassword) {
    //   this.props.alert("", i18n.t("common.msgRegisterWithdrawalPassMatchInvalid"));

    //   return;
    // }
    if (tnc) {
      this.setState({ ...this.state, loading: true });
      // user_account,
      // user_password,
      // pay_password,
      // mobile,
      // recommend_code,
      // mobile_code_id
      this.props
        .register(username, password, confirmPassword, promotion_id)
        .then(async (response) => {
          if (response.IsSuccess && response.data.isnew === false) {
<<<<<<< HEAD
            this.props.alert('', i18n.t('common.msgAlreadyExist'))
            this.setState({ ...this.state, loading: false })
=======
            this.props.alert("", i18n.t("common.msgAlreadyExist"));
            this.setState({ ...this.state, loading: false });
>>>>>>> release/current
          } else if (response.IsSuccess) {
            if (config.features.SMSVerification) {
              this.setState({
                ...this.state,
                selected: 2,
                loading: false,
              });
            } else {
              this.doLogin(username, password);
            }
          } else {
            // if (response.code === 206) {
            //   this.props.alert(
            //     '',
            //     i18n.t('common.msgInvalidInvitationCode')
            //   )
            // } else {
            //   this.props.alert('', response.info)
            // }
            this.props.alert("", response.info);
            this.setState({ ...this.state, loading: false });
            // this.props.enqueueSnackbar(response.msg, {
            //   variant: "warning"
            // });
          }
        });
    }
  };
  render() {
    return (
      <Container
        style={{ height: this.props.screenHeight }}
        selected={this.state.selected}
      >
        <ContentWrap>
          <Logo
            img={
              this.props.general.brand && this.props.general.brand.mobileLogoUrl
            }
          ></Logo>
          <ButtonSwitch
            handleChangeSelection={this.handleChangeSelection}
            isUpdate={this.state.isUpdate}
            selected={this.state.selected}
          ></ButtonSwitch>
          {(() => {
            if (this.state.selected === 0) {
              return (
                <React.Fragment>
                  <Textbox
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-user.png`
                    }
<<<<<<< HEAD
                    type={'text'}
                    placeholder={i18n.t('common.username')}
                    style={{ marginTop: '60px' }}
=======
                    type={"text"}
                    placeholder={i18n.t("common.username")}
                    style={{ marginTop: "60px" }}
>>>>>>> release/current
                    value={this.state.username}
                    maxLength="16"
                    onChange={this.handleUsernameChange}
                  ></Textbox>
                  <Textbox
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-unlock.png`
                    }
                    type={this.state.hidePassword ? "password" : "text"}
                    hidePassword={this.state.hidePassword}
<<<<<<< HEAD
                    placeholder={i18n.t('common.password')}
                    style={{ marginTop: '20px' }}
=======
                    placeholder={i18n.t("common.password")}
                    style={{ marginTop: "20px" }}
>>>>>>> release/current
                    password={true}
                    maxLength="20"
                    toggleShow={this.handleToggleShow}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  ></Textbox>
                  <RememberPassContainer>
                    <CustomCheck
                      style={{ fontSize: "30px" }}
                      icon={
                        <CircleUnchecked
                          style={{ color: "#404040", fontSize: "38px" }}
                        />
                      }
                      checkedIcon={
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            `/assets/images/wapp/icon-checked.png`
                          }
                          style={{ width: "40px" }}
                        />
                      }
                      checked={this.state.rememberMe}
                      onChange={this.handleRememberMeChange}
                    />
                    <RememberPassLabel>
<<<<<<< HEAD
                      {i18n.t('wap.login.rememberMe')}
=======
                      {i18n.t("wap.login.rememberMe")}
>>>>>>> release/current
                    </RememberPassLabel>
                  </RememberPassContainer>
                  <ForgotPassContainer onClick={this.handleForgotpasswordClick}>
                    <ForgotPassLabel>
<<<<<<< HEAD
                      {i18n.t('wap.login.forgetPass')}
=======
                      {i18n.t("wap.login.forgetPass")}
>>>>>>> release/current
                    </ForgotPassLabel>
                  </ForgotPassContainer>
                  <LoginActionContainer>
                    <ButtonWap
<<<<<<< HEAD
                      name={i18n.t('common.login')}
                      onClick={this.handleLoginClick}
                    ></ButtonWap>
                    <CustomWapButton
                      name={i18n.t('wap.login.browse')}
                      style={{ 'margin-top': '10px' }}
=======
                      name={i18n.t("common.login")}
                      onClick={this.handleLoginClick}
                    ></ButtonWap>
                    <CustomWapButton
                      name={i18n.t("wap.login.browse")}
                      style={{ "margin-top": "10px" }}
>>>>>>> release/current
                      onClick={this.handleBackToHomeClick}
                    ></CustomWapButton>
                  </LoginActionContainer>
                  <LanguageWrap>
                    {(() => {
                      return this.props.general.brandLanguage.map(
                        (lang, index) => {
                          return (
                            <React.Fragment>
                              <LanguageLink
<<<<<<< HEAD
                                selected={
                                  i18n.language === lang.culturecode
                                }
=======
                                selected={i18n.language === lang.culturecode}
>>>>>>> release/current
                                onClick={() => {
                                  window.location.href = `/${lang.culturecode}`;
                                }}
                              >
<<<<<<< HEAD
                                {i18n.t('lang.' + lang.culturecode)}
=======
                                {i18n.t("lang." + lang.culturecode)}
>>>>>>> release/current
                              </LanguageLink>

                              {this.props.general.brandLanguage.length - 1 !==
                              index ? (
                                <LanguageLink> | </LanguageLink>
                              ) : (
                                ""
                              )}
                            </React.Fragment>
                          );
                        }
                      );
                    })()}
                  </LanguageWrap>
                  {config.features.HaveDownloadFeature && (
                    <LanguageWrap onClick={this.handleGoDownloadPage}>
<<<<<<< HEAD
                      {i18n.t('wap.main.account.appDownload')}
=======
                      {i18n.t("wap.main.account.appDownload")}
>>>>>>> release/current
                    </LanguageWrap>
                  )}
                </React.Fragment>
              );
            } else if (this.state.selected === 1) {
              return (
                <React.Fragment>
                  <Textbox
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-user.png`
                    }
<<<<<<< HEAD
                    type={'text'}
                    placeholder={i18n.t('wap.register.username')}
                    style={{ marginTop: '60px' }}
                    maxLength='16'
=======
                    type={"text"}
                    placeholder={i18n.t("wap.register.username")}
                    style={{ marginTop: "60px" }}
                    maxLength="16"
>>>>>>> release/current
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                  ></Textbox>
                  <Textbox
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-unlock.png`
                    }
                    type={this.state.hidePassword ? "password" : "text"}
                    hidePassword={this.state.hidePassword}
<<<<<<< HEAD
                    placeholder={i18n.t('wap.register.password')}
                    style={{ marginTop: '20px' }}
=======
                    placeholder={i18n.t("wap.register.password")}
                    style={{ marginTop: "20px" }}
>>>>>>> release/current
                    password={true}
                    maxLength="20"
                    toggleShow={this.handleToggleShow}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  ></Textbox>
                  <Textbox
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-unlock.png`
                    }
                    type={this.state.hideConfirmPassword ? "password" : "text"}
                    hidePassword={this.state.hideConfirmPassword}
<<<<<<< HEAD
                    placeholder={i18n.t(
                      'wap.register.confirmPassword'
                    )}
                    style={{ marginTop: '20px' }}
=======
                    placeholder={i18n.t("wap.register.confirmPassword")}
                    style={{ marginTop: "20px" }}
>>>>>>> release/current
                    password={true}
                    maxLength="20"
                    toggleShow={this.handleToggleConfirmPasswordShow}
                    value={this.state.confirmPassword}
                    onChange={this.handleConfirmPasswordChange}
                  ></Textbox>
                  {!this.props.general.brand.hasInvitationCode && (
                    <Textbox
                      icon={
                        process.env.PUBLIC_URL +
                        `/assets/images/wapp/icon-promo.png`
                      }
<<<<<<< HEAD
                      type={'text'}
                      placeholder={i18n.t(
                        'wap.register.promoteCode'
                      )}
                      style={{ marginTop: '20px' }}
=======
                      type={"text"}
                      placeholder={i18n.t("wap.register.promoteCode")}
                      style={{ marginTop: "20px" }}
>>>>>>> release/current
                      value={this.state.promoId}
                      onChange={this.handlePromoCodeChange}
                      disabled={this.state.withPromo ? true : false}
                    ></Textbox>
                  )}

                  <RememberPassContainer>
                    <CustomCheck
                      style={{ fontSize: "30px" }}
                      icon={
                        <CircleUnchecked
                          style={{ color: "#404040", fontSize: "38px" }}
                        />
                      }
                      checkedIcon={
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            `/assets/images/wapp/icon-checked.png`
                          }
                          style={{ width: "40px" }}
                        />
                      }
                      checked={this.state.tnc}
                      onChange={this.handleTncClick}
                    />
<<<<<<< HEAD
                    <TNC>{i18n.t('web.register.contract')}</TNC>
                  </RememberPassContainer>
                  <ButtonWap
                    style={{ margin: '100px auto 0 auto' }}
                    name={i18n.t('common.register')}
=======
                    <TNC>{i18n.t("web.register.contract")}</TNC>
                  </RememberPassContainer>
                  <ButtonWap
                    style={{ margin: "100px auto 0 auto" }}
                    name={i18n.t("common.register")}
>>>>>>> release/current
                    disableButton={!this.state.tnc}
                    onClick={this.handleRegisterClick}
                  ></ButtonWap>
                </React.Fragment>
              );
            } else if (this.state.selected === 2) {
              return (
                <React.Fragment>
                  <Textbox
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-user.png`
                    }
<<<<<<< HEAD
                    type={'text'}
                    placeholder={i18n.t('wap.register.username')}
                    style={{ marginTop: '60px' }}
                    maxLength='32'
=======
                    type={"text"}
                    placeholder={i18n.t("wap.register.username")}
                    style={{ marginTop: "60px" }}
                    maxLength="32"
>>>>>>> release/current
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                  ></Textbox>

                  <Textbox
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-unlock.png`
                    }
                    type={this.state.hidePassword ? "password" : "text"}
                    hidePassword={this.state.hidePassword}
<<<<<<< HEAD
                    placeholder={i18n.t('wap.register.password')}
                    style={{ marginTop: '20px' }}
=======
                    placeholder={i18n.t("wap.register.password")}
                    style={{ marginTop: "20px" }}
>>>>>>> release/current
                    password={true}
                    maxLength="20"
                    toggleShow={this.handleToggleShow}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  ></Textbox>

                  <Select
<<<<<<< HEAD
                    type={'text'}
                    placeholder={i18n.t(
                      'forgotPassword.plsEnterPhoneNumber'
                    )}
=======
                    type={"text"}
                    placeholder={i18n.t("forgotPassword.plsEnterPhoneNumber")}
>>>>>>> release/current
                    selectValue={this.state.areaCode}
                    onSelectChange={this.handleAreaCodeChange}
                    value={this.state.phone}
                    onChange={this.handlePhoneChange}
                  ></Select>
                  <VerificationCode
                    value={this.state.code}
                    onChange={this.handleCodeChange}
                    countdown={this.state.countdown}
                    handleGetCodeClick={this.handleGetCodeClick}
                  ></VerificationCode>
                  <ButtonWap
<<<<<<< HEAD
                    style={{ margin: '100px auto 0 auto' }}
                    name={i18n.t('common.submit')}
=======
                    style={{ margin: "100px auto 0 auto" }}
                    name={i18n.t("common.submit")}
>>>>>>> release/current
                    onClick={this.handleActivationClick}
                  ></ButtonWap>
                </React.Fragment>
              );
            }
          })()}
        </ContentWrap>

        <Version>
          Version {process.env.REACT_APP_VERSION} (
          {process.env.REACT_APP_CUSTOM_NODE_ENV})
        </Version>
        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    screenHeight: state.ui.screenHeight,
    token: state.account.token,
    general: state.general,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch({ type: "close" });
    },
    accountLogin: (username, password) =>
      dispatch(accountAction.accountLogin(username, password)),
    getAccountInfo: (token) => dispatch(accountAction.getAccountInfo(token)),
    checkGame: () => dispatch(accountAction.checkGame()),
    getAccountProfile: (token, showVip) =>
      dispatch(accountAction.getAccountProfile(token, showVip)),
    register: (
      user_account,
      user_password,
      pay_password,
      mobile,
      recommend_code,
      mobile_code_id
    ) =>
      dispatch(
        accountAction.registerAccount(
          user_account,
          user_password,
          pay_password,
          mobile,
          recommend_code,
          mobile_code_id
        )
      ),
    getDepositChannel: () => dispatch(walletAction.getDepositChannel()),
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    getHomePageGameList: () => dispatch(gameAction.getHomePageGameList()),
    getInviteLink: () => dispatch(accountAction.getInviteLink()),
    getMessageList: (pages, limit) =>
      dispatch(inboxAction.getMessages(pages, limit, true, true)),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
