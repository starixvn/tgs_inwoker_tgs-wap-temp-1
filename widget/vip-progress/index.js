import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { accountAction } from "../../../../api-services/actions/accountAction";
import { walletAction } from "../../../../api-services/actions/walletAction";
import Common from "../../../../utils/Common";
import i18n from "../../../../utils/i18n";

const VipProgressWidgetWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  gap: 20px;
  height: 100%;
  align-items: center;

  color: ${({ theme }) => {
    return theme.profileBlockLabel ? theme.profileBlockLabel : "#2b2bb";
  }};

  .padding {
    padding: 20px 30px;
  }

  .content {
    background: ${({ theme }) => {
      return theme.profileBlockBackground
        ? theme.profileBlockBackground
        : "#fff";
    }};
    padding: 20px;
    border-radius: 20px;

    &.primary {
      background: ${({ theme }) => theme.primary};
      border-radius: 0;
      color: #fff;
    }

    .profile {
      display: flex;
      flex-direction: column;
      gap: 50px;
      padding: 30px;

      .user-info {
        display: flex;
        gap: 20px;
        align-items: flex-end;

        .username {
          margin-bottom: -5px;
          font-size: 60px;
        }

        .vip {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 40px;
          .icon {
            height: 40px;
            width: 40px;
          }
        }
      }

      .progress {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;

        .progressbar-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }
      }
    }

    .progressbar-wrapper {
      display: flex;
      flex-direction: column;

      .status {
        display: flex;
        justify-content: flex-end;
        margin-bottom: -8px;
        font-size: 24px;
      }

      .outer-progressbar {
        display: flex;
        align-items: center;
        .icon {
          width: 60px;
          height: 60px;
          margin-right: -20px;
          z-index: 2;
        }
        .progressbar {
          width: 100%;
          height: 30px;
          background-color: #d9d9d9;
          border-radius: 50px;
          z-index: 0;
          position: relative;

          .fill {
            border-radius: 50px;
            height: 30px;
            z-index: 1;
          }

          .slashed {
            width: 100%;
            border-radius: 50px;
            height: 30px;
            z-index: 2;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }

    .refresh {
      border-radius: 50px;
      height: 60px;
      width: 60px;
      background: ${({ theme }) => theme.primary};
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.3s ease-in-out;
      cursor: pointer;

      &.alt {
        background: ${({ theme }) => theme.loginRegisterBtnText};

        .icon {
          background: #000;
        }
      }

      &:hover {
        transform: rotate(360deg);
        animation: rotate 2s linear infinite; // Add animation property
      }

      .icon {
        width: 30px;
        height: 30px;
        mask: url(${process.env.PUBLIC_URL +
          "/assets/images/iconpack/reload.png"})
          no-repeat center;
        mask-size: contain;
        background: ${({ theme }) => theme.primaryText};
      }
    }

    .wallets {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      font-size: 24px;

      .wallet {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        align-items: center;

        .title {
          font-weight: bold;
          font-size: 24px;
        }

        .balance {
          display: flex;
          text-align: right;
          justify-content: flex-end;
          align-items: center;
          gap: 20px;
        }
      }
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

const VipProgressWidget = ({
  account,
  game,
  wallet,
  getGameBalance,
  updateBalanceList,
  getAccountInfo,
}) => {
  const getAllGameBalance = () => {
    game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter((item) => item.gpcode !== "NTTF" && item.gpcode !== "RTTF")
      .map((a) => {
        return getGameBalance(a.gpcode);
      });
  };

  const getWalletBalance = () => {
    updateBalanceList();
    getAllGameBalance();
  };

  const RefreshButton = ({ wallet, alt }) => {
    const handleRefreshClick = () => {
      if (wallet) {
        getWalletBalance();
      } else {
        getAccountInfo();
      }
    };
    return (
      <div
        className={`refresh ${alt ? "alt" : ""}`}
        onClick={handleRefreshClick}
      >
        <div className="icon" />
      </div>
    );
  };

  const WalletRow = ({ title, balance }) => {
    return (
      <div className="wallet">
        <div className="title">{title}:</div>
        <div className="balance">
          <div>
            {`${wallet.mainSymbol}${Common.formatNumberWithThousand(balance)}`}
          </div>
          <RefreshButton wallet />
        </div>
      </div>
    );
  };

  const ProgressBar = ({ icon, title, current, require, color }) => {
    const fill = (current / require) * 100;
    return (
      <div className="progressbar-wrapper">
        <div className="status">
          {i18n.t(title)}:{` ${current}/${require}`}
        </div>

        <div className="outer-progressbar">
          <img
            className="icon"
            src={
              process.env.PUBLIC_URL + "/assets/images/misc/" + icon + ".png"
            }
            alt={icon}
          />
          <div className="progressbar">
            <div
              className="fill"
              style={{ width: fill + "%", background: color }}
            />
            <img
              className="slashed"
              src={process.env.PUBLIC_URL + "/assets/images/misc/slashed.png"}
              alt="lines"
            />
          </div>
        </div>
      </div>
    );
  };

  //get ingame balance
  const ingamebalance = game.providerList.reduce((acc, item) => {
    if (item.transferwallet === true) {
      acc += parseFloat(item.balance);
    }
    return acc;
  }, 0);

  return (
    <VipProgressWidgetWrapper>
      <div className="content primary">
        <div className="profile">
          <div className="user-info">
            <div className="username">{account?.info?.member_username}</div>
            <div className="vip">
              <img
                className="icon"
                src={
                  process.env.PUBLIC_URL +
                  "/assets/images/vip/" +
                  account?.info?.member_level_id +
                  ".png"
                }
                alt="vip-icon"
              />
              <div>VIP{account?.info?.member_level_id}</div>
            </div>
          </div>
          <div className="progress">
            <div className="progressbar-container ">
              <ProgressBar
                current={account?.info?.accumdeposit}
                require={account?.info?.levelupaccumulatedeposit}
                color="#FB9900"
                title="vip.totalDeposit"
                icon="coin"
              />
              <ProgressBar
                current={account?.info?.accumturnover}
                require={account?.info?.levelupaccumulatebetamount}
                color="#EE5600"
                title="vip.totalVaildBet"
                icon="dice"
              />
            </div>
            <RefreshButton alt />
          </div>
        </div>
      </div>
      <div className="padding">
        <div className="content ">
          <div className="wallets">
            <WalletRow
              title={i18n.t("web.account.header.mainWallet")}
              balance={wallet.mainBalance}
            />
            {game.containTransferWallet && (
              <WalletRow
                title={i18n.t("web.account.header.allGameWallet")}
                balance={ingamebalance}
              />
            )}
            <WalletRow
              title={i18n.t("web.account.header.total")}
              balance={wallet.mainBalance + ingamebalance}
            />
          </div>
        </div>
      </div>
    </VipProgressWidgetWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    game: state.game,
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
    updateBalanceList: () => dispatch(walletAction.updateBalanceList()),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VipProgressWidget);
