import React from "react";
import styled from "styled-components";
import VipProgressBar from "../../../widget/vip-progress";
import i18n from "../../../../../utils/i18n";
import config from "../../../../../config/config";
import { connect } from "react-redux";
import ButtonWap from "../../../../Share/ButtonBlankWap";
import { accountAction } from "../../../../../api-services/actions/accountAction";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 24px;

  .profile-section {
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    height: auto;
    padding-bottom: 200px;

    .widget {
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: center;

      .icon {
        height: 80px;
        width: 80px;
      }
      .dark-filter{
        -webkit-filter: brightness(30%); 
        filter: brightness(30%);
      }
    }

    .widgets {
      background: #fff;
      border-radius: 20px;
      padding: 20px;
      display: flex;
      justify-content: space-around;
    }

    .navigation {
      gap: 20px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      .button {
        background: #fff;
        border-radius: 20px;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 20px;
      }
    }

    .logout-button {
      background: ${({ theme }) => theme.primary};
      color: #fff;
      padding: 30px;
      border-radius: 20px;
      font-size: 24px;
      text-align: center;
    }
  }
`;

const WidgetButton = ({ navigate, path, icon, title }) => {
  const className = path === '/reward' ? 'icon dark-filter' : 'icon';  
  return (
    <div
      className="widget"
      onClick={() => { 
        navigate(path);
      }}
    >
      <img 
        className={className}
        imgColor={path}
        src={process.env.PUBLIC_URL + `/assets/images/wapp/${icon}`}
        alt={title}
      ></img>
      <div>{title}</div>
    </div>
  );
};

const ProgressBarVersion = ({
  navigate,
  game,
  wallet,
  general,
  accountLogout,
  account,
}) => {
  var checkTransferWallet =
    Object.values(game.providerList).filter(
      (item) => item.transferwallet === true
    ).length > 0;

  const handleLogoutClick = () => {
    accountLogout(account.token).then((response) => {
      if (response.IsSuccess) {
        navigate("/");
      }
    });
  };



  return (
    <Wrapper>
      <VipProgressBar />
      <div className="profile-section">
        <div className="widgets">
          <WidgetButton
            path="/deposit"
            icon="icon-profile-deposit.svg"
            title={i18n.t("common.deposit")}
            navigate={navigate}
          />
          {checkTransferWallet && !config.features.NewTransferUI && (
            <WidgetButton
              path="/transfer"
              icon="icon-profile-transfer.svg"
              title={i18n.t("common.transfer")}
              navigate={navigate}
            />
          )}

          <WidgetButton
            path="/withdrawal"
            icon="icon-profile-cashflow.svg"
            title={i18n.t("common.withdrawal")}
            navigate={navigate}
          />
        </div>
        <div className="navigation">
          <div className="button">
            <WidgetButton
              path="/profile"
              icon="icon-profile-profile.svg"
              title={i18n.t("wap.main.account.personalInfo")}
              navigate={navigate}
            />
          </div>
          <div className="button">
            <WidgetButton
              path="/inbox"
              icon="icon-profile-inbox.svg"
              title={i18n.t("wap.main.account.inbox")}
              navigate={navigate}
            />
          </div>
          <div className="button">
            <WidgetButton
              path="/report/2"
              icon="icon-profile-report.svg"
              title={i18n.t("wap.main.account.betReport")}
              navigate={navigate}
            />
          </div>

          <div className="button">
            <WidgetButton
              path="/report/3"
              icon="icon-profile-withdrawal.svg"
              title={i18n.t("wap.main.account.withdrawal")}
              navigate={navigate}
            />
          </div>

          {config.features.ShowWagering && 
            (<div className="button">
            <WidgetButton
              path="/wagering"
              icon="icon-wagering.svg"
              title={i18n.t("t29.wagering")}
              navigate={navigate}
            />
          </div>)
          }

          <div className="button">
            <WidgetButton
              path="/report/4"
              icon="icon-profile-topup.svg"
              title={i18n.t("wap.main.account.deposit")}
              navigate={navigate}
            />
          </div>

          {checkTransferWallet && (
            <div className="button">
              <WidgetButton
                path="/report/6"
                icon="icon-profile-transfer.svg"
                title={i18n.t("wap.main.account.transfer")}
                navigate={navigate}
              />
            </div>
          )}
          <div className="button">
            <WidgetButton
              path="/report/8"
              icon="icon-profile-transfer.svg"
              title={i18n.t("report.balanceChanges.title")}
              navigate={navigate}
            />
          </div>
          {general.haveAffiliate && (
            <div className="button">
              <WidgetButton
                path="/affiliate"
                icon="icon-affiliate.svg"
                title={i18n.t("web.account.affiliate")}
                navigate={navigate}
              />
            </div>
          )}

          <div className="button">
            <WidgetButton
              path="/card"
              icon="icon-profile-card.svg"
              title={i18n.t("wap.main.account.manageBank")}
              navigate={navigate}
            />
          </div>
          <div className="button">
            <WidgetButton
              path="/setting/language"
              icon="icon-profile-language.svg"
              title={i18n.t("common.language")}
              navigate={navigate}
            />
          </div>
          <div className="button">
            <WidgetButton
              path="/reward"
              icon="icon-reward_2.png"
              title={i18n.t("common.reward")}
              navigate={navigate}
            />
          </div>
          {config.features.HaveVIPFeature && (
            <div className="button">
              <WidgetButton path="/vip" icon="icon-vip.svg" title="VIP" navigate={navigate}/>
            </div>
          )}

          {config.features.HaveDownloadFeature && (
            <div className="button">
              <WidgetButton
                path="/main/download"
                icon="icon-download.svg"
                title={i18n.t("wap.main.account.appDownload")}
                navigate={navigate}
              />
            </div>
          )}
        </div>
        <div
          className="logout-button"
          onClick={() => {
            handleLogoutClick();
          }}
        >
          {i18n.t("wap.main.account.signout")}
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    game: state.game,
    wallet: state.wallet,
    general: state.general,
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBarVersion);
