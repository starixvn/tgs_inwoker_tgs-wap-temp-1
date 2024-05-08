import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import ButtonSwitch from "./ButtonSwitch";

import Textbox from "./Textbox";
import Select from "./Select";
import VerificationCode from "./VerificationCode";
import { accountAction } from "../../../api-services/actions/accountAction";
import { generalAction } from "../../../api-services/actions/generalAction";
import { walletAction } from "../../../api-services/actions/walletAction";
import { gameAction } from "../../../api-services/actions/gameAction";
import { inboxAction } from "../../../api-services/actions/inboxAction";
import { AccountService } from "../../../api-services/services/AccountService";
import { GeneralService } from "../../../api-services/services/GeneralService";

import ButtonWap from "../../Share/ButtonWap";
import Loading from "../../Wap/Share/Loading";

import i18n from "../../../utils/i18n";

import config from "../../../config/config";
import { uiAction } from "../../../api-services/actions/uiAction";
import ErrorSwitcher from "../../../utils/ErrorSwitcher";
import VersionNumber from "../../../utils/versionnumber";
import Dropdown from "../component/dropdown";
import Checkbox from "../component/checkbox";
const Container = styled.div`
  z-index: 10;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: ${({ theme }) =>
    `url(` +
    process.env.PUBLIC_URL +
    `/assets/images/sunbet/loginbg.jpg)  no-repeat`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
  margin: 24px 0 0 55px;
  padding-bottom: 20px;
`;
const RememberPassLabel = styled.div`
  float: left;
  font-size: 28px;
  margin-top: 14px;
  margin-bottom: 14px;
`;

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

const DownloadButtonHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DownloadButton = styled(LanguageWrap)`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
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

const CustomWapButton = styled(ButtonWap)`
  background: transparent;
  border: solid 2px ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
`;

const BackButton = styled.div`
  font-size: 24px;
  width: 635px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 10px;
  font-weight: bold;
`;

const CustomInvitationSelect = styled.select`
  background: transparent;
  position: absolute;
  right: 85px;
  font-size: 25px;
  bottom: 25px;
  border: none;
  outline: none;
`;

const CustomWrapper = styled.div`
  position: relative;
`;

const LanguageLinkWrapper = styled.div`
  display: ${({ theme }) => (theme.new_languageUseDropdown ? "none" : "block")};
`;

const LanguageDropdownWrapper = styled.div`
  margin-top: 10px;
  display: ${({ theme }) => (theme.new_languageUseDropdown ? "block" : "none")};
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  background-color: black;
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/${icon}.svg`
    }) no-repeat center /
    contain;`;
  }};
`;

const TheThreeIcon = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 0 auto;
  width: 635px;

  .item {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3px;

    .icon {
      aspect-ratio: 1;
      width: 100%;
    }

    .title {
      color: #000;
      white-space: nowrap;
    }

    .subtitle {
      color: #000;
      font-size: 11px;
      opacity: 0.8;
    }
  }
`;

class Login extends Component {
  state = {
    selected: 0,
    isUpdate: false,
    hidePassword: true,
    hideConfirmPassword: true,
    hadSend:false,
    loginData:"",
    username: "",
    password: "",
    phone: "",
    areaCode: config.features.PhonePrefix,
    withPromo:
      config.affiliateId === "" &&
      localStorage.getItem("promotionId") === "" &&
      !localStorage.getItem("promotionId")
        ? false
        : true,
    promoId:
      config.affiliateId !== ""
        ? config.affiliateId
        : localStorage.getItem("promotionId"),

    promotionChannelId: localStorage.getItem("promotionChannelId"),
    withdrawalPassword: "",
    confirmWithdrawalPassword: "",

    confirmPassword: "",
    tnc: true,
    rememberMe: false,
    loading: false,

    code: "",
    countdown: 0,
    securityKey: "",

    //TGS-357
    upper: localStorage.getItem("upper"),
    promoteType:
      localStorage.getItem("invitationtype") === ""
        ? "a"
        : localStorage.getItem("invitationtype"),
    prefill:
      localStorage.getItem("upper") ||
      localStorage.getItem("promotionId") ||
      localStorage.getItem("invitationtype") !== ""
        ? true
        : false,
    fromCustomDomain: false,
    email: "",
  };

  componentDidMount() {
    const promotionId = this.props.match.params.promotionid;
    const promotionChannelId = this.props.match.params.promotionchannelid;

    if (this.props.general.brand.hasInvitationCode) {
      this.getInvitationCode();
    }

    if (!isNaN(promotionId) && !isNaN(promotionChannelId)) {
      GeneralService.AffiliateClick(promotionId, promotionChannelId);
    }

    if (this.props.token != null) {
      this.props.appHistory.replace("/main/home");
    } else {
      if (
        this.props.match.params.subid &&
        this.props.match.params.subid !== "" &&
        config.features.CustomBunnyAffiliate
      ) {
        this.handleChangeSelection(1);
        return;
      }
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
          default:
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
  getInvitationCode = () => {
    this.props.getInvitationCode().then((result) => {
      if (result.IsSuccess && result.data.invitationCode) {
        this.setState({
          ...this.state,
          promoteType: "a",
          promoId: result.data.invitationCode,
          prefill: true,
          fromCustomDomain: true,
        });
      }
    });
  };
  componentDidUpdate(preProps, prevState) {
    if (
      preProps.general.brand.hasInvitationCode !==
        this.props.general.brand.hasInvitationCode &&
      this.props.general.brand.hasInvitationCode == true
    ) {
      this.getInvitationCode();
    }
  }
  handleChangeSelection = (index) => {
    if (this.state.selected !== index) {
      console.log("set this.state.selected:");
      console.log(this.state.selected);
      this.setState({
        ...this.state,
        selected: index,
        isUpdate: true,
      });
    }
  };
  handleLoginSuccess = async (token, isOk=false) => {
    let urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("return_url")) {

    }
    var bankInfoAuthentication = null;
    await this.props.getAccountInfo().then((response) => {
      if (response.IsSuccess) {
        if(isOk){
          //this.props.appHistory.replace("/main/home");
          this.props.history.push({
            pathname: "/main/home",
            state: { forced: true },
          });
          return;
        }
        bankInfoAuthentication = response.data.bankinfoauthentication;
        if (
          response.data.registercompleted === false &&
          config.features.Register_ShowPhone &&
          config.features.ForcedVerification
        ) {
          if (
            config.features.Register_CustomFlow_IDR &&
            config.features.NavigateToAddCard
          ) {
            if (response.data.phone === null) {
              this.props.history.push({
                pathname: "/profile/phone",
                state: { forced: true },
              });
            } else if (response.data.email === null) {
              this.props.history.push({
                pathname: "/profile/email",
                state: { forced: true },
              });
            } else if (!response.data.registercompleted) {
              this.props.appHistory.replace("/card/add");
            }
          } else {
            this.props.history.push({
              pathname: "/profile/phone",
              state: { forced: true },
            });
          }
        } else {
          if (
            !config.features.Register_CustomFlow_IDR ||
            (config.features.Register_CustomFlow_IDR && bankInfoAuthentication)
          ) {
            this.props.getBalanceList();
            this.props.getMessageList(i18n.language, 1, 99);
            this.props.getBankCardList();
            this.props.getPromotion();
            this.props.getPromotionRouletteCount();
            this.props.getWithdrawalChannel();
          }
          if (this.state.rememberMe === true) {
            localStorage.setItem("remember", true);

            localStorage.setItem("username", this.state.username);
          } else {
            localStorage.removeItem("remember");

            localStorage.removeItem("username");
          }
          if (
            this.state.selected === 1 ||
            this.state.selected === 2 ||
            (config.features.Register_CustomFlow_IDR && !bankInfoAuthentication)
          ) {
            if (config.features.NavigateToAddCard) {
              if (response.data.phone === null) {
                this.props.history.push({
                  pathname: "/profile/phone",
                  state: { forced: true },
                });
              } else if (response.data.email === null) {
                this.props.history.push({
                  pathname: "/profile/email",
                  state: { forced: true },
                });
              } else if (!response.data.registercompleted) {
                this.props.appHistory.replace("/card/add");
              }
            } else {
              this.props.appHistory.replace("/main/home");
            }
          } else {
            this.props.appHistory.replace("/main/home");
          }
        }
      }
    });
  };
  handleBackToHomeClick = () => {
    this.props.appHistory.replace("/main/home");
  };
  handleLoginClick = () => {
    const username = this.state.username;
    const password = this.state.password;
    this.doLogin(username, password);
  };
  doLogin = (username, password) => {
    if (username === "") {
      this.props.alert("", i18n.t("web.login.errorMsg.emptyUsername"));
      return;
    }
    if (username === "") {
      this.props.alert("", i18n.t("web.login.errorMsg.emptyPassword"));
      return;
    }
    this.setState({ ...this.state, loading: true });
    this.props.accountLogin(username, password).then((result) => {
      if (result.IsSuccess) {
        this.handleLoginSuccess(result.data, true);
      } else {
        if (result.code === 210) {
          this.props.appHistory.push("/banned");
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
            this.props.alert("", i18n.t("common.msgInvalidUsername"));
            this.setState({
              ...this.state,

              loading: false,
            });
          }
        }
      }
    });
  };
  doLoginWithHp = async (
    username,
    password,
    phone,
    areacode,
    setPhoneDontCareDuplicate
  ) => {
    this.setState({ ...this.state, loading: true });
    const result = await this.props.accountLogin(username, password);
    if (result.IsSuccess) {
      if (setPhoneDontCareDuplicate) {
        await this.props
          .newRegister("SetPhoneDontCareDuplicate", {
            areacode: this.state.areaCode,
            phone: phone,
          })
          .then(async (response) => {
            this.handleLoginSuccess(result.data);
          });
      } else {
        this.props
          .newRegister("InitPhone", {
            input: "Init",
            data: {
              areacode: areacode,
              phone: phone,
            },
          })
          .then(async (response) => {
            if (response.IsSuccess) {
              this.props
                .newRegister("InitPhone", {
                  input: "Valid",
                  data: {
                    securitykey: response.data.stepResponse,
                    validatecode: "123456",
                  },
                })
                .then(async (response) => {
                  this.handleLoginSuccess(result.data);
                });
            } else {
              this.handleLoginSuccess(result.data);
            }
          });
      }
    }
  };
  performLoginWithPhoneAndEmail = async (
    username,
    password,
    phone,
    areacode,
    email,
    setPhoneDontCareDuplicate
  ) => {
    this.setState({ ...this.state, loading: true });
    const result = await this.props.accountLogin(username, password);
    if (result.IsSuccess) {
      if (setPhoneDontCareDuplicate) {
        await this.props
          .newRegister("SetPhoneDontCareDuplicate", {
            areacode: areacode,
            phone: phone,
          })
          .then(async (response) => {
            if (response.IsSuccess) {
              if (response.data.nextStepType === "SetEmailDontCareDuplicate")
                await this.props.newRegister("SetEmailDontCareDuplicate", {
                  email: email,
                });
            }
          });
      } else {
        await this.props
          .newRegister("InitPhone", {
            input: "Init",
            data: {
              areacode: areacode,
              phone: phone,
            },
          })
          .then(async (response) => {
            if (response.IsSuccess) {
              await this.props
                .newRegister("InitPhone", {
                  input: "Valid",
                  data: {
                    securitykey: response.data.stepResponse,
                    validatecode: "123456",
                  },
                })
                .then(async (response) => {
                  if (response.IsSuccess) {
                    await this.props
                      .newRegister("InitMail", {
                        input: "Init",
                        data: {
                          email: email,
                        },
                      })
                      .then(async (response) => {
                        if (response.IsSuccess) {
                          await this.props.newRegister("InitMail", {
                            input: "Valid",
                            data: {
                              securitykey: response.data.stepResponse,
                              validatecode: "123456",
                            },
                          });
                        }
                      });
                  }
                });
            }
          });
      }
      this.handleLoginSuccess(result.data);
    }
  };

  handleForgotpasswordClick = () => {
    this.props.appHistory.push("/forgot-password");
  };

  handleGoDownloadPage = () => {
    this.props.appHistory.push("/main/download");
  };
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

  handleUpperChange = (e) => {
    this.setState({
      ...this.state,
      upper: e.target.value,
    });
  };

  handleEmailChange = (e) => {
    this.setState({
      ...this.state,
      email: e.target.value,
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

  smsVerification = (securityKey, code) => {
    AccountService.NewRegister("InitPhone", {
      input: "Valid",
      data: {
        securitykey: securityKey,
        validatecode: code,
      },
    }).then(async (response) => {
      if (response.IsSuccess) {
        this.doLogin(this.state.username, this.state.password);
      } else {
        this.props.alert("", response.info);
      }
    });
  };

  handleActivationClick = async () => {
    const username = this.state.username;
    const password = this.state.password;
    const code = this.state.code;
    const securityKey = this.state.securityKey;

    var expr = /^[a-zA-Z0-9]{6,16}$/;
    if (!expr.test(username)) {
      this.props.alert("", i18n.t("common.msgRegisterUserNameInvalid"));
      return;
    }
    expr = /^.{6,20}$/;
    if (!expr.test(password)) {
      this.props.alert("", i18n.t("common.msgRegisterPassInvalid"));
      return;
    }

    if (config.features.SkipSMSVerification) {
      const result = await this.props.accountLogin(username, password);
      if (result.IsSuccess) {
        this.props.getAccountInfo();

        AccountService.NewRegister("InitPhone", {
          input: "Init",
          data: {
            areacode: this.state.areaCode,
            phone: this.state.phone,
          },
        }).then(async (response) => {
          if (response.IsSuccess) {
            this.smsVerification(securityKey, "123456");
          } else {
            this.props.alert("", response.info);
          }
        });
      }
    } else {
      var exprx = /^[a-zA-Z0-9]{6}$/;
      if (!exprx.test(code)) {
        this.props.alert("", i18n.t("common.msgEnterCode"));
        return;
      }
      this.smsVerification(securityKey, code);
    }
  };

  handleSwitchType = (e) => {
    this.setState({
      ...this.state,
      promoteType: e.target.value,
      upper: "",
      promoId: "",
    });
  };
  

  checkinfo = () => {
    const username = this.state.username;
    const password = this.state.password;
    const phone = this.state.phone;
    
    const areaCode = this.state.areaCode;
    const confirmPassword = this.state.confirmPassword;
    const email = this.state.email;
    
    const tnc = this.state.tnc;
    
    var expr = /^[a-zA-Z0-9]{6,16}$/;
    if (!expr.test(username)) {
      this.props.alert("", i18n.t("common.msgRegisterUserNameInvalid"));
      return false;
    }
    var expr = /^.{6,20}$/;
    if (!expr.test(password)) {
      this.props.alert("", i18n.t("common.msgRegisterPassInvalid"));
      
      return false;
    }
    
    
    var expr = new RegExp(
      `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
    );
    if (config.features.Register_ShowPhone) {
      if (!expr.test(phone)) {
        this.props.alert(
          "",
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
        );
        return false;
      }
    }
    var expr =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (config.features.Register_ShowEmail) {
      if (!expr.test(email)) {
        this.props.alert("", i18n.t("common.msgInvalidEmail"));
        return false;
      }
    }
    return true;
  };

  handleGetCodeClick = async () => {
    if(!this.checkinfo()){
      return;
    }
    const username = this.state.username;
    const password = this.state.password;
    const countdown = this.state.countdown;
    const areaCode = this.state.areaCode;
    const phone = this.state.phone;
    const confirmPassword = this.state.confirmPassword;
    const areacode = this.state.areaCode;
    var result = null;
    
    if (password !== confirmPassword) {
      this.props.alert("", i18n.t("common.msgRegisterPassMatchInvalid"));
      return;
    }
    if (countdown <= 0) {
      this.props
        .newRegister("CreatePlayer", {
          username: username,
          pwd: password,
          upper: this.state.upper,
          invitationcode: this.state.promoId,
        })
        .then(async (response) => {
          this.props.accountLogin(username, password).then((result) => {
            if (result !== null && result.IsSuccess) {
              this.setState({
                ...this.state,
                hadSend: true,
                loginData: result.data
              });
              AccountService.NewRegister("InitPhone", {
                input: "Init",
                data: {
                  areacode: areacode,
                  phone: phone,
                },
              }).then(async (response) => {
                if (response.IsSuccess) {
                  this.props.alert("", i18n.t("common.msgTokenSent"));
                  this.setState({
                    ...this.state,
                    countdown: 60,
                    securityKey: response.data.stepResponse,
                  });
                  this.checkCountdown();
                } else {
                  this.props.alert("", response.info);
                }
              });
            }
          });
        });
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
  
  performNewRegister = async () => {
    if(!this.checkinfo()){
      return;
    }
  
    const username = this.state.username;
    const password = this.state.password;
    const countdown = this.state.countdown;
    const areaCode = this.state.areaCode;
    const phone = this.state.phone;
    const confirmPassword = this.state.confirmPassword;
    const tnc = this.state.tnc;
    const email = this.state.email;
    
    if(this.state.code===""){
      this.props.alert("", i18n.t("common.msgEnterCode"));
      return;
    }
    if(!this.state.hadSend){
      this.props.alert("", i18n.t("common.msgInvalidPhoneCode"));
      return;
    }
    console.log("临时测试");
    await this.handleLoginSuccess(this.state.loginData, true);
    return;
    
    if (tnc) {
      this.setState({ ...this.state, loading: true });
      //--- from web ---
      AccountService.NewRegister("InitPhone", {
        input: "Valid",
        data: {
          securitykey: this.state.securityKey,
          validatecode: this.state.code,
        },
      }).then(async (response) => {
        if (response.IsSuccess) {
          await this.handleLoginSuccess(this.state.loginData, true);
        } else {
          this.props.alert("", response.info);
        }
        this.setState({ ...this.state, loading: false });
      });
    }else{
      this.props.alert("", i18n.t("common.msgRegisterTermAndCondition"));
    }
  };

  render() {
    const performChangeLanguage = (language) => {
      i18n.changeLanguage(language);
      this.props.appHistory.push(`/${language}`);
      this.props.getBanner();
      this.props.getMarquee(language);
      this.props.getAnnouncement(language);
      GeneralService.GetLocalization().then((response) => {
        if (response.IsSuccess) {
          ErrorSwitcher.setTranslation(response.data);
        }
      });
    };

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

          {this.state.selected === 0 && (
            <TheThreeIcon>
              <div className="item">
                <img
                  className="icon"
                  src={process.env.PUBLIC_URL + "/assets/images/sponsors/1.png"}
                  alt=""
                />
                <div className="title">{i18n.t("astonvilla")}</div>
                <div className="subtitle">{i18n.t("officialpartners")}</div>
              </div>
              <div className="item">
                <img
                  className="icon"
                  src={process.env.PUBLIC_URL + "/assets/images/sponsors/2.png"}
                  alt=""
                />
                <div className="title">{i18n.t("laclipper")}</div>
                <div className="subtitle">{i18n.t("officialpartners")}</div>
              </div>
              <div className="item">
                <img
                  className="icon"
                  src={process.env.PUBLIC_URL + "/assets/images/sponsors/3.png"}
                  alt=""
                />
                <div className="title">{i18n.t("sscnapoli")}</div>
                <div className="subtitle">{i18n.t("officialpartners")}</div>
              </div>
            </TheThreeIcon>
          )}
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
                    type={"text"}
                    placeholder={i18n.t("common.username")}
                    style={{ marginTop: "20px" }}
                    value={this.state.username}
                    maxLength="16"
                    onChange={this.handleUsernameChange}
                  ></Textbox>
                  <Textbox
                    type={this.state.hidePassword ? "password" : "text"}
                    hidePassword={this.state.hidePassword}
                    placeholder={i18n.t("common.password")}
                    style={{ marginTop: "20px" }}
                    password={true}
                    toggleShow={this.handleToggleShow}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  ></Textbox>
                  <RememberPassContainer>
                    <Checkbox
                      checked={this.state.rememberMe}
                      onChange={this.handleRememberMeChange}
                      label={i18n.t("wap.login.rememberMe")}
                      center
                    />
                  </RememberPassContainer>
                  <ForgotPassContainer onClick={this.handleForgotpasswordClick}>
                    <ForgotPassLabel>
                      {i18n.t("wap.login.forgetPass")}
                    </ForgotPassLabel>
                  </ForgotPassContainer>
                  <LoginActionContainer>
                    <ButtonWap
                      name={i18n.t("common.login")}
                      onClick={this.handleLoginClick}
                    ></ButtonWap>
                    <BackButton onClick={this.handleBackToHomeClick}>
                      {i18n.t("wap.login.browse")}
                    </BackButton>
                  </LoginActionContainer>
                  <LanguageLinkWrapper>
                    <LanguageWrap>
                      {(() => {
                        return this.props.general.brandLanguage.map(
                          (lang, index) => {
                            return (
                              <React.Fragment>
                                <LanguageLink
                                  selected={i18n.language === lang.culturecode}
                                  onClick={() => {
                                    performChangeLanguage(lang.culturecode);
                                  }}
                                >
                                  {i18n.t("lang." + lang.culturecode)}
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
                  </LanguageLinkWrapper>
                  <LanguageDropdownWrapper>
                    <Dropdown
                      value={i18n.language}
                      onChange={performChangeLanguage}
                      background="rgba(255,255,255,0.2)"
                    >
                      {this.props.general.brandLanguage.map((data, index) => {
                        return (
                          <option value={data.culturecode}>
                            {i18n.t("lang." + data.culturecode)}
                          </option>
                        );
                      })}
                    </Dropdown>
                  </LanguageDropdownWrapper>
                  {config.features.HaveDownloadFeature && (
                    <DownloadButtonHolder>
                      <DownloadButton onClick={this.handleGoDownloadPage}>
                        <Icon icon="icon-download" />
                        {i18n.t("wap.main.account.appDownload")}
                      </DownloadButton>
                    </DownloadButtonHolder>
                  )}
                </React.Fragment>
              );
            } else if (this.state.selected === 1 || this.state.selected === 2) {
              return (
                <React.Fragment>
                  <Textbox
                    type={"text"}
                    placeholder={i18n.t("wap.register.username")}
                    style={{ marginTop: "60px" }}
                    maxLength="16"
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                  ></Textbox>

                  <Textbox
                    type={this.state.hidePassword ? "password" : "text"}
                    hidePassword={this.state.hidePassword}
                    placeholder={i18n.t("wap.register.password")}
                    style={{ marginTop: "20px" }}
                    password={true}
                    maxLength="20"
                    toggleShow={this.handleToggleShow}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  ></Textbox>
                  <Textbox
                    type={this.state.hideConfirmPassword ? "password" : "text"}
                    hidePassword={this.state.hideConfirmPassword}
                    placeholder={i18n.t("wap.register.confirmPassword")}
                    style={{ marginTop: "20px" }}
                    password={true}
                    maxLength="20"
                    toggleShow={this.handleToggleConfirmPasswordShow}
                    value={this.state.confirmPassword}
                    onChange={this.handleConfirmPasswordChange}
                  ></Textbox>

         

                  {config.features.Register_ShowEmail && (
                    <CustomWrapper>
                      <Textbox
                        icon={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/icon-email.png`
                        }
                        type={"text"}
                        placeholder={i18n.t("wap.register.email")}
                        style={{ marginTop: "20px" }}
                        maxLength="50"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                      ></Textbox>
                    </CustomWrapper>
                  )}

                  {!(
                    config.features.Register_HideInvitation &&
                    this.state.fromCustomDomain
                  ) && (
                    <CustomWrapper>
                      <Textbox
                        type={"text"}
                        placeholder={i18n.t("wap.register.promoteCode")}
                        style={{ marginTop: "20px" }}
                        value={
                          this.state.promoteType === "a"
                            ? this.state.promoId
                            : this.state.upper
                        }
                        onChange={
                          this.state.promoteType === "a"
                            ? this.handlePromoCodeChange
                            : this.handleUpperChange
                        }
                        disabled={this.state.prefill}
                      ></Textbox>
                      {this.props.general.haveAffiliate && (
                        <CustomInvitationSelect
                          disabled={this.state.prefill}
                          value={this.state.promoteType}
                          selected={this.state.promoteType}
                          onChange={this.handleSwitchType}
                        >
                          <option value="a">{i18n.t("usertype.agent")}</option>
                          <option value="p">{i18n.t("usertype.player")}</option>
                        </CustomInvitationSelect>
                      )}
                    </CustomWrapper>
                  )}
                  {config.features.Register_ShowPhone && (
                    <CustomWrapper>
                      <Select
                        type={"text"}
                        placeholder={i18n.t(
                          "forgotPassword.plsEnterPhoneNumber"
                        )}
                        selectValue={this.state.areaCode}
                        onSelectChange={this.handleAreaCodeChange}
                        value={this.state.phone}
                        maxLength={config.features.MAX_PHONE_LENGTH || 10}
                        onChange={this.handlePhoneChange}
                      ></Select>
                    </CustomWrapper>
                  )}
                  {!config.features.SkipSMSVerification && (
                    <>
                      <VerificationCode
                        value={this.state.code}
                        onChange={this.handleCodeChange}
                        countdown={this.state.countdown}
                        placeholder={i18n.t("common.msgEnterCode")}
                        handleGetCodeClick={this.handleGetCodeClick}
                      ></VerificationCode>
                    </>
                  )}

                  <RememberPassContainer style={{ width: 635 }}>
                    <Checkbox
                      checked={this.state.tnc}
                      onChange={this.handleTncClick}
                      label={i18n.t("web.register.contract")}
                    />
                  </RememberPassContainer>
                  
                  <ButtonWap
                    style={{ margin: "100px auto 0 auto" }}
                    name={
                      config.features.Register_CustomFlow_IDR
                        ? i18n.t("common.nextStep")
                        : i18n.t("common.register")
                    }
                    onClick={this.performNewRegister}
                    disableButton={!this.state.tnc}
                  ></ButtonWap>
                </React.Fragment>
              );
            } else if ( false && this.state.selected === 2) {
              return (
                <React.Fragment>
                  <Select
                    type={"text"}
                    placeholder={i18n.t("forgotPassword.plsEnterPhoneNumber")}
                    selectValue={this.state.areaCode}
                    onSelectChange={this.handleAreaCodeChange}
                    value={this.state.phone}
                    onChange={this.handlePhoneChange}
                    leaveGap={config.features.SkipSMSVerification}
                  ></Select>
                  {!config.features.SkipSMSVerification && (
                    <>
                      <VerificationCode
                        value={this.state.code}
                        onChange={this.handleCodeChange}
                        countdown={this.state.countdown}
                        placeholder={i18n.t("common.msgEnterCode")}
                        handleGetCodeClick={this.handleGetCodeClick}
                      ></VerificationCode>
                    </>
                  )}
                  <ButtonWap
                    style={{ margin: "100px auto 0 auto" }}
                    name={i18n.t("common.submit")}
                    onClick={this.handleActivationClick}
                  ></ButtonWap>
                </React.Fragment>
              );
            }
          })()}
        </ContentWrap>

        <Version>
          Version <VersionNumber />
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
    mobilePrefix: state.general.mobilePrefix,
    general: state.general,
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBanner: () => dispatch(generalAction.getBanner()),
    getMarquee: (language) => dispatch(uiAction.getMarquee(language)),
    getAnnouncement: (language) => dispatch(uiAction.getAnnouncement(language)),
    getInvitationCode: () => dispatch(generalAction.getInvitationCode()),
    closeModal: () => {
      dispatch({ type: "close" });
    },
    accountLogin: (username, password) =>
      dispatch(accountAction.accountLogin(username, password)),
    getAccountInfo: (token) => dispatch(accountAction.getAccountInfo(token)),
    checkGame: () => dispatch(accountAction.checkGame()),
    getAccountProfile: (token, showVip) =>
      dispatch(accountAction.getAccountProfile(token, showVip)),
    register: (username, pwd, confirmpwd, invitationcode, upper) =>
      dispatch(
        accountAction.registerAccount(
          username,
          pwd,
          confirmpwd,
          invitationcode,
          upper
        )
      ),
    getDepositChannel: () => dispatch(walletAction.getDepositChannel()),
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    getHomePageGameList: () => dispatch(gameAction.getHomePageGameList()),
    getInviteLink: () => dispatch(accountAction.getInviteLink()),
    getMessageList: (language, pages, limit) =>
      dispatch(inboxAction.getMessages(language, pages, limit, true, true)),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
    getWithdrawalChannel: () => {
      dispatch(walletAction.getWithdrawalChannel());
    },
    getPromotion: () => dispatch(generalAction.getPromotion()),
    newRegister: (type, input) =>
      dispatch(accountAction.newRegister(type, input)),
    getPromotionRouletteCount: () =>
      dispatch(generalAction.getPromotionRouletteCount()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
