import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { generalAction } from "../../../api-services/actions/generalAction";
import Header from "../Share/Header";
import i18n from "../../../utils/i18n";
import styled from "styled-components";
import Compose from "./compose";
import Sent from "./sent";
import Inbox from "./inbox";

const Container = styled.div`
  width: 700px;

  border-radius: 20px;
  font-size: 20px;
  margin: 0px auto;
`;

const UpperTabContainer = styled.div`
  margin: 10px auto;
  padding: 10px 30px;
  display: flex;
  gap: 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const Tabs = styled.div`
  padding: 15px 30px;
  font-size: 20px;
  ${({ active, theme }) => {
    return active
      ? `bordeR: solid 2px ${theme.primary};
      font-weight: bold;`
      : `bordeR: solid 1px ${theme.primary};opacity: 0.8;`;
  }}

  color: ${({ theme, active }) => {
    return active
      ? theme.primary
      : theme.wapSecondary
      ? theme.wapSecondary
      : theme.secondary;
  }} 

  border-radius: 20px;
`;

const Memo = ({
  appHistory,
  account,
  getMemoV2,
  composeMemo,
  replyMemo,
  readMemo,
  deliveryBox,
  alert,
}) => {
  const [selected, setSelected] = useState("compose");
  const [memo, setMemo] = useState([]);
  const [sent, setSent] = useState([]);

  useEffect(() => {
    if (account.token !== "") {
      if (memo.length === 0) {
        getMemoV2().then((result) => {
          if (result.IsSuccess) {
            setMemo(result.data);
          }
        });
      }
      if (sent.length === 0) {
        deliveryBox("get", "", 1, 100).then((result) => {
          if (result.IsSuccess) {
            setSent(result.data);
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const performComposeMemo = (subject, content) => {
    composeMemo(subject, content).then((result) => {
      if (result.IsSuccess) {
        deliveryBox("get", "", 1, 100).then((result) => {
          if (result.IsSuccess) {
            setSent(result.data);
          }
        });
      }
    });
  };

  const performReplyMemo = (letterId, content) => {
    replyMemo(letterId, content).then((result) => {
      if (result.IsSuccess) {
        deliveryBox("get", "", 1, 100).then((result) => {
          if (result.IsSuccess) {
            setSent(result.data);
          }
        });
      }
    });
  };

  const commonprops = {
    memo,
    sent,
    getMemoV2,
    composeMemo,
    replyMemo,
    readMemo,
    deliveryBox,
    alert,
    performComposeMemo,
    performReplyMemo,
  };

  useEffect(() => {
    getMemoV2();
  }, []);
  const handleBackClick = () => {
    appHistory.goBack();
  };
  const Tab = ({ name }) => {
    return (
      <Tabs active={name === selected} onClick={() => setSelected(name)}>
        {i18n.t(name)}
      </Tabs>
    );
  };

  const contentSwitcher = () => {
    switch (selected) {
      case "compose":
        return <Compose {...commonprops} />;
      case "memoinbox":
        return <Inbox {...commonprops} />;
      case "sent":
        return <Sent {...commonprops} />;
      default:
        return <Compose {...commonprops} />;
    }
  };

  return (
    <div>
      <Header
        token={null}
        balance={0}
        background={true}
        onBackClick={handleBackClick}
        title={i18n.t("memo")}
      ></Header>
      <UpperTabContainer>
        <Tab name="compose" />
        <Tab name="memoinbox" />
        <Tab name="sent" />
      </UpperTabContainer>
      <Container>
        <div>{contentSwitcher()}</div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMemoV2: (letterId) => dispatch(generalAction.getMemoV2(letterId)),
    composeMemo: (subject, content) =>
      dispatch(generalAction.composeMemo(subject, content)),
    replyMemo: (letterId, content) =>
      dispatch(generalAction.replyMemo(letterId, content)),
    readMemo: (letterId) => dispatch(generalAction.readMemo(letterId)),
    deliveryBox: (action, id, page, row) =>
      dispatch(generalAction.deliveryBox(action, id, page, row)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Memo);
