import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Modal from "@material-ui/core/Dialog";
import Common from "../../../utils/Common";

import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "react-lazy-load-image-component/src/effects/blur.css";
import Textbox from "../../Wap/Share/Textbox";
import Button from "../../Wap/Share/Button";

import i18n from "../../../utils/i18n";

import config from "../../../config/config";
import { utility } from "../../../utils/utility";

const GMOstyle = config.brand === "GMO";

const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: config.brand === "WGHK" ? "24px" : "28px",
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

const CustomCustomSelect = styled(CustomSelect)`
  font-size: ${() => (config.brand === "WGHK" ? `24px` : `28px`)};
  height: 78px;
  border: none;

  .MuiSelect-root {
    color: ${({ value }) => {
      return value === "" || value === undefined ? "rgba(0,0,0,0.45)" : "#000";
    }};
  }
`;

const CustomText = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px 20px 10px 20px;
  margin: 20px auto;
`;
const CustomImage = styled.img`
  display: block;
  margin-top: 10px;
  width: 200px;
  height: 200px;
`;
const CustomLabel = styled.div`
  font-size: ${() => (config.brand === "WGHK" ? "26px" : "24px")};
  font-weight: 600;
  color: ${({ black, theme }) => {
    return black ? "#000" : theme.secondary;
  }};
  float: left;
`;
const CustomFormControl = withStyles((theme) => ({
  root: {
    margin: "10px 0 0 0",
    background: "white",
    padding: "0 0 16px 0",
    borderRadius: "16px",
    height: "101px",
    border: "none",
    width: "100%",
    fontSize: "28px",
    "& fieldset": {
      border: "none",
    },
  },
}))(FormControl);

const LimitLabel = styled.span`
  color: #747474;
`;

const LimitAmount = styled.span`
  color: #c0252d;
`;
const TransferContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;
const TransferLabel = styled.div`
  color ${GMOstyle ? "#e9a60b" : "#747474"};
  font-size: ${() => (config.brand === "WGHK" ? `24px` : `28px`)};
  float: left;
  font-weight: ${() => (config.brand === "WGHK" ? `400` : `bold`)};
`;
const TransferValue = styled.div`
  color ${GMOstyle ? "#e9a60b" : "#747474"};
  font-size: ${() => (config.brand === "WGHK" ? `24px` : `28px`)};
  float: left;
  margin-left: 10px;
`;
const UploadInput = styled.input`
  font-size: 30px;
  margin-top: 14px;
`;
const ExchangeRateContainer = styled.div`
  margin: 20px auto;
  font-size: ${() => (config.brand === "WGHK" ? `24px` : `28px`)};
  font-weight: ${() => (config.brand === "WGHK" ? `400` : `normal`)};
  padding: 0px 20px 20px 48px;
`;

const Remark = styled.div`
  font-size: ${() => (config.brand === "WGHK" ? `24px` : `20px`)};
  font-weight: ${() => (config.brand === "WGHK" ? `400` : `normal`)};
  padding: 0px 50px;
  color: ${({ theme }) => theme.primary};
  opacity: 0.75;
`;
const QRCodeImg = styled.img`
  display: block;
  margin-top: 10px;
  width: 200px;
  height: 200px;
`;
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
const DialoMessage = styled.div`
  font-size: 26px;
  margin: 20px 45px;
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
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  color: #ffffff;
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

const InputWrapper = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  width: 700px;
  margin-top: 10px;
  padding-right: 100px;
  border-radius: 16px;
  width: 100%;
`;

const FeeSpot = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 24px;

  span {
    font-weight: bold;
  }
`;

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  componentDidUpdate(preProps, preState) {}

  render() {
    var isFPS =
      this.props.wallet.depositTypeList[this.props.selectedPaymentIndex].method[
        this.props.selectedMethodIndex
      ].methodcode.toUpperCase() === "FPS";

    var isUSDT =
      this.props.wallet.depositTypeList[this.props.selectedPaymentIndex].method[
        this.props.selectedMethodIndex
      ].methodcode.toUpperCase() === "USDT";

    var isBankTransfer =
      this.props.wallet.depositTypeList[this.props.selectedPaymentIndex].method[
        this.props.selectedMethodIndex
      ].methodcode.toUpperCase() === "BANKTRANSFER";

    var isEwallet =
      this.props.wallet.depositTypeList[this.props.selectedPaymentIndex].method[
        this.props.selectedMethodIndex
      ].methodcode.toUpperCase() === "EWALLET";

    var isPulsa =
      this.props.wallet.depositTypeList[this.props.selectedPaymentIndex].method[
        this.props.selectedMethodIndex
      ].methodcode.toUpperCase() === "PULSA";

    var isManual =
      this.props.wallet.depositTypeList[
        this.props.selectedPaymentIndex
      ].paymentcode.toUpperCase() === "MANUAL";

    var isThirdParty =
      this.props.wallet.depositTypeList[this.props.selectedPaymentIndex].method[
        this.props.selectedMethodIndex
      ].methodcode.toUpperCase() === "THIRDPARTY";

    const performCopy = (content) => {
      this.props.alert("", i18n.t("affiliate.copied"));

      utility.copy(content);
    };

    const CopyFeature = ({ copyContent }) => {
      return (
        <CopyIcon
          onClick={() => {
            performCopy(copyContent);
          }}
        />
      );
    };

    const formatBankCardDetail = (data) => {
      var detail = "";
      switch (data.banktype.toUpperCase()) {
        case "BANK":
          detail = `${data.detail.bankName || ""} - ${
            data.detail.name || ""
          } - ${data.detail.bankAccount || ""}`;
          break;
        case "EWALLET":
        case "E-WALLET":
          detail = `${data.detail.phone || ""} - ${
            data.detail.eMoneyName || ""
          }`;
          break;
        case "PULSA":
          detail = `${data.detail.phone || ""}`;
          break;
        default:
          detail = `${
            data.detail.bankAccount || data.detail.address || data.detail.phone
          }`;
          break;
      }
      return detail;
    };

    return (
      <React.Fragment>
        {!config.features.Deposit_AddCard ? (
          <>
            {this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
              .paymentcode === "ZeroNineNinePay" && (
              <CustomText>
                <CustomLabel>
                  <HintText>{i18n.t("hint._099")}</HintText>
                </CustomLabel>
              </CustomText>
            )}
            <CustomText>
              <CustomLabel>{i18n.t("deposit.msgPlsSelectPayment")}</CustomLabel>
              <CustomFormControl variant="outlined">
                <CustomCustomSelect
                  native
                  id="customSelect"
                  value={this.props.selectedMethodIndex}
                  onChange={(e) => this.props.handleMethodChange(e)}
                >
                  <option value={""} disabled>
                    {i18n.t("deposit.msgPlsSelectPayment")}
                  </option>
                  {this.props.wallet.depositTypeList.length > 0 &&
                    this.props.wallet.depositTypeList[
                      this.props.selectedPaymentIndex
                    ].method.map((item, index) => {
                      return (
                        <option value={index}>
                          {" "}
                          {config.features.CustomKING8Deposit &&
                          isManual &&
                          i18n.exists(`king8.${item.methodcode}`)
                            ? i18n.t(`king8.${item.methodcode}`)
                            : i18n.t(item.methodcode)}
                        </option>
                      );
                    })}
                </CustomCustomSelect>
              </CustomFormControl>
            </CustomText>
          </>
        ) : (
          <CustomText>
            <CustomLabel>{i18n.t("idr1.pleaseEnterAccountName")}</CustomLabel>
            <CustomFormControl variant="outlined">
              <CustomCustomSelect
                native
                id="customSelect"
                value={this.props.selectedBankCard}
                onChange={(e) => this.props.handleBankCardChange(e)}
              >
                <option value="" disabled>
                  {i18n.t("idr1.pleaseEnterAccountName")}
                </option>
                {this.props.bankCardList.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {formatBankCardDetail(item)}
                    </option>
                  );
                })}
              </CustomCustomSelect>
            </CustomFormControl>
          </CustomText>
        )}
        {!(
          config.features.Deposit_HideDepositChannel ||
          config.features.Deposit_AddCard
        ) && (
          <CustomText>
            <CustomLabel>{i18n.t("deposit.msgPlsSelectMethod")}</CustomLabel>
            <CustomFormControl variant="outlined">
              <CustomCustomSelect
                native
                id="customSelect"
                value={this.props.selectedChannelIndex}
                onChange={(e) => this.props.handleChannelChange(e)}
              >
                {this.props.wallet.depositTypeList.length > 0 &&
                  this.props.wallet.depositTypeList[
                    this.props.selectedPaymentIndex
                  ].method[this.props.selectedMethodIndex].channel.map(
                    (item, index) => {
                      return <option value={index}>{item.channelname}</option>;
                    }
                  )}
              </CustomCustomSelect>
            </CustomFormControl>
          </CustomText>
        )}
        {(() => {
          if (
            config.features.Deposit_AddCard &&
            this.props.selectedBankCard !== ""
          ) {
            var channel =
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ];
            var channelExtend =
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].extended;
            if (!isBankTransfer && !isEwallet && !isPulsa) return <></>;
            return (
              <CustomText>
                <CustomLabel>{i18n.t("deposit.transferAccount")}</CustomLabel>
                {isBankTransfer && (
                  <TransferContainer>
                    <TransferLabel>
                      {i18n.t("deposit.details.bank")}:
                    </TransferLabel>
                    {channel.channelname && (
                      <React.Fragment>
                        <TransferValue>{channel.channelname}</TransferValue>
                        <CopyFeature copyContent={channel.channelname} />
                      </React.Fragment>
                    )}
                  </TransferContainer>
                )}
                {isBankTransfer && (
                  <TransferContainer>
                    <TransferLabel>{i18n.t("deposit.accName")}:</TransferLabel>
                    {channelExtend.name && (
                      <React.Fragment>
                        <TransferValue>{channelExtend.name}</TransferValue>
                        <CopyFeature copyContent={channelExtend.name} />
                      </React.Fragment>
                    )}
                  </TransferContainer>
                )}
                {isBankTransfer && (
                  <TransferContainer>
                    <TransferLabel>{i18n.t("deposit.cardNum")}:</TransferLabel>
                    {channelExtend.bankAccount && (
                      <React.Fragment>
                        <TransferValue>
                          {channelExtend.bankAccount}
                        </TransferValue>
                        <CopyFeature copyContent={channelExtend.bankAccount} />
                      </React.Fragment>
                    )}
                  </TransferContainer>
                )}
                {(isEwallet || isPulsa) && (
                  <TransferContainer>
                    <TransferLabel>{i18n.t("deposit.phone")}:</TransferLabel>
                    {channelExtend.phone && (
                      <React.Fragment>
                        <TransferValue>{channelExtend.phone}</TransferValue>
                        <CopyFeature copyContent={channelExtend.phone} />
                      </React.Fragment>
                    )}
                  </TransferContainer>
                )}
                {isEwallet && (
                  <TransferContainer>
                    <TransferLabel>
                      {i18n.t("deposit.eWalletAccount")}:
                    </TransferLabel>
                    {channelExtend.eMoneyName && (
                      <React.Fragment>
                        <TransferValue>
                          {channelExtend.eMoneyName}
                        </TransferValue>
                        <CopyFeature copyContent={channelExtend.eMoneyName} />
                      </React.Fragment>
                    )}
                  </TransferContainer>
                )}
              </CustomText>
            );
          }
        })()}
        {(() => {
          if (
            this.props.wallet.depositTypeList[
              this.props.selectedPaymentIndex
            ].paymentcode.toUpperCase() === "MANUAL" &&
            !config.features.Deposit_AddCard
          ) {
            var channelExtend =
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].extended;
            if (
              this.props.wallet.depositTypeList[
                this.props.selectedPaymentIndex
              ].method[
                this.props.selectedMethodIndex
              ].methodcode.toUpperCase() === "THIRDPARTY"
            ) {
              return (
                <CustomText>
                  <CustomLabel>{i18n.t("deposit.transferAccount")}</CustomLabel>
                  <QRCodeImg src={channelExtend.qrCodeFileUrl} />
                </CustomText>
              );
            } else {
              return (
                <CustomText>
                  <CustomLabel>{i18n.t("deposit.transferAccount")}</CustomLabel>
                  {channelExtend.qrCodeFileUrl && (
                    <QRCodeImg src={channelExtend.qrCodeFileUrl} />
                  )}
                  {channelExtend.logo && <QRCodeImg src={channelExtend.logo} />}
                  {channelExtend.qrCode && (
                    <QRCodeImg src={channelExtend.qrCode} />
                  )}
                  {channelExtend.address && (
                    <TransferContainer>
                      <TransferLabel>
                        {i18n.t("deposit.address")}:
                      </TransferLabel>
                      <TransferValue>{channelExtend.address}</TransferValue>
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
                      <TransferValue>{channelExtend.bankAccount}</TransferValue>
                      <CopyFeature copyContent={channelExtend.bankAccount} />
                    </TransferContainer>
                  )}
                  {channelExtend.phone && (
                    <TransferContainer>
                      <TransferLabel>{i18n.t("deposit.phone")}:</TransferLabel>
                      <TransferValue>{channelExtend.phone}</TransferValue>
                      <CopyFeature copyContent={channelExtend.phone} />
                    </TransferContainer>
                  )}
                  {channelExtend.email && (
                    <TransferContainer>
                      <TransferLabel>{i18n.t("deposit.email")}:</TransferLabel>
                      <TransferValue>{channelExtend.email}</TransferValue>
                      <CopyFeature copyContent={channelExtend.email} />
                    </TransferContainer>
                  )}
                  {channelExtend.fpsId && (
                    <TransferContainer>
                      <TransferLabel>{i18n.t("deposit.fpsId")}:</TransferLabel>
                      <TransferValue>{channelExtend.fpsId}</TransferValue>
                      <CopyFeature copyContent={channelExtend.fpsId} />
                    </TransferContainer>
                  )}
                  {channelExtend.eMoneyName && (
                    <TransferContainer>
                      <TransferLabel>
                        {i18n.t("deposit.eWalletAccount")}:
                      </TransferLabel>
                      <TransferValue>{channelExtend.eMoneyName}</TransferValue>
                      <CopyFeature copyContent={channelExtend.eMoneyName} />
                    </TransferContainer>
                  )}
                </CustomText>
              );
            }
          }
        })()}
        {(() => {
          if (config.features.Deposit_ManualApplePayHideBankAcc) {
          } else {
            if (
              this.props.wallet.depositTypeList[
                this.props.selectedPaymentIndex
              ].paymentcode.toUpperCase() === "MANUAL" ||
              this.props.wallet.depositTypeList[
                this.props.selectedPaymentIndex
              ].paymentcode.toUpperCase() === "APPLEPAY"
            ) {
              return (
                <>
                  {!(
                    config.features.CustomKING8Deposit ||
                    config.features.Deposit_RemoveAccount ||
                    isUSDT ||
                    config.features.Deposit_AddCard
                  ) && (
                    <>
                      {this.props.wallet.bankCardList.length > 1 &&
                      !config.features.Deposit_AccountNameManualInput ? (
                        <CustomText>
                          <CustomLabel>
                            {config.features.Deposit_OriginAccount
                              ? i18n.t("idr1.pleaseEnterAccountName")
                              : i18n.t("common.pleaseEnterAccountName")}
                          </CustomLabel>
                          <CustomFormControl variant="outlined">
                            <CustomCustomSelect
                              native
                              id="customSelect"
                              value={this.props.selectedBankCard}
                              onChange={(e) =>
                                this.props.handleSelectAccountChange(e)
                              }
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
                                    <option value={item.id} key={index}>
                                      {detail.bankAccount ||
                                        detail.address ||
                                        detail.phone}{" "}
                                      ({item.banktype})
                                    </option>
                                  );
                                }
                              )}
                            </CustomCustomSelect>
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
                          value={this.props.account}
                          disabled={
                            !config.features.Deposit_AccountNameManualInput &&
                            config.features.Deposit_AutofillFirstCard &&
                            this.props.wallet.bankCardList.length > 1
                          }
                          onChange={(e) => this.props.handleAccountChange(e)}
                        ></Textbox>
                      )}
                    </>
                  )}
                  {(!(config.features.Deposit_RemoveName || isFPS) ||
                    config.features.Deposit_FPSWithName) && (
                    <>
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
                        value={this.props.name}
                        onChange={(e) => this.props.handleNameChange(e)}
                      ></Textbox>
                    </>
                  )}
                </>
              );
            }
          }
        })()}
        <Textbox
          style={{ margin: "20px auto 20px auto" }}
          value={this.props.amount}
          onChange={this.props.handleAmountChange}
          type={"number"}
          placeholder={
            i18n.t("deposit.msgPleaseEnter") +
            Common.formatNumberWithThousand(
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].transferlimit.from
            ) +
            "-" +
            Common.formatNumberWithThousand(
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].transferlimit.to
            ) +
            i18n.t("deposit.dollor")
          }
          label={i18n.t("deposit.depositAmount")}
          custom={
            this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
              .method[this.props.selectedMethodIndex].channel[
              this.props.selectedChannelIndex
            ].fees > 0 && (
              <>
                <FeeSpot>
                  {i18n.t("fees.deposit")}:{" "}
                  <span>
                    {
                      this.props.wallet.depositTypeList[
                        this.props.selectedPaymentIndex
                      ].method[this.props.selectedMethodIndex].channel[
                        this.props.selectedChannelIndex
                      ].fees
                    }
                    %
                  </span>
                </FeeSpot>
              </>
            )
          }
        ></Textbox>
        {this.props.wallet.depositTypeList[
          this.props.selectedPaymentIndex
        ].paymentcode.toUpperCase() === "UMPAY" && (
          <Remark>{i18n.t("deposit.ppRemark")}</Remark>
        )}
        {(() => {
          if (
            this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
              .method[this.props.selectedMethodIndex].methodcode === "Usdt" &&
            this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
              .method[this.props.selectedMethodIndex].channel[
              this.props.selectedChannelIndex
            ].extended.rate !== undefined
          ) {
            var usdtRate =
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].extended.rate;
            if (
              this.props.wallet.depositTypeList[
                this.props.selectedPaymentIndex
              ].paymentcode.toUpperCase() === "MANUAL"
            ) {
              return (
                <ExchangeRateContainer style={{ marginTop: "4px" }}>
                  <LimitLabel>
                    {i18n.t("deposit.exchangeRate")} 1 {`${config.currency}`} :{" "}
                  </LimitLabel>
                  <LimitAmount>{` ${usdtRate} `}</LimitAmount>
                  <LimitLabel>USDT</LimitLabel>
                  <div class="clear"></div>
                  <LimitLabel>{i18n.t("deposit.totalAmount")}</LimitLabel>
                  {" :  "}
                  <LimitAmount>{` ${
                    isNaN(this.props.amount) === false
                      ? Common.formatNumberWithCommasNoRounding(
                          this.props.amount / usdtRate
                        )
                      : 0
                  }`}</LimitAmount>
                </ExchangeRateContainer>
              );
            }
          }
        })()}
        {(() => {
          if (
            this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
              .method[this.props.selectedMethodIndex].methodcode === "Crypto"
          ) {
            if (
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .paymentcode === "LeePay"
            ) {
              return (
                <ExchangeRateContainer style={{ marginTop: "4px" }}>
                  <LimitLabel>{i18n.t("deposit.exchangeRate")}: </LimitLabel>
                  <LimitAmount>{` ${this.props.exchangeRate.buyprice}`}</LimitAmount>
                  <LimitLabel style={{ marginLeft: "26px" }}>
                    {i18n.t("deposit.expectedPayment")}
                  </LimitLabel>{" "}
                  <LimitAmount>{` ${
                    isNaN(this.props.amount) === false
                      ? (
                          this.props.amount / this.props.exchangeRate.buyprice
                        ).toFixed(2)
                      : 0
                  }`}</LimitAmount>
                </ExchangeRateContainer>
              );
            } else {
              return Object.keys(this.props.exchangeRate).map((key) => {
                return Object.keys(this.props.exchangeRate[key]).map((key2) => {
                  if (key2 === "HKD") {
                    return (
                      <ExchangeRateContainer style={{ marginTop: "4px" }}>
                        <LimitLabel>
                          {i18n.t("deposit.exchangeRate")}:{" "}
                        </LimitLabel>
                        <LimitAmount>{` ${this.props.exchangeRate[key][key2].rate}`}</LimitAmount>
                        <LimitLabel style={{ marginLeft: "26px" }}>
                          {i18n.t("deposit.expectedPayment")}
                        </LimitLabel>{" "}
                        <LimitAmount>{` ${
                          isNaN(this.props.amount) === false
                            ? (
                                this.props.amount /
                                this.props.exchangeRate[key][key2].rate
                              ).toFixed(2)
                            : 0
                        }`}</LimitAmount>
                      </ExchangeRateContainer>
                    );
                  }
                });
              });
            }
          }
        })()}
        <CustomText>
          <CustomLabel>{i18n.t("deposit.promotion")}</CustomLabel>
          <CustomFormControl variant="outlined">
            <CustomCustomSelect
              native
              id="customSelect"
              value={this.props.depositPromotion}
              onChange={(e) => this.props.handlePromotionChange(e)}
            >
              <option value="">
                {i18n.t("deposit.msgPlsSelectPromotion")}
              </option>
              {this.props.general.promotionList.items
                .filter(
                  (item) =>
                    [
                      "FirstDeposit",
                      "DailySecondDeposit",
                      "DailyFirstDeposit",
                      "DepositReward",
                      "DepositAccumulateRoulette",
                    ].indexOf(item.promotionType) >= 0 &&
                    (item.promotionType === "DepositReward"
                      ? this.props.amount >=
                        item.campaignDetail.depositMinimumLimit
                      : true)
                )
                .map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
            </CustomCustomSelect>
          </CustomFormControl>
        </CustomText>
        {(() => {
          if (
            this.props.wallet.depositTypeList[
              this.props.selectedPaymentIndex
            ].paymentcode.toUpperCase() === "MANUAL"
          ) {
            return (
              <>
                <CustomText>
                  <CustomLabel>{i18n.t("deposit.uploadReceipt")}</CustomLabel>
                  <InputWrapper style={{ padding: 10 }}>
                    <button
                      onClick={() => {
                        document.getElementById("getFile").click();
                      }}
                      style={{
                        marginRight: 10,
                        height: 75,
                        minWidth: 200,
                        fontSize: 24,
                      }}
                    >
                      {i18n.t("common.upload")}
                    </button>
                    <input
                      type="file"
                      id="getFile"
                      onChange={this.props.handleFileChange}
                      accept="image/jpg, image/jpeg, image/png, image/tiff"
                      style={{ display: "none" }}
                    />
                    {this.props.files ? (
                      <div style={{ fontSize: 24 }}>
                        {this.props.files[0].name}
                      </div>
                    ) : (
                      ""
                    )}
                  </InputWrapper>
                </CustomText>
                <Remark>
                  {i18n.t(
                    config.features.Deposit_UploadRequired
                      ? "deposit.msgPlsUploadProof"
                      : "deposit.msgNotMustUploadProof"
                  )}
                </Remark>
              </>
            );
          }
        })()}
        {config.features.Deposit_Withdrawal_PlayerNote &&
          (isEwallet || isPulsa || isBankTransfer) && (
            <Textbox
              style={{ margin: "20px auto 20px auto" }}
              value={this.props.playerNote}
              onChange={this.props.handlePlayerNoteChange}
              placeholder={i18n.t("deposit.plsEnterPlayerNote")}
              label={i18n.t("deposit.playerNote")}
            ></Textbox>
          )}
        <StyledModalPopup
          onClose={this.props.handleClosePopup}
          open={this.props.openPopup}
        >
          <DialoMessage>{i18n.t("deposit.msgDialog")}</DialoMessage>
          <ButtonConfirm
            onClick={this.props.handleOpenPopupUrl}
            style={{ float: "left" }}
          >
            {i18n.t("common.confirm")}
          </ButtonConfirm>
          <ButtonConfirm
            onClick={this.props.handleClosePopup}
            style={{ float: "right" }}
          >
            {i18n.t("common.cancel")}
          </ButtonConfirm>
        </StyledModalPopup>
        <Button
          style={{ margin: "40px auto 0 auto" }}
          label={i18n.t("common.submit")}
          onClick={this.props.handleDepositClick}
          disabled={(() => {
            const paymentcode =
              this.props.wallet.depositTypeList[
                this.props.selectedPaymentIndex
              ].paymentcode.toUpperCase();
            const transferlimit =
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].transferlimit;

            if (
              this.props.disabled === true ||
              this.props.amount < transferlimit.from ||
              this.props.amount > transferlimit.to ||
              this.props.amount === "" ||
              (this.props.files === null &&
                config.features.Deposit_UploadRequired &&
                isManual)
            ) {
              return true;
            } else {
              return false;
            }
          })()}
        ></Button>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    general: state.general,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
