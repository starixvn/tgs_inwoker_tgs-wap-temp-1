import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../Share/Header";
import "react-lazy-load-image-component/src/effects/blur.css";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import LayoutOne from "./layout/layout-one";
import LayoutTwo from "./layout/layout-two";
const Container = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  background-size: contain;
`;

const ListView = styled.div`
  padding-top: 10px;
`;

const EmptyPromo = styled.div`
  background: url(${({ image }) => {
      return process.env.PUBLIC_URL + `/assets/images/wapp/${image}`;
    }})
    no-repeat;
  background-size: cover;
  position: relative;

  margin: 10px auto;
  border-radius: 10px;
  width: 690px;
  height: 240px;
`;
const PromoEmptyText = styled.div`
  width: 350px;
  padding-top: 62px;
`;
const PromoEmptyTextLine = styled.div`
  font-size: 34px;
  text-align: center;
  font-weight: bold;
  text-shadow: ${({ gradient }) => gradient};
  background: -webkit-linear-gradient(${({ template }) => template});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
class Promotion extends Component {
  state = {
    list: [],
    selectedTab: 0,
    selectedPromoId: "",
    selectedPromoTitle: "",
    openJoin: false,
    selectedPromoSpecifications: [],
  };
  componentDidMount() {}

  handleTabChange = (tab) => {
    // this.getList(tab);
    this.setState({ ...this.setState, selectedTab: tab });
  };
  handlePromoClick = (id) => {
    this.props.appHistory.replace({
      pathname: "/promotion/" + id,
    });
  };

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };

  handleChangeTab = (event, newValue) => {
    this.setState({ ...this.state, selectedTab: newValue });
  };
  a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      "aria-controls": `wrapped-tabpanel-${index}`,
    };
  }

  imageSwitcher = (template) => {
    switch (template) {
      case 8:
      case "8":
        return "empty-promo-new.jpg";
      default:
        return "empty-promo.png";
    }
  };

  gradientSwitcher = (template) => {
    switch (template) {
      case 8:
      case "8":
        return "#fc0, #fc0";
      default:
        return "#446597, #282828";
    }
  };

  textGradient = (template) => {
    switch (template) {
      case 8:
      case "8":
        return "#fc0 -5px 0 10px";
      default:
        return "";
    }
  };
  render() {
    const commonprops = {
      promotionList: this.props.general.promotionList,
      handlePromoClick: this.handlePromoClick,
    };

    const layoutSwitcher = (template) => {
      switch (template) {
        case "V226":
          return <LayoutTwo {...commonprops} />;
        default:
          return <LayoutOne {...commonprops} />;
      }
    };

    return (
      <Container>
        <Header
          onBackClick={this.handleBackClick}
          title={i18n.t("promotion.title")}
        ></Header>{" "}
        <ListView>
          {this.props.general.promotionList.items.length <= 0 ? (
            <EmptyPromo image={this.imageSwitcher(config.wapVersion)}>
              <PromoEmptyText>
                <PromoEmptyTextLine
                  template={this.gradientSwitcher(config.wapVersion)}
                  gradient={this.textGradient(config.wapVersion)}
                  style={
                    i18n.language === "en-US"
                      ? { fontSize: "26px", padding: "0px 32px" }
                      : {}
                  }
                >
                  {i18n.t("promotion.emptyLine1")}
                </PromoEmptyTextLine>
                <PromoEmptyTextLine
                  template={this.gradientSwitcher(config.wapVersion)}
                  gradient={this.textGradient(config.wapVersion)}
                >
                  {i18n.t("promotion.emptyLine2")}
                </PromoEmptyTextLine>
              </PromoEmptyText>
            </EmptyPromo>
          ) : (
            layoutSwitcher(config.brand)
          )}
        </ListView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
    general: state.general,
    token: state.account.token,
  };
};
const mapDispatchToProps = (dispatch) => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Promotion));
