import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
import { connect } from "react-redux";

const Content = styled.div`
  width: 750px;
  margin: 0 auto;
  font-size: 26px;
  text-align: center;
  margin-top: 20px;
  padding: 0 30px;
  color: ${({ theme }) => theme.new_textColor ?? theme.secondary};
`;

const LabelLink = styled(Link)`
  color: ${({ theme }) => theme.new_accent ?? theme.primary};
  text-decoration: none;
`;

const LabelNormal = styled.span`
  color: ${({ theme }) => theme.new_accent ?? theme.primary};
  text-decoration: none;
`;

class BottomNote extends Component {
  handleCSClick = () => {
    const { account, general } = this.props;
    const { token, info } = account;
    const { livechat } = general;

    const name = token ? info.member_username : "";
    const email = token ? info.member_email : "";

    const newURL = livechat
      ? livechat.setting.url
          .replace("{name}", name)
          .replace("{lang}", i18n.language)
          .replace("{email}", email || "")
      : "";

    if (newURL.length) {
      window.open(newURL, "_blank");
    }
  };

  renderBottomNote = () => {
    const { empty, text1, toEdit, link, text2 } = this.props;

    if (empty) {
      return null;
    }

    const bottomNoteText = text1 || i18n.t("share.bottomNote.pleaseContact");

    if (toEdit) {
      return (
        <Content>
          {bottomNoteText}{" "}
          <LabelNormal onClick={toEdit}>
            {text2 || i18n.t("share.bottomNote.liveChat")}
          </LabelNormal>
        </Content>
      );
    } else if (link) {
      return (
        <Content>
          {bottomNoteText}{" "}
          <LabelLink to={link}>
            {text2 || i18n.t("share.bottomNote.liveChat")}
          </LabelLink>
        </Content>
      );
    } else {
      return (
        <Content>
          {bottomNoteText}{" "}
          <LabelNormal onClick={this.handleCSClick}>
            {text2 || i18n.t("share.bottomNote.liveChat")}
          </LabelNormal>
        </Content>
      );
    }
  };

  render() {
    return this.renderBottomNote();
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
  };
};

export default connect(mapStateToProps, null)(BottomNote);
