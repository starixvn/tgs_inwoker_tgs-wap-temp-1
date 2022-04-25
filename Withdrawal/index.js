import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../../Wap/Share/Header";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Dialog";

import Button from "../../Wap/Share/Button";

import Textbox from "../../Wap/Share/Textbox";
import Common from "../../../utils/Common";
import { walletAction } from "../../../api-services/actions/walletAction";
import { WalletService } from "../../../api-services/services/WalletService";
import { RESET_WALLETRESULT } from "../../../api-services/constant/actionType";

import Loading from "../../Wap/Share/Loading";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import i18n from "../../../utils/i18n";
import Slide from "@material-ui/core/Slide";
import config from "../../../config/config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Container = styled.div`
  width: 100%;
  overflow: hidden;

  height: 100%;
`;
const BalanceLabel = styled.div`
  float: right;
  margin: 26px 20px 0 0;

  font-size: 30px;
  font-weight: 600;

  text-align: right;
  color: #fde73f;
`;
const InnerContainer = styled.div`
  margin: 40px auto 40px auto;

  width: 688px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(35, 31, 27, 0.1);
  padding 20px 0 20px 10px;
`;
const RowContainer = styled.div`
  min-height: 80px;
  margin: 10px 0 10px 30px;
`;

const LeftLabel = styled.div`
  float: left;
  border-left: 3px solid #000;

  font-size: 32px;
  padding-left: 30px;
  color: #4a4a4a;
  width: 450px;
  margin: 10px 0 0 0;
`;
const LeftLabelValue = styled.div`
  float: left;
  font-size: 28px;
  width: 450px;
  color: ${({ theme }) => theme.secondary};
  padding-left: 30px;
`;

const BottomDesc = styled.div`
  margin: 0 auto;
  width: 86%;
  font-size: 26px;

  color: ${({ theme }) => theme.secondary};
`;
const ButtonCardManage = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp//icon-card-manage.png`})
    no-repeat left center;
  padding-left: 50px;
  float: right;
  margin: 0px 50px 20px 0;
  font-size: 26px;

  color: ${({ theme }) => theme.secondary};
`;

const StyledModalBank = withStyles((theme) => ({
  paper: {
    color: "#666666",
    padding: "0 30px",
    width: "750px",
    maxWidth: "750px",
    margin: 0,
    display: "block",
    position: "absolute",
    bottom: 0,
    height: "calc(100% - 580px)",
  },
}))(Modal);

const StyledListItem = withStyles((theme) => ({
  root: {
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    padding: "10px",
  },
}))(ListItem);
const StyledListItemText = withStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingRight: "50px",
    "& .MuiTypography-root": {
      fontSize: "28px",
    },
  },
}))(ListItemText);

const LeftText = styled(StyledListItemText)`
  text-align: left;
`;
const RightText = styled(StyledListItemText)`
  text-align: right;
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

const CustomSelect = styled.select`
  font-size: 28px;
  margin-top: 25px;
  border-radius: 16px;
  border: solid 1px transparent;
  width: 100%;
  color: ${({ theme }) => theme.secondary};
`;

const CustomLabel = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 3px;
  color: #212e31;
`;

const CustomSelectContainer = styled.div`
  width: 700px;
  height: 170px;

  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px 20px 0 20px;
  margin: 20px auto;
`;

class Withdrawal extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      withdrawalInfo: {
        bonus_limit_list: [],
      },
      bankCardList: [],
      selectedBankCardIndex: "",
      defaultCard: "",
      amount: "",
      card: "",
      bankOpen: false,
      loading: false,
      open: false,
      password: "",
      otp: false,
      disabled: false,
      minWithdrawLimit: 0,

      min: 0,
      max: 0,
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    WalletService.GetMinWithdrawLimit().then((e) => {
      if (e.IsSuccess) {
        this.setState({
          ...this.state,
          minWithdrawLimit: e.data,
        });
      }
    });

    if (this.props.wallet.withdrawalList.length === 0)
      this.props.getWithdrawalChannel();

    if (
      this.props.account.info.check_pass_email === false &&
      config.features.EmailVerification
    ) {
      this.props.appHistory.replace(`/${i18n.language}/profile/email`);
      // } else if (this.props.account.info.member_safe_password !== 'set') {
      //   this.props.appHistory.replace(
      //     `/${i18n.language}/profile/withdrawalpassword/`
      //   )
    } else {
      if (this.props.token != null) {
        if (this.props.wallet.bankCardList.length === 0)
          this.props.getBankCardList();

        // this.GetWithdrawalDetails();
      }
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.wallet.addBillingResult !== this.props.wallet.addBillingResult &&
      this.props.wallet.addBillingResult !== null
    ) {
      this.props.getBalanceList();
    }
    if (
      preProps.wallet.withdrawalResult !== this.props.wallet.withdrawalResult &&
      this.props.wallet.withdrawalResult !== null
    ) {
      if (this.props.wallet.withdrawalResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.props.alert(
          "",
          i18n.t("withdrawal.msgSuccess"),
          !this.props.account.info.check_pass_account && (
            <div
              style={{ textAlign: "center", marginTop: 10 }}
              onClick={() => {
                this.props.appHistory.push({
                  pathname: "/" + i18n.language + "/profile/name",
                });
              }}
            >
              {i18n.t("verified.goVerify")}
            </div>
          )
        );
        this.setState({
          ...this.initialState,
        });
      } else {
        this.props.alert("", this.props.wallet.withdrawalResult.info);
        // if (this.props.wallet.withdrawalResult.code === 207) {
        //   this.props.alert('', i18n.t('common.msgRequiredTurnover'))
        // } else if (this.props.wallet.withdrawalResult.code === 901) {
        //   this.props.alert(
        //     '',
        //     i18n.t('common.msgInvalidWithdrawalPassword')
        //   )
        // } else {
        //   this.props.alert('', this.props.wallet.withdrawalResult.info)
        // }
      }
    }
  }
  handleBackClick = () => {
    this.props.appHistory.goBack();
  };

  handleSubmitClick = (e) => {
    this.setState({ ...this.state, disabled: true });
    const amount = this.state.amount;
    if (config.features.Withdrawal_HundredDigit) {
      if (!/^[1-9][0-9]{0,17}00$/.test(amount)) {
        this.props.alert("", i18n.t("withdrawal.msgMustHundred"));
        return this.setState({ ...this.state, disabled: false });
      }
    }
    const formatedamount = amount.toString().replace(/,/g, "");

    if (
      parseFloat(formatedamount) > parseFloat(this.props.wallet.mainBalance)
    ) {
      this.props.alert("", i18n.t("withdrawal.msgInsufficient"));
    } else if (parseFloat(formatedamount) < parseFloat(this.state.min)) {
      this.props.alert("", i18n.t("withdrawal.notReachMin"));
    } else if (parseFloat(formatedamount) > parseFloat(this.state.max)) {
      this.props.alert("", i18n.t("withdrawal.reachedMax"));
    } else {
      this.props.doWithdraw(
        formatedamount,
        this.state.password,
        this.props.wallet.bankCardList[this.state.selectedBankCardIndex].id
      );
    }

    setTimeout(() => {
      this.setState({ ...this.state, disabled: false });
    }, 1000);
  };

  handleChangeAmount = (e) => {
    var regex = /^\d+$/g;
    if (regex.test(e.target.value) || e.target.value === "") {
      this.setState({ ...this.state, amount: e.target.value });
    }
  };

  handleClose = () => {
    this.props.resetResult();
  };

  handleBankClick = (e) => {
    this.setState({
      ...this.state,
      selectedBankCardIndex: e.target.value,
      //  bankOpen: false
    });
  };

  getTransferLimit = (channelId) => {
    //reset everything
    var minValue = [];
    var maxValue = [];
    this.setState({
      min: 0,
      max: 0,
    });
    //update new data.
    for (var i = 0; i < this.props.wallet.withdrawalList.length; i++) {
      const methodList = this.props.wallet.withdrawalList[i].channel;
      if (methodList) {
        for (var inner = 0; inner < methodList.length; inner++) {
          const channelList = methodList[inner];
          if (channelList.channelid === channelId) {
            console.log(channelList.transferlimit);
            minValue.push(channelList.transferlimit.from);
            maxValue.push(channelList.transferlimit.to);
            this.setState({
              min: Math.min(...minValue),
              max: Math.max(...maxValue),
            });
          }
        }
      }
    }
  };
  handleConfirmOTP = () => {
    const amount = this.state.amount;

    const formatedamount = amount.toString().replace(/,/g, "");
    // if (parseFloat(formatedamount) <= 0) {
    //   this.props.alert("", i18n.t("withdrawal.msgInvalidAmt"));

    //   return;
    // }
    // this.setState({ ...this.state, otp: false });
    this.props.doWithdrawal(
      formatedamount,
      this.state.password,
      this.props.wallet.bankCardList[this.state.selectedBankCardIndex].id
    );
  };
  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  render() {
    return (
      <Container>
        <Header
          token={null}
          balance={0}
          background={true}
          rightContent={
            <BalanceLabel>
              {Common.formatNumberWithThousand(
                this.props.game.providerList.reduce(
                  (total, item) =>
                    item.transferwallet === true
                      ? (total += item.balance)
                      : (total += 0),
                  0
                ) + this.props.wallet.mainBalance
              )}
            </BalanceLabel>
          }
          onBackClick={this.handleBackClick}
          title={i18n.t("withdrawal.title")}
        ></Header>
        <InnerContainer>
          <RowContainer>
            <LeftLabel>{i18n.t("withdrawal.msgCanWithdrawal")}</LeftLabel>
            <LeftLabelValue>
              {this.props.wallet.mainSymbol}
              {Common.formatNumberWithThousand(this.props.wallet.mainBalance)}
            </LeftLabelValue>
          </RowContainer>
          <RowContainer>
            <LeftLabel>{i18n.t("withdrawal.turnover")}</LeftLabel>
            <LeftLabelValue>
              {this.props.wallet.mainSymbol}
              {Common.formatNumberWithThousand(this.state.minWithdrawLimit)}
            </LeftLabelValue>
          </RowContainer>
        </InnerContainer>
        <ButtonCardManage
          onClick={() =>
            this.props.appHistory.push("/" + i18n.language + "/card")
          }
        >
          {i18n.t("withdrawal.manageBank")}
        </ButtonCardManage>

        <CustomSelectContainer>
          <CustomLabel>{i18n.t("withdrawal.bankCard")}</CustomLabel>
          <CustomSelect
            value={this.state.selectedBankCardIndex}
            native
            onChange={(e) => {
              this.handleBankClick(e);
              this.getTransferLimit(
                this.props.wallet.bankCardList[e.target.value].paymentchannelid
              );
            }}
          >
            <option disabled value="">
              {i18n.t("withdrawal.msgEnterBank")}
            </option>
            {this.props.wallet.bankCardList.map((item, index) => {
              return (
                <option value={index} id={`optionValue-${index}`}>
                  {item.banktype} (
                  {item.detail.address ||
                    item.detail.bankAccount ||
                    item.detail.phone}
                  )
                </option>
              );
            })}
          </CustomSelect>
        </CustomSelectContainer>
        <Textbox
          style={{ margin: "50px auto 20px auto" }}
          value={this.state.amount}
          onChange={this.handleChangeAmount}
          placeholder={i18n.t("withdrawal.enterAmount")}
          label={i18n.t("common.amount")}
          type={"number"}
        ></Textbox>

        {/* <Textbox
          style={{ margin: '50px auto 20px auto' }}
          onChange={this.handlePasswordChange}
          value={this.state.password}
          placeholder={i18n.t('withdrawal.msgEnterWithdrawalPass')}
          label={i18n.t('common.withdrawalPassword')}
          type={'password'}
        ></Textbox> */}
        <BottomDesc>{i18n.t("withdrawal.notice")}</BottomDesc>
        <Button
          style={{ margin: "40px auto 0 auto" }}
          label={i18n.t("common.submit")}
          onClick={this.handleSubmitClick}
          disabled={(() => {
            return (
              parseFloat(this.state.amount.toString().replace(/,/g, "")) < 1 ||
              this.state.disabled === true
            );
          })()}
        ></Button>

        <StyledModalBank
          onClose={() => this.setState({ ...this.state, bankOpen: false })}
          open={this.state.bankOpen}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {this.props.wallet.bankCardList.map((item, index) => {
            return (
              <StyledListItem
                button
                key={index}
                onClick={() => this.handleBankClick(index)}
              >
                <LeftText primary={item.banktype}></LeftText>
                <RightText
                  primary={
                    item.detail.address ||
                    item.detail.bankAccount ||
                    item.detail.phone
                  }
                ></RightText>
              </StyledListItem>
            );
          })}
        </StyledModalBank>
        <StyledModalPopup
          onClose={() => this.setState({ ...this.state, otp: false })}
          open={this.state.otp}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {/* <DialoTitle>{i18n.t("common.withdrawalPassword")}</DialoTitle>
          <Textbox
            style={{ margin: "50px auto 20px auto" }}
            onChange={this.handlePasswordChange}
            value={this.state.password}
            label={i18n.t("common.withdrawalPassword")}
            type={"password"}
          ></Textbox> */}
          {/* <OTPContainer>
            <OTPTextBox
              type={"password"}
              inputmode="numeric"
              minLength={6}
              maxLength={6}
              size={6}
              onChange={this.handlePasswordChange}
              value={this.state.password}
            ></OTPTextBox>
          </OTPContainer> */}
          <Button
            style={{
              width: "250px",
              float: "left",

              backgroundImage: "none",
              backgroundColor: "#b7b7b7",
            }}
            labelStyle={{ color: "#fff" }}
            label={i18n.t("common.cancel")}
            onClick={() => this.setState({ ...this.state, otp: false })}
          ></Button>
          <Button
            style={{
              width: "250px",
              float: "right",
            }}
            disabled={this.state.password.length < 6}
            label={i18n.t("common.confirm")}
            onClick={this.handleConfirmOTP}
          ></Button>
        </StyledModalPopup>
        <Loading
          show={this.state.loading || this.props.wallet.loading}
        ></Loading>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    account: state.account,
    game: state.game,
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    addBilling: (card_id, amount) =>
      dispatch(walletAction.addBilling(card_id, amount)),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
    doWithdraw: (amount, password, user_account_id) =>
      dispatch(walletAction.doWithdraw(amount, user_account_id, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Withdrawal));
