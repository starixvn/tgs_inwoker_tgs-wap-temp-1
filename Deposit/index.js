import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { walletAction } from "../../../api-services/actions/walletAction";
import { generalAction } from "../../../api-services/actions/generalAction";
import { WalletService } from "../../../api-services/services/WalletService";
import {
  RESET_WALLETRESULT,
  WALLET_HIDEMESSAGE,
} from "../../../api-services/constant/actionType";
import { withRouter } from "react-router-dom";
import Common from "../../../utils/Common";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Header from "../Share/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "react-lazy-load-image-component/src/effects/blur.css";
import Textbox from "../../Wap/Share/Textbox";
import Button from "../../Wap/Share/Button";

import Modal from "@material-ui/core/Dialog";
import Loading from "../../Wap/Share/Loading";

import i18n from "../../../utils/i18n";
import { Grid } from "@material-ui/core";

import Details from "./Details";
import Manual from "./Manual";
import DetailsManual from "./DetailsManual";
import config from "../../../config/config";
import PopupAnnouncement from "../../Share/PopupAnnouncement";
import copy from "copy-to-clipboard";

const UnderConstructionWrap = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/underconstruction.png`})
    no-repeat center 50px #fff;
`;
const DescLabel = styled.div`
  margin: 330px auto 0 auto;
  text-align: center;
  font-size: 30px;
`;
const Container = styled.div`
  padding-top: 85px;
`;
const BalanceLabel = styled.div`
  float: right;
  margin: 26px 20px 0 0;

  font-size: 30px;
  font-weight: 600;

  text-align: right;
  color: #fde73f;
`;

const StyledAppBar = withStyles({
  root: {
    top: "89px",

    backgroundColor: "#f1f1f1",
    boxShadow: "none",
  },
})(AppBar);

const StyledModalPopup = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "600px",
    maxWidth: "690px",

    display: "block",
  },
}))(Modal);

const CustomSelect = withStyles((theme) => ({
  root: {
    "&:focus": {
      border: "none",
      backgroundColor: "#fff",
    },
    "&:active": {
      border: "none",
      backgroundColor: "#fff",
    },
  },
  select: {
    padding: "18.5px 0px",
    "&:focus": {
      border: "none",
      backgroundColor: "#fff",
    },
    "&:active": {
      border: "none",
      backgroundColor: "#fff",
    },
    "&:disabled": {
      color: "#c3c3c3",
    },
  },
}))(Select);
const CustomText = styled.div`
  width: 700px;
  // height: 170px;

  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px 20px 10px 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 3px;
  color: #212e31;
`;
const CustomFormControl = withStyles((theme) => ({
  root: {
    margin: "10px 0 0 0",
    width: "640px",
    height: "78px",
    border: "none",
    fontSize: "28px",
    "& fieldset": {
      border: "none",
    },
  },
}))(FormControl);

const DialoTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 0 auto;
  display: table;
  color: #4a4a4a;
`;
const DialoMessage = styled.div`
  font-size: 26px;
  margin: 30px 45px;
  color: #4a4a4a;
  line-height: 1.8em;
  text-align: center;
`;

const ButtonConfirm = styled.div`
  width: 250px;
  height: 90px;
  border-radius: 20px;

  font-size: 34px;

  text-align: center;

  padding-top: 24px;

  margin: 10px auto;
  background-image: linear-gradient(to top, ${({ theme }) =>
    theme.primaryGradient},
      ${({ theme }) => theme.primary}));
  color: #ffffff;
`;

const TransferContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;
const TransferLabel = styled.div`
  color: #747474;
  font-size: 28px;
  float: left;
  font-weight: bold;
`;
const TransferValue = styled.div`
  color: #747474;
  font-size: 28px;
  float: left;
  margin-left: 10px;
`;

const LimitLabel = styled.span`
  color: #747474;
`;

const LimitAmount = styled.span`
  color: #c0252d;
`;
const ExchangeRateContainer = styled.div`
  margin: 20px auto;
  font-size: 28px;
  padding: 0px 20px 20px 48px;
`;

const Remark = styled.div`
  font-size: 20px;
  padding: 0px 50px;
  color: ${({ theme }) => theme.secondary};
  opacity: 0.75;
`;

const QRCodeImg = styled.img`
  display: block;
  margin-top: 10px;
  width: 200px;
  height: 200px;
`;

const CopyIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-left: 20px;
  background-color: ${({ theme }) => theme.primary};
  mask: url(${process.env.PUBLIC_URL + `/assets/images/wapp/copy.png`})
    no-repeat center / contain;
  cursor: pointer;
`;

const HintText = styled.div`
  color: ${({ theme }) => theme.primary};
`;

class Deposit extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      selectedPaymentIndex: 0,
      selectedMethodIndex: 0,

      selectedChannelIndex: 0,
      depositPromotion: this.props.match.params.promotionid,
      amount: "",
      exchangeRate: { buyprice: 0, sellprice: 0 },
      step: 1,
      upload: "",

      isMaintenance: false,

      //to handle access via URL
      paymentId: this.props.match.params.paymentId,
      depositDetail: "",
      channelname: "",
      methodcode: "",
      bankaccount: "",
      disabled: false,
      openAnnouncement: config.features.DepositNotification,
    };
    this.state = { ...this.initialState, name: "", account: "" };
  }
  bankInfo = null;

  componentDidMount() {
    if (this.props.token != null) {
      this.props.getDepositMethod(i18n.language);
      this.props.getPlayerPromotionList(i18n.language);
      if (this.state.paymentId) {
        WalletService.PerformGetManualDepositDetail(this.state.paymentId).then(
          (e) => {
            if (e.IsSuccess) {
              this.setState({
                step: 5,
                depositDetail: e.data,
                amount: e.data.amount,
                channelname: e.data.bankname,
                methodcode: e.data.methodname,
                bankaccount: e.data.bankaccount,
              });
            }
          }
        );
      }
      this.countDownInterval = setInterval(() => {
        this.props.getDepositMethod(i18n.language); // call api every 30 mins
      }, 30 * 60 * 1000);
    } else {
      this.props.appHistory.replace("/" + i18n.language + "/");
    }
  }
  componentDidUpdate(preProps, preState) {
    if (config.features.Deposit_AutofillFirstCard) {
      if (preProps.wallet !== this.props.wallet) {
        this.setState({
          account:
            preState.account === ""
              ? this.props.wallet.bankCardList.length > 0
                ? this.props.wallet.bankCardList[0].detail.bankAccount ||
                  this.props.wallet.bankCardList[0].detail.address ||
                  this.props.wallet.bankCardList[0].detail.phone
                : ""
              : preState.account,
          name:
            preState.account === ""
              ? this.props.account.info.member_name !== ""
                ? this.props.account.info.member_name
                : ""
              : preState.name,
        });
      }
    }
    if (
      preProps.wallet.depositResult != this.props.wallet.depositResult &&
      this.props.wallet.depositResult !== null
    ) {
      if (this.props.wallet.depositResult.IsSuccess) {
        var payment =
          this.props.wallet.depositTypeList[this.state.selectedPaymentIndex];

        this.setState({
          ...this.state,
          step: payment.paymentcode.toUpperCase() === "MANUAL" ? 2 : 3,
          loading: false,
        });
      } else {
        // if (this.props.wallet.depositResult.code === 407) {
        //   this.props.alert(
        //     '',
        //     i18n.t('deposit.msgFailedJoinPromotion')
        //   )
        // } else if (this.props.wallet.depositResult.code === 900) {
        //   this.props.alert('', i18n.t('common.msgRequestFailed'))
        // } else {
        //   this.props.alert('', this.props.wallet.depositResult.info)
        // }
        this.props.alert("", this.props.wallet.depositResult.info);
        this.setState({ ...this.state, loading: false });
      }
    }
    if (
      preProps.wallet.depositUploadResult !=
        this.props.wallet.depositUploadResult &&
      this.props.wallet.depositUploadResult !== null
    ) {
      if (this.props.wallet.depositUploadResult.IsSuccess) {
        this.setState({ ...this.initialState });
        this.props.alert("", i18n.t("deposit.uploadSuccess"));
      } else {
        this.props.alert("", this.props.wallet.depositUploadResult.info);
        this.setState({ ...this.state, loading: false });
      }
    }
    if (
      preState.selectedPaymentIndex !== this.state.selectedPaymentIndex ||
      preState.selectedMethodIndex !== this.state.selectedMethodIndex ||
      preState.selectedChannelIndex !== this.state.selectedChannelIndex
    ) {
      if (
        this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
          .method[this.state.selectedMethodIndex].methodcode === "Crypto"
      ) {
        if (
          this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
            .paymentcode === "LeePay"
        ) {
          WalletService.GetLeePayExchangeRate(
            this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
              .method[this.state.selectedMethodIndex].channel[
              this.state.selectedChannelIndex
            ].id
          ).then((response) => {
            if (response.IsSuccess) {
              this.setState({ ...this.state, exchangeRate: response.data });
            } else {
              this.setState({
                ...this.state,
                exchangeRate: this.initialState.exchangeRate,
              });
            }
          });
        } else {
          WalletService.GetUmPayExchangeRate(
            this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
              .method[this.state.selectedMethodIndex].channel[
              this.state.selectedChannelIndex
            ].id
          ).then((response) => {
            if (response.IsSuccess) {
              this.setState({
                ...this.state,
                exchangeRate: response.data.rate,
              });
            } else {
              this.setState({
                ...this.state,
                exchangeRate: this.initialState.exchangeRate,
              });
            }
          });
        }
      } else {
        this.setState({
          ...this.state,
          exchangeRate: this.initialState.exchangeRate,
        });
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.countDownInterval);
  }
  handleRestartClick = (e) => {
    this.setState({ ...this.initialState });
    this.props.resetDeposit();
  };
  // CancelDeposit(token, id) {
  //   return WalletService.CancelDeposit(token, id);
  // }

  // handleBankClick = (item) => {
  //   this.setState({
  //     ...this.state,
  //     selectedBank: item,
  //     bankOpen: false,
  //   });
  // };

  // handleDepositClick = (e) => {
  //   if (this.state.selectedType.id === 0) {
  //     // manual deposit
  //     //bankId, channelId, amount, username
  //     this.props.doManualDeposit(
  //       this.bankInfo.id,
  //       this.state.selectedChannel.id,
  //       this.state.depositAmount,
  //       this.state.username
  //     );
  //   } else {
  //     this.props.doDeposit(
  //       this.state.depositAmount,
  //       this.state.selectedType.id,
  //       this.state.selectedChannel ? this.state.selectedChannel.id : ""
  //     );
  //   }
  // };

  // handleTunnelChange = (e) => {
  //   var selectedChannel = this.state.selectedType.channel.filter(
  //     (item) => item.id == e.target.value
  //   )[0];

  //   this.setState({
  //     ...this.state,
  //     selectedChannel: selectedChannel,
  //   });
  // };
  handleAmountChange = (e) => {
    this.setState({
      ...this.state,
      amount: e.target.value.replace(/,/g, ""),
    });
  };

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };
  // handleChangeTab = (e, newValue) => {

  //   this.setState({
  //     ...this.state,
  //     selectedType: newValue,
  //     selectedChannel: newValue.channel[0],
  //   });
  // };

  //newly declared function - START

  // handleChangeManualDepositMethod = (value) => {
  //   this.setState({
  //     ...this.state,
  //     methodCode: value,
  //   });
  // };

  // handleChangePaymentOption = (value) => {
  //   this.setState({
  //     ...this.state,
  //     paymentId: value,
  //   });
  // };

  uploadImage = (e) => {
    this.setState({
      ...this.state,
      upload: e.target.files[0],
    });
  };

  handleDepositClick = () => {
    this.setState({ ...this.state, disabled: true });
    var payment =
      this.props.wallet.depositTypeList[this.state.selectedPaymentIndex];
    var method = payment.method[this.state.selectedMethodIndex];

    var channel = method.channel[this.state.selectedChannelIndex];

    const depositMethodSwitcher = (method) => {
      switch (method) {
        case "banktransfer":
          return "bank";
        case "crypto":
          return "crypto";
        case "thirdparty":
          return "thirdparty";
        default:
          return "bank";
      }
    };

    if (payment.paymentcode.toUpperCase() === "MANUAL") {
      // handle manual deposit
      if (method.methodcode === "BankTransfer") {
        this.props.doBankDeposit(
          this.state.name,
          this.state.account,
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion
        );
      }
      if (method.methodcode === "FPS") {
        if (config.features.Deposit_FPSWithName) {
          this.props.doFPSDepositWithName(
            this.state.name,
            this.state.account,
            this.state.amount.replace(/,/g, ""),
            channel.id,
            this.state.depositPromotion
          );
        } else {
          this.props.doFPSDeposit(
            this.state.account,
            this.state.amount.replace(/,/g, ""),
            channel.id,
            this.state.depositPromotion
          );
        }
      }
      if (method.methodcode === "Usdt") {
        this.props.doUsdtDeposit(
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion
        );
      }
      if (method.methodcode === "ThirdParty") {
        this.props.doThirdPartyDeposit(
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion
        );
      }
    } else {
      this.props.doBankDeposit2(
        this.state.amount.replace(/,/g, ""),
        channel.id,
        this.state.depositPromotion,
        payment.paymentcode,
        depositMethodSwitcher(method.methodcode.toLowerCase())
      );

      //  if (method.methodcode === "Crypto") {
      //    this.props.doCryptoDeposit(
      //      this.state.amount.replace(/,/g, ""),
      //      channel.id,
      //      this.state.depositPromotion,
      //      payment.paymentcode
      //    );
      //  } else {
      //    this.props.doBankDeposit2(
      //      this.state.amount.replace(/,/g, ""),
      //      channel.id,
      //      this.state.depositPromotion,
      //      payment.paymentcode
      //    );
      //  }
    }

    setTimeout(() => {
      this.setState({ ...this.state, disabled: false });
    }, 1000);
  };

  changeValue = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };
  handlePaymentChange = (e, value) => {
    if (this.state.step === 1) {
      this.setState({
        ...this.state,
        selectedMethodIndex: 0,

        selectedChannelIndex: 0,
        selectedPaymentIndex: value,
      });
    }
  };
  performUploadImage = (file) => {
    this.props.doUploadDepositProof(
      this.props.wallet.depositResult
        ? this.props.wallet.depositResult.data
        : this.state.paymentId,
      file
    );
  };

  render() {
    const performCopy = (content) => {
      this.props.alert("", i18n.t("affiliate.copied"));

      copy(content);
    };

    const isUsdt =
      this.props.wallet.depositTypeList.length > 0 &&
      this.props.wallet.depositTypeList[this.state.selectedPaymentIndex].method[
        this.state.selectedMethodIndex
      ].methodcode.toUpperCase();

    const CopyFeature = ({ copyContent }) => {
      return (
        <CopyIcon
          onClick={() => {
            performCopy(copyContent);
          }}
        />
      );
    };

    console.log(this.props.wallet.depositTypeList);
    const switchView = (view) => {
      switch (view) {
        case 1:
          return (
            <React.Fragment>
              {this.props.wallet.depositTypeList &&
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].paymentcode === "ZeroNineNinePay" && (
                  <CustomText style={{ paddingTop: 10 }}>
                    <CustomLabel>
                      <HintText>{i18n.t("hint._099")}</HintText>
                    </CustomLabel>
                  </CustomText>
                )}
              <CustomText>
                <CustomLabel>
                  {i18n.t("deposit.msgPlsSelectPayment")}
                </CustomLabel>
                <CustomFormControl variant="outlined">
                  <CustomSelect
                    native
                    id="customSelect"
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                      color: "#d09f58",
                    }}
                    value={this.state.selectedMethodIndex}
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        selectedChannelIndex: 0,
                        selectedMethodIndex: e.target.value,
                      });
                    }}
                  >
                    <option value={""} disabled>
                      {i18n.t("deposit.msgPlsSelectPayment")}
                    </option>
                    {this.props.wallet.depositTypeList.length > 0 &&
                      this.props.wallet.depositTypeList[
                        this.state.selectedPaymentIndex
                      ].method.map((item, index) => {
                        return (
                          <option value={index}>
                            {i18n.t(item.methodcode)}
                          </option>
                        );
                      })}
                  </CustomSelect>
                </CustomFormControl>
              </CustomText>
              <CustomText>
                <CustomLabel>
                  {i18n.t("deposit.msgPlsSelectMethod")}
                </CustomLabel>
                <CustomFormControl variant="outlined">
                  <CustomSelect
                    native
                    id="customSelect"
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                      color: "#d09f58",
                    }}
                    value={this.state.selectedChannelIndex}
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        selectedChannelIndex: e.target.value,
                      });
                    }}
                  >
                    {this.props.wallet.depositTypeList.length > 0 &&
                      this.props.wallet.depositTypeList[
                        this.state.selectedPaymentIndex
                      ].method[this.state.selectedMethodIndex].channel.map(
                        (item, index) => {
                          return (
                            <option value={index}>{item.channelname}</option>
                          );
                        }
                      )}
                  </CustomSelect>
                </CustomFormControl>
              </CustomText>
              {(() => {
                if (
                  this.props.wallet.depositTypeList[
                    this.state.selectedPaymentIndex
                  ].paymentcode.toUpperCase() === "MANUAL"
                ) {
                  var channelExtend =
                    this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ].method[this.state.selectedMethodIndex].channel[
                      this.state.selectedChannelIndex
                    ].extended;
                  if (
                    this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ].method[
                      this.state.selectedMethodIndex
                    ].methodcode.toUpperCase() === "THIRDPARTY"
                  ) {
                    return (
                      <CustomText>
                        <CustomLabel>
                          {i18n.t("deposit.transferAccount")}
                        </CustomLabel>
                        <QRCodeImg src={channelExtend.qrCodeFileUrl} />
                      </CustomText>
                    );
                  } else {
                    return (
                      <CustomText>
                        <CustomLabel>
                          {i18n.t("deposit.transferAccount")}
                        </CustomLabel>
                        {channelExtend.qrCodeFileUrl && (
                          <QRCodeImg src={channelExtend.qrCodeFileUrl} />
                        )}
                        {channelExtend.logo && (
                          <QRCodeImg src={channelExtend.logo} />
                        )}
                        {channelExtend.qrCode && (
                          <QRCodeImg src={channelExtend.qrCode} />
                        )}
                        {channelExtend.address && (
                          <TransferContainer>
                            <TransferLabel>
                              {i18n.t("deposit.address")}:
                            </TransferLabel>
                            <TransferValue>
                              {channelExtend.address}
                            </TransferValue>
                            <CopyFeature copyContent={channelExtend.address} />
                          </TransferContainer>
                        )}
                        {channelExtend.name && (
                          <TransferContainer>
                            <TransferLabel>
                              {i18n.t("deposit.accName")}:
                            </TransferLabel>
                            <TransferValue>{channelExtend.name}</TransferValue>
                            <CopyFeature copyContent={channelExtend.name} />
                          </TransferContainer>
                        )}
                        {channelExtend.bankAccount && (
                          <TransferContainer>
                            <TransferLabel>
                              {i18n.t("deposit.cardNum")}:
                            </TransferLabel>
                            <TransferValue>
                              {channelExtend.bankAccount}
                            </TransferValue>
                            <CopyFeature
                              copyContent={channelExtend.bankAccount}
                            />
                          </TransferContainer>
                        )}
                        {channelExtend.phone && (
                          <TransferContainer>
                            <TransferLabel>
                              {i18n.t("deposit.phone")}:
                            </TransferLabel>
                            <TransferValue>{channelExtend.phone}</TransferValue>
                            <CopyFeature copyContent={channelExtend.phone} />
                          </TransferContainer>
                        )}
                        {channelExtend.email && (
                          <TransferContainer>
                            <TransferLabel>
                              {i18n.t("deposit.email")}:
                            </TransferLabel>
                            <TransferValue>{channelExtend.email}</TransferValue>
                            <CopyFeature copyContent={channelExtend.email} />
                          </TransferContainer>
                        )}

                        {channelExtend.fpsId && (
                          <TransferContainer>
                            <TransferLabel>
                              {i18n.t("deposit.fpsId")}:
                            </TransferLabel>
                            <TransferValue>{channelExtend.fpsId}</TransferValue>
                            <CopyFeature copyContent={channelExtend.fpsId} />
                          </TransferContainer>
                        )}
                      </CustomText>
                    );
                  }
                }
              })()}
              {(() => {
                if (
                  this.props.wallet.depositTypeList[
                    this.state.selectedPaymentIndex
                  ].paymentcode.toUpperCase() === "MANUAL" ||
                  this.props.wallet.depositTypeList[
                    this.state.selectedPaymentIndex
                  ].paymentcode.toUpperCase() === "APPLEPAY"
                ) {
                  return (
                    <>
                      {!(
                        config.features.Deposit_RemoveAccount ||
                        isUsdt === "USDT"
                      ) && (
                        <>
                          {this.props.wallet.bankCardList.length > 1 ? (
                            <CustomText>
                              <CustomLabel>
                                {config.features.Deposit_OriginAccount
                                  ? i18n.t("idr1.pleaseEnterAccountName")
                                  : i18n.t("common.pleaseEnterAccountName")}
                              </CustomLabel>
                              <CustomFormControl variant="outlined">
                                <CustomSelect
                                  native
                                  id="customSelect"
                                  value={this.state.account}
                                  style={{
                                    fontSize: "28px",
                                    height: "78px",
                                    border: "none",
                                    color: "#d09f58",
                                  }}
                                  onChange={(e) => {
                                    this.setState({
                                      ...this.state,
                                      account: e.target.value,
                                    });
                                  }}
                                >
                                  <option value="">
                                    {config.features.Deposit_OriginAccount
                                      ? i18n.t("idr1.pleaseEnterAccountName")
                                      : i18n.t("common.pleaseEnterAccountName")}
                                  </option>
                                  {this.props.wallet.bankCardList.map(
                                    (item, index) => {
                                      var detail = item.detail;
                                      return (
                                        <option
                                          value={
                                            detail.bankAccount ||
                                            detail.address ||
                                            detail.phone
                                          }
                                          key={index}
                                        >
                                          {detail.bankAccount ||
                                            detail.address ||
                                            detail.phone}{" "}
                                          ({item.banktype})
                                        </option>
                                      );
                                    }
                                  )}
                                </CustomSelect>
                              </CustomFormControl>
                            </CustomText>
                          ) : (
                            <Textbox
                              style={{ margin: "20px auto 20px auto" }}
                              type={"text"}
                              placeholder={
                                config.features.Deposit_OriginAccount
                                  ? i18n.t("idr1.pleaseEnterAccountName")
                                  : i18n.t("common.pleaseEnterAccountName")
                              }
                              label={
                                config.features.Deposit_OriginAccount
                                  ? i18n.t("idr1.pleaseEnterAccountName")
                                  : i18n.t("common.pleaseEnterAccountName") +
                                    (config.features.Deposit_AddTips
                                      ? " *" + i18n.t("mgm.accountDepositTips")
                                      : "")
                              }
                              value={this.state.account}
                              onChange={(e) => {
                                this.setState({
                                  ...this.state,
                                  account: e.target.value,
                                });
                              }}
                            ></Textbox>
                          )}
                        </>
                      )}
                      {(!(
                        config.features.Deposit_RemoveName ||
                        this.props.wallet.depositTypeList[
                          this.props.selectedPaymentIndex
                        ].method[
                          this.props.selectedMethodIndex
                        ].methodcode.toUpperCase() === "FPS"
                      ) ||
                        config.features.Deposit_FPSWithName) && (
                        <Textbox
                          style={{ margin: "20px auto 20px auto" }}
                          type={"text"}
                          placeholder={
                            config.features.Deposit_CustomBankNameTranslation
                              ? i18n.t("mgm.msgPlsEnterAccount")
                              : config.features.Deposit_EnglishName
                              ? i18n.t("bet28.msgEnterBankAccountName")
                              : i18n.t("deposit.msgPlsEnterAccount")
                          }
                          label={
                            (config.features.Deposit_CustomBankNameTranslation
                              ? i18n.t("mgm.msgPlsEnterAccount")
                              : config.features.Deposit_EnglishName
                              ? i18n.t("bet28.BankAccountName")
                              : i18n.t("deposit.msgPlsEnterAccount")) +
                            (config.features.Deposit_AddTips
                              ? " *" + i18n.t("mgm.nameDepositTips")
                              : "")
                          }
                          value={this.state.name}
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              name: e.target.value,
                            });
                          }}
                        ></Textbox>
                      )}
                    </>
                  );
                }
              })()}

              <Textbox
                style={{ margin: "20px auto 20px auto" }}
                value={this.state.amount}
                onChange={this.handleAmountChange}
                type={"number"}
                placeholder={
                  i18n.t("deposit.msgPleaseEnter") +
                  Common.formatNumberWithThousand(
                    this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ].method[this.state.selectedMethodIndex].channel[
                      this.state.selectedChannelIndex
                    ].transferlimit.from
                  ) +
                  "-" +
                  Common.formatNumberWithThousand(
                    this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ].method[this.state.selectedMethodIndex].channel[
                      this.state.selectedChannelIndex
                    ].transferlimit.to
                  ) +
                  i18n.t("deposit.dollor")
                }
                label={i18n.t("deposit.depositAmount")}
              ></Textbox>
              {this.props.wallet.depositTypeList[
                this.state.selectedPaymentIndex
              ].paymentcode.toUpperCase() === "UMPAY" && (
                <Remark>{i18n.t("deposit.ppRemark")}</Remark>
              )}
              {(() => {
                if (
                  this.props.wallet.depositTypeList[
                    this.state.selectedPaymentIndex
                  ].method[this.state.selectedMethodIndex].methodcode ===
                  "Crypto"
                ) {
                  if (
                    this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ].paymentcode === "LeePay"
                  ) {
                    return (
                      <ExchangeRateContainer style={{ marginTop: "4px" }}>
                        <LimitLabel>
                          {i18n.t("deposit.exchangeRate")}:{" "}
                        </LimitLabel>
                        <LimitAmount>{` ${this.state.exchangeRate.buyprice}`}</LimitAmount>
                        <LimitLabel style={{ marginLeft: "26px" }}>
                          {i18n.t("deposit.expectedPayment")}
                        </LimitLabel>{" "}
                        <LimitAmount>{` ${
                          isNaN(this.state.amount) === false
                            ? (
                                this.state.amount /
                                this.state.exchangeRate.buyprice
                              ).toFixed(2)
                            : 0
                        }`}</LimitAmount>
                      </ExchangeRateContainer>
                    );
                  } else {
                    return Object.keys(this.state.exchangeRate).map((key) => {
                      return Object.keys(this.state.exchangeRate[key]).map(
                        (key2) => {
                          if (key2 === "HKD") {
                            return (
                              <ExchangeRateContainer
                                style={{ marginTop: "4px" }}
                              >
                                <LimitLabel>
                                  {i18n.t("deposit.exchangeRate")}:{" "}
                                </LimitLabel>
                                <LimitAmount>{` ${this.state.exchangeRate[key][key2].rate}`}</LimitAmount>
                                <LimitLabel style={{ marginLeft: "26px" }}>
                                  {i18n.t("deposit.expectedPayment")}
                                </LimitLabel>{" "}
                                <LimitAmount>{` ${
                                  isNaN(this.state.amount) === false
                                    ? (
                                        this.state.amount /
                                        this.state.exchangeRate[key][key2].rate
                                      ).toFixed(2)
                                    : 0
                                }`}</LimitAmount>
                              </ExchangeRateContainer>
                            );
                          }
                        }
                      );
                    });
                  }
                }
              })()}
              <CustomText>
                <CustomLabel>{i18n.t("deposit.promotion")}</CustomLabel>
                <CustomFormControl variant="outlined">
                  <CustomSelect
                    native
                    id="customSelect"
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                      color: "#d09f58",
                    }}
                    value={this.state.depositPromotion}
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        depositPromotion: e.target.value,
                      });
                    }}
                  >
                    <option value={""}>
                      {i18n.t("deposit.msgPlsSelectPromotion")}
                    </option>
                    {this.props.general.promotionList.items
                      .filter(
                        (item) =>
                          [
                            "FirstDeposit",
                            "DailySecondDeposit",
                            "DailyFirstDeposit",
                          ].indexOf(item.promotionType) >= 0
                      )
                      .map((item, index) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        );
                      })}
                  </CustomSelect>
                </CustomFormControl>
              </CustomText>
              <Button
                style={{ margin: "40px auto 0 auto" }}
                label={
                  this.state.step === 1
                    ? i18n.t("common.nextStep")
                    : this.state.step === 2
                    ? "上传"
                    : ""
                }
                onClick={this.handleDepositClick}
                disabled={
                  this.state.disabled === true ||
                  ((this.props.wallet.depositTypeList[
                    this.state.selectedPaymentIndex
                  ].paymentcode.toUpperCase() === "MANUAL" ||
                    this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ].paymentcode.toUpperCase() === "APPLEPAY") &&
                    null) ||
                  this.state.amount <
                    this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ].method[this.state.selectedMethodIndex].channel[
                      this.state.selectedChannelIndex
                    ].transferlimit.from ||
                  this.state.amount >
                    this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ].method[this.state.selectedMethodIndex].channel[
                      this.state.selectedChannelIndex
                    ].transferlimit.to
                }
              ></Button>
            </React.Fragment>
          );
        case 2:
        case 3:
          return (
            <Details
              alert={this.props.alert}
              performUploadImage={this.performUploadImage}
              amount={this.state.amount}
              depositResult={this.props.wallet.depositResult}
              methodcode={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].method[this.state.selectedMethodIndex].methodcode
              }
              channel={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].method[this.state.selectedMethodIndex].channel[
                  this.state.selectedChannelIndex
                ]
              }
              handleRestartClick={this.handleRestartClick}
              isManual={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].paymentcode.toUpperCase() === "MANUAL"
              }
              isCrypto={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].method[this.state.selectedMethodIndex].methodcode === "Crypto"
              }
              depositType={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].paymentcode
              }
              extended={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].method[this.state.selectedMethodIndex].channel[
                  this.state.selectedChannelIndex
                ].extended
              }
            ></Details>
          );
        case 5:
          return (
            <DetailsManual
              methodcode={this.state.methodcode}
              channelname={this.state.channelname}
              depositDetail={this.state.depositDetail}
              bankaccount={this.state.bankaccount}
              paymentId={this.state.paymentId}
              depositResult={this.props.wallet.depositResult}
              isManual={true}
              amount={this.state.amount}
              alert={this.props.alert}
              performUploadImage={this.performUploadImage}
              handleRestartClick={this.handleRestartClick}
              extended={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].method[this.state.selectedMethodIndex].channel[
                  this.state.selectedChannelIndex
                ].extended
              }
            ></DetailsManual>
          );
        default:
          return <></>;
      }
    };
    return (
      <Container>
        {(() => {
          if (
            config.features.DepositNotification &&
            this.props.ui.deposits &&
            this.props.ui.deposits.length > 0
          ) {
            var row = this.props.ui.deposits[0];

            return (
              <PopupAnnouncement
                open={this.state.openAnnouncement}
                onClose={() => {
                  this.setState({ ...this.state, openAnnouncement: false });
                }}
                text={
                  row.localization !== null && row.localization.content
                    ? row.localization.content
                    : row.content
                }
                header={
                  row.localization !== null && row.localization.subject
                    ? row.localization.subject
                    : row.subject
                }
              ></PopupAnnouncement>
            );
          }
        })()}
        <Header
          onBackClick={this.handleBackClick}
          title={i18n.t("deposit.title")}
          rightContent={
            <BalanceLabel>
              {this.props.wallet.mainSymbol}
              {Common.formatNumberWithThousand(
                this.props.wallet.mainBalance +
                  this.props.game.providerList
                    .filter(
                      (item) =>
                        item.status === 0 && item.transferwallet === true
                    )
                    .reduce((a, v) => (a = a + v.balance), 0)
              )}
            </BalanceLabel>
          }
        ></Header>

        {(() => {
          if (this.props.wallet.depositTypeList.length <= 0) {
            return <React.Fragment></React.Fragment>;
          }
          return (
            <React.Fragment>
              <StyledAppBar>
                <Tabs
                  value={this.state.selectedPaymentIndex}
                  onChange={this.handlePaymentChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {this.props.wallet.depositTypeList.map((item, index) => {
                    return (
                      <Tab
                        key={index}
                        value={index}
                        label={i18n.t(item.paymentcode)}
                      >
                        {i18n.t(item.paymentcode)}
                      </Tab>
                    );
                  })}
                </Tabs>
              </StyledAppBar>
              {(() => {
                return switchView(this.state.step);
              })()}
            </React.Fragment>
          );
        })()}
        <StyledModalPopup
          onClose={this.props.hideAlert}
          open={this.props.wallet.message !== ""}
        >
          <DialoTitle>{i18n.t("common.info")}</DialoTitle>
          <DialoMessage>{this.props.wallet.message}</DialoMessage>
          <ButtonConfirm onClick={this.props.hideAlert}>
            {i18n.t("common.confirm")}
          </ButtonConfirm>
        </StyledModalPopup>

        <Loading show={this.props.wallet.depositLoading}></Loading>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    token: state.account.token,
    wallet: state.wallet,
    general: state.general,
    game: state.game,
    ui: state.ui,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doDepositUpload: (file, fileType, orderId) =>
      dispatch(walletAction.doManualDepositUpload(file, fileType, orderId)),
    getDepositMethod: () => dispatch(walletAction.getDepositMethod()),
    doBankDeposit: (
      name,
      account,
      amount,
      paymentid,
      promotionid,
      banktype
    ) => {
      dispatch(
        walletAction.doBankDeposit(
          name,
          account,
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doFPSDeposit: (account, amount, paymentid, promotionid, banktype) => {
      dispatch(
        walletAction.doFPSDeposit(
          account,
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doFPSDepositWithName: (
      name,
      account,
      amount,
      paymentid,
      promotionid,
      banktype
    ) => {
      dispatch(
        walletAction.doFPSDepositWithName(
          name,
          account,
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doThirdPartyDeposit: (amount, paymentid, promotionid, banktype) => {
      dispatch(
        walletAction.doThirdPartyDeposit(
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },

    doUsdtDeposit: (amount, paymentid, promotionid, banktype) => {
      dispatch(
        walletAction.doUsdtDeposit(amount, paymentid, promotionid, banktype)
      );
    },
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),

    doBankDeposit2: (amount, payment_id, promotionid, paymentcode) =>
      dispatch(
        walletAction.doBankDeposit2(
          amount,
          payment_id,
          promotionid,
          paymentcode
        )
      ),
    doCryptoDeposit: (amount, payment_id, promotionid, paymentcode) =>
      dispatch(
        walletAction.doCryptoDeposit(
          amount,
          payment_id,
          promotionid,
          paymentcode
        )
      ),
    performDeposit: (amount, payment_id, promotionid, paymentcode, type) =>
      dispatch(
        walletAction.performDeposit(
          amount,
          payment_id,
          promotionid,
          paymentcode,
          type
        )
      ),
    doUploadDepositProof: (id, file) =>
      dispatch(walletAction.doUploadDepositProof(id, file)),
    hideAlert: () =>
      dispatch({
        type: WALLET_HIDEMESSAGE,
      }),
    resetDeposit: () => {
      return dispatch({
        type: RESET_WALLETRESULT,
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Deposit));
