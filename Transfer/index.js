import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../../Wap/Share/Header";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Dialog";
import Switch from "@material-ui/core/Switch";
import DynamicFont from "react-dynamic-font";
import { accountAction } from "../../../api-services/actions/accountAction";
import { walletAction } from "../../../api-services/actions/walletAction";
import { WalletType } from "../../../api-services/utils/Enum";
import { RESET_WALLETRESULT } from "../../../api-services/constant/actionType";
import Loading from "../../Wap/Share/Loading";
import Common from "../../../utils/Common";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import Button from "../component/button";
import {CommonUtil} from "../../Common/utilc";

const Container = styled.div`
  width: 100%;
  overflow: hidden;

  min-height: 100vh;
`;
const RefreshLabel = styled.div`
  float: right;
  margin: 22px 20px 0 0;
  width: 46px;
  height: 46px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/icon-transfer-refresh`})
    no-repeat;
`;

const ColumnWrap = styled.div`
  float: left;
  min-width: calc(25% - 2px);
`;
const ColumnContainer = styled.div`
  height: 120px;

  padding-top: 20px;
`;
const ColumnGameName = styled.div`
  font-size: 26px;
  color: #141a36;
  text-align: center;
  height: 35px;
`;
const ColumnGameBalance = styled.div`
  font-size: 30px;
  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};
  text-align: center;
  margin-top: 10px;
`;

const DialogHeader = styled.div`
  color: #4a4a4a;
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 10px;
`;
const StyledModal = withStyles((theme) => ({
  paper: {
    borderRadius: "15px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
  },
}))(Modal);

const CustomSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    marginLeft: 8,
    zoom: 1.75,
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        background: "linear-gradient(to bottom,#FFDF9C,#D3B060)",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const CustomSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 24px;
  color: ${({ theme }) =>
    theme.new_textColor ? theme.new_textColor : theme.secondary};
`;

const CustomTextField = styled.div`
  display: grid;
  grid-template-columns: 40vw auto;
  background: white;
  font-size: 32px;
  height: 80px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.5);
  padding-right: 20px;
`;

const CustomTextFieldLabel = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 32px;
  padding: 0px 20px;
`;

const CustomTextInput = styled.input`
  font-size: 32px;
  border: solid 0px black;
`;

const CustomSelect = styled.select`
  font-size: 32px;
  border: solid 0px black;
`;

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transferAmount: "",
      fromWallet: "0",
      toWallet: "0",
      loading: false,
      open: false,
      mainAccountId: "0",
      walletBalance: [],
      disabled: false,
    };
  }

  componentDidMount() {
    this.props.getBalanceList();
    this.getAllGameBalance();
  }
  componentDidUpdate(preProps) {
    if (
      this.props.game.providerList.length !==
        preProps.game.providerList.length &&
      this.props.game.providerList.length > 0
    ) {
      this.getAllGameBalance();
    }
    if (
      preProps.wallet.transferResult !== this.props.wallet.transferResult &&
      this.props.wallet.transferResult !== null
    ) {
      if (this.props.wallet.transferResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.getAllGameBalance();
        this.setState({
          transferAmount: "",
          fromWallet: 0,
          toWallet: "",
          loading: false,
          open: false,
        });
      } else {
        this.props.alert("", this.props.wallet.transferResult.info);
      }
    }

    if (
      preProps.wallet.withdrawalAllResult !==
        this.props.wallet.withdrawalAllResult &&
      this.props.wallet.withdrawalAllResult !== null
    ) {
      if (this.props.wallet.withdrawalAllResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.setState({
          transferAmount: "",
          fromWallet: 0,
          toWallet: "",
          loading: false,
          open: false,
        });
      } else {
        this.props.alert("", this.props.wallet.withdrawalAllResult.info);
      }
    }
  }

  resetWalletBalance = () => {
    this.setState({
      ...this.state,
      walletBalance: [],
    });
  };

  getAllGameBalance = () => {
    this.resetWalletBalance();
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter((item) => item.gpcode !== "NTTF" && item.gpcode !== "RTTF")
      .map((a) => {
        this.props.getGameBalance(a.gpcode).then((e) => {
          if (e) {
            if (e.IsSuccess) {
              this.setState({
                ...this.state,
                walletBalance: [
                  ...this.state.walletBalance,
                  {
                    abbreviation: a.abbreviation,
                    balance: e.data.balance,
                  },
                ],
              });
            }
          } else {
            console.log(a.gpcode);
          }
        });
      });
  };
  handleRefreshClick = () => {
    this.props.getBalanceList();
    this.getAllGameBalance();
  };

  GetTransferWalletQuickList = (transferWalletList) => {
    return transferWalletList
      .filter(function (wallet) {
        return wallet.purse_type !== WalletType.MainWallet;
      })
      .map((item, index) => (
        <ColumnWrap key={index} disabled={item.maintenance === 1}>
          <ColumnContainer>
            <ColumnGameName>{item.name}</ColumnGameName>
            <ColumnGameBalance>
              <DynamicFont
                content={
                  item.maintenance === 1
                    ? i18n.t("transfer.maintenance")
                    : item.symbol + Common.formatNumberWithCommas(item.balance)
                }
              ></DynamicFont>
            </ColumnGameBalance>
          </ColumnContainer>
        </ColumnWrap>
      ));
  };
  handleBackClick = () => {
    this.props.appHistory.goBack();
  };

  handleSubmitClicked = (e) => {
    this.setState({ ...this.state, disabled: true });
    const transferFrom = this.state.fromWallet;
    const transferTo = this.state.toWallet;
    const transferAmount = this.state.transferAmount
      .toString()
      .replace(/,/g, "");
    const balance = this.props.wallet.mainBalance;

    if (
      parseFloat(transferAmount) > parseFloat(balance) &&
      transferFrom === this.state.mainAccountId
    ) {
      if (parseFloat(transferAmount) <= 0) {
        this.props.alert("", i18n.t("transfer.invalidAmount"));
      } else {
        this.props.alert("", i18n.t("transfer.insufficient"));
      }
    } else {
      if (transferFrom === this.state.mainAccountId)
        this.props.doTransfer(transferTo, transferAmount);
      else this.props.doWithdrawalFromGame(transferFrom, transferAmount);
    }
    setTimeout(() => {
      this.setState({ ...this.state, disabled: false });
    }, 1000);
  };
  transfer = (transferFrom, transferTo, transferAmount) => {
    this.props.doTransfer(
      transferAmount,
      this.state.mainAccountId,
      transferTo === this.state.mainAccountId ? transferFrom : transferTo,
      transferFrom === this.state.mainAccountId ? 1 : 2
    );
  };
  handleMaxAmountClicked = (e) => {
    if (this.state.fromWallet === this.state.mainAccountId) {
      this.setState({
        ...this.state,
        transferAmount: this.props.wallet.mainBalance,
      });
    } else {
      this.setState({
        ...this.state,
        transferAmount: this.props.game.providerList.filter(
          (a) => a.gpcode === this.state.fromWallet
        )[0].balance,
      });
    }
  };
  handleWithdrawAllClick = (e) => {
    this.props.doWithdrawAll();
  };

  handleFromWallet = (e) => {
    const fromWallet = e.target.value;

    if (fromWallet !== this.state.mainAccountId) {
      this.setState({
        ...this.state,
        fromWallet: fromWallet,
        toWallet: this.state.mainAccountId,
      });
    } else {
      this.setState({
        ...this.state,
        fromWallet: fromWallet,
        toWallet: "",
      });
    }
  };
  handleToWallet = (e) => {
    const toWallet = e.target.value;

    if (toWallet !== this.state.mainAccountId) {
      this.setState({
        ...this.state,
        fromWallet: this.state.mainAccountId,
        toWallet: toWallet,
      });
    } else {
      this.setState({
        ...this.state,
        fromWallet: this.state.mainAccountId,
        toWallet: toWallet,
      });
    }
  };
  handleTransferAmountChanged = (e) => {
    this.setState({ ...this.state, transferAmount: e.target.value });
  };

  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  handleSwitchAutoTransfer = () => {
    this.props.updateAutoTransferStatus();
  };

  gpNameSwitcher = ({ abbreviation, name }) => {
    if (
      abbreviation &&
      abbreviation.toLowerCase() === "wgfm" &&
      config.brandName === "TIGER"
    )
      return "Tiger Sports";
    else return name ? name : "";
  };

  render() {
    return (
      <Container>
        <Header
          token={null}
          balance={0}
          background={true}
          rightContent={
            <RefreshLabel onClick={this.handleRefreshClick}></RefreshLabel>
          }
          onBackClick={this.handleBackClick}
          title={i18n.t("transfer.title")}
        ></Header>{" "}
        <CustomTextField>
          <CustomTextFieldLabel>
            {i18n.t("transfer.mainAccount")}
          </CustomTextFieldLabel>
          <CustomTextFieldLabel>
            {Common.formatNumberWithCommas(this.props.wallet.mainBalance)}
          </CustomTextFieldLabel>
        </CustomTextField>
        <CustomTextField>
          <CustomTextFieldLabel>
            {i18n.t("transfer.transferFromWallet")}
          </CustomTextFieldLabel>
          <CustomSelect
            onChange={this.handleFromWallet}
            value={this.state.fromWallet}
          >
            <option value={this.state.mainAccountId}>
              {i18n.t("transfer.mainAccount")}
            </option>
            {this.props.game.providerList
              .filter(
                (item) => item.status === 0 && item.transferwallet === true
              )
              .filter((e) => {
                if (config.features.MergeEVORTNT) {
                  if (
                    !(
                      e.gpcode === "NTTF" ||
                      e.gpcode === "RTTF" ||
                      e.gpcode === "BTG" ||
                      e.gpcode === "NLC"
                    )
                  ) {
                    return e;
                  }
                } else {
                  return e;
                }
              })
              .map((item, index) => (
                <option value={item.gpcode} key={index}>
                  {this.gpNameSwitcher(item)}{" "}
                  {`(${this.state.walletBalance
                    .filter((data) => data.abbreviation === item.abbreviation)

                    .map((e) => Common.formatNumberWithThousand(e.balance))})`}
                </option>
              ))}
          </CustomSelect>
        </CustomTextField>
        <CustomTextField>
          <CustomTextFieldLabel>
            {i18n.t("transfer.transferToWallet")}
          </CustomTextFieldLabel>
          <CustomSelect
            onChange={this.handleToWallet}
            value={this.state.toWallet}
          >
            <option value={this.state.mainAccountId}>
              {i18n.t("transfer.mainAccount")}
            </option>
            {this.props.game.providerList
              .filter(
                (item) => item.status === 0 && item.transferwallet === true
              )
              .filter((e) => {
                if (config.features.MergeEVORTNT) {
                  if (
                    !(
                      e.gpcode === "NTTF" ||
                      e.gpcode === "RTTF" ||
                      e.gpcode === "BTG" ||
                      e.gpcode === "NLC"
                    )
                  ) {
                    return e;
                  }
                } else {
                  return e;
                }
              })

              .map((item, index) => (
                <option value={item.gpcode} key={index}>
                  {this.gpNameSwitcher(item)}{" "}
                  {`(${this.state.walletBalance
                    .filter((data) => data.abbreviation === item.abbreviation)

                    .map((e) => CommonUtil.roundUpToTwoDecimals(e.balance))})`}
                </option>
              ))}{" "}
          </CustomSelect>
        </CustomTextField>
        <CustomTextField>
          <CustomTextFieldLabel>{i18n.t("common.amount")}</CustomTextFieldLabel>
          <CustomTextInput
            type={"number"}
            placeholder={i18n.t("transfer.msgEnterAmount")}
            onChange={this.handleTransferAmountChanged}
            value={this.state.transferAmount}
          />
        </CustomTextField>
        <Button
          style={{ margin: "20px", width: "initial" }}
          label={i18n.t("common.confirm")}
          onClick={this.handleSubmitClicked}
          secondary
          disabled={(() => {
            return (
              this.state.transferAmount === 0 ||
              this.state.transferAmount === "" ||
              this.state.toWallet === this.state.fromWallet ||
              this.state.disabled === true
            );
          })()}
        ></Button>
        <CustomSwitchContainer>
          <div>
            {i18n.t("transfer.autoTransfer")} (
            {this.props.wallet.autotransfer === true
              ? i18n.t("transfer.on")
              : i18n.t("transfer.off")}
            )
          </div>
          <CustomSwitch
            checked={this.props.wallet.autotransfer === true}
            onChange={this.handleSwitchAutoTransfer}
          />
        </CustomSwitchContainer>
        <Button
          style={{ margin: "20px", width: "initial" }}
          onClick={() => {
            this.props.performWithdrawFromEveryBrand();
          }}
          label={i18n.t("transfer.oneKeyTransferOut")}
        ></Button>
        <StyledModal onClose={this.handleClose} open={this.state.open}>
          <DialogHeader>温馨提示</DialogHeader>
          以下产品无需转账， <br />
          直接使用主账户馀额进行游戏。
          <br />
          <div
            dangerouslySetInnerHTML={{
              __html: this.state.singleWalletGameName,
            }}
          ></div>
        </StyledModal>
        <Loading
          show={
            this.state.loading ||
            this.props.wallet.loading ||
            this.props.wallet.transferLoading
          }
        ></Loading>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    game: state.game,
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllWallet: (token, platformList) =>
      dispatch(accountAction.getAllWallet(token, platformList)),
    getAccountProfile: (token, showVip) =>
      dispatch(accountAction.getAccountProfile(token, showVip)),
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),

    doWithdrawAll: () => dispatch(walletAction.doWithdrawAll()),
    doTransfer: (gpcode, amount) =>
      dispatch(walletAction.doTransfer(gpcode, amount)),
    doWithdrawalFromGame: (gpcode, amount) =>
      dispatch(walletAction.doWithdrawalFromGame(gpcode, amount)),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    updateAutoTransferStatus: () =>
      dispatch(walletAction.updateAutoTransferStatus()),
    getAutoTransferStatus: () => dispatch(walletAction.getAutoTransferStatus()),
    performWithdrawFromEveryBrand: () =>
      dispatch(walletAction.performWithdrawFromEveryBrand()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Transfer));
