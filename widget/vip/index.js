import React, { useEffect } from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";

const WidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  .selection-zone {
    display: -webkit-inline-box;
    cursor: pointer;
    gap: 20px;
    overflow-x: auto;
    padding: 20px 0;

    .vip-level-selector {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      cursor: pointer;
      &.selected {
        color: ${({ theme }) => theme.primary};
        img {
          -webkit-filter: drop-shadow(
            0px 0px 5px rgba(${({ theme }) => theme.primaryGradientRgb}, 0.5)
          );
          filter: drop-shadow(
            0px 0px 5px rgba(${({ theme }) => theme.primaryGradientRgb}, 0.5)
          );
          transition: filter 0.5s ease-in-out;
        }
      }

      img {
        width: 120px;
        height: 120px;
      }

      .vip-label {
        font-weight: bold;
      }
    }
  }

  .info-zone {
    gap: 20px;

    .bonus {
    }
    .levelup {
    }
    .rebate {
    }

    .section {
      .title {
        text-align: center;
        background: ${({ theme }) => theme.primary};
        border-radius: 6px;
        color: white;
        padding: 20px 0;
      }

      .content {
        padding: 10px 0;
        &.row {
          display: flex;
          justify-content: space-between;
        }

        &.col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .data {
          &.row {
            display: flex;
            justify-content: space-between;
          }

          &.col {
            display: flex;
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
        }
      }
    }
  }
`;

const VipWidget = ({ vip }) => {
  const sortedVip = vip?.length ? vip?.sort((a, b) => a.level - b.level) : [];

  const [selected, setSelected] = React.useState(sortedVip[0]);

  useEffect(() => {
    setSelected(sortedVip[0]);
  }, [vip]);

  const Data = ({ title, value, isCol }) => {
    return (
      <div className={isCol ? "data col" : "data row"}>
        <div>{title}</div>
        <div>{value}</div>
      </div>
    );
  };

  return (
    <WidgetWrapper>
      <div className="selection-zone">
        {sortedVip?.map((data, index) => {
          return (
            <div
              key={index}
              className={`vip-level-selector  ${
                selected === data ? "selected" : ""
              }`}
              onClick={() => setSelected(data)}
            >
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/images/vip/" +
                  data.level +
                  ".png"
                }
                alt={"vip-" + data.level}
              />
              <div className="vip-label ">VIP{data.level}</div>
            </div>
          );
        })}
      </div>
      <div className="info-zone">
        <div className="section bonus">
          <div className="title">{i18n.t("vip.bonus")}</div>
          <div className="content col">
            <Data
              title={i18n.t("vip.levelUpBonus")}
              value={selected?.promotionBenefit}
            />
            <Data
              title={i18n.t("vip.birthBenefit")}
              value={selected?.birthBenefit}
            />
            <Data
              title={i18n.t("vip.quarterlyBenefit")}
              value={selected?.quarterlyBenefit}
            />
          </div>
        </div>
        <div className="section levelup">
          <div className="title">{i18n.t("vip.levelUp")}</div>
          <div className="data row">
            <div className="content col">
              <Data
                title={i18n.t("vip.totalDeposit")}
                value={selected?.levelUpAccumulateDeposit}
              />
              <Data
                title={i18n.t("vip.totalVaildBet")}
                value={selected?.levelUpAccumulateBetAmount}
              />
            </div>
          </div>
        </div>
        <div className=" section rebate">
          <div className="title">{i18n.t("vip.vipBenefit")}</div>
          <div className="content col">
            <Data
              title={i18n.t("vip.liveDealerRebate")}
              value={selected?.liveDealerRebate + "%"}
            />
            <Data
              title={i18n.t("vip.slotRebate")}
              value={selected?.slotRebate + "%"}
            />
            <Data
              title={i18n.t("vip.cardGameRebate")}
              value={selected?.cardGameRebate + "%"}
            />
            <Data
              title={i18n.t("vip.sportsRebate")}
              value={selected?.sportsRebate + "%"}
            />
            <Data
              title={i18n.t("vip.virtualSportsRebate")}
              value={selected?.virtualSportsRebate + "%"}
            />
            <Data
              title={i18n.t("vip.lotteryRebate")}
              value={selected?.lotteryRebate + "%"}
            />
          </div>
        </div>
      </div>
    </WidgetWrapper>
  );
};

export default VipWidget;
