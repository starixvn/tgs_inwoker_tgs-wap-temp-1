import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Router, Switch, Route } from "react-router";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import My from "./My/index";
import Home from "./Home/index";
import i18n from "../../../utils/i18n";
import Support from "./Support/index";
import Download from "../Download";

const StyledBottomAppBar = withStyles({
  root: {
    height: "90px",
    top: "auto",
    bottom: 0,
  },
})(AppBar);
const CustomBottomNavigation = withStyles((theme) => ({
  root: {
    backgroundImage:
      "linear-gradient(to top, " +
      theme.palette.primary.mainGradient +
      ", " +
      theme.palette.primary.main +
      ")",
  },
}))(BottomNavigation);
const CustomBottomNavigationAction = withStyles({
  root: {
    width: "570px",
    height: "90px",
    "&.Mui-selected": {
      "& .MuiBottomNavigationAction-wrapper>div": {
        backgroundColor: "#fde73f",
      },
    },
  },
  label: {
    fontSize: "21px",
    marginTop: "5px",
    color: (props) => (props.selected ? "#d09f58" : "#ffffff"),

    "&.Mui-selected": {
      fontSize: "21px !important",
      marginTop: "5px",
      color: "#fde73f",
    },
  },
})(BottomNavigationAction);

const BottomNavigatorFrame = styled.div`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;

  mask-image: url(${(props) => props.src});
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: auto 40px;
  mask-mode: alpha;
  background-blend-mode: multiply;
  background-color: #fff;
  width: 60px;
  height: 50px;
`;
const BottomNavigatorPlus = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/icon-plus.png`})
    no-repeat center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70px 70px;
  background-color: ${(props) => props.theme.secondary};
  border-radius: 50%;
  width: 70px;
  height: 70px;
`;
const StyledDialog = withStyles({
  root: {
    "& .MuiDialog-paperWidthSm": {
      width: "100%",
      height: "100%",
      maxWidth: "750px",
      maxHeight: "100%",
      margin: 0,
    },
  },
  paper: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
})(Dialog);
const MenuContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const ButtonCloseMenu = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/icon-menu-close.png`})
    no-repeat;
  background-size: 68px;
  width: 68px;
  height: 68px;
  margin: 50px auto;
`;
const MenuItemWrap = styled.div`
  margin-top: 50%;
`;
const MenuImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #383737;
  border-radius: 50%;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 68px;
  margin: 0 auto;

  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: solid 2px #5ceeff;
`;
const Menuitem = styled.div`
  width: calc(100% / 3);
  float: left;
  margin-top: 50px;
`;
const MenuLabel = styled.div`
  font-size: 22px;
  text-align: center;
  color: #5ceeff;
  margin-top: 10px;
`;
class Main extends Component {
  state = {
    currentPage: this.props.history.location.pathname,
    showMenu: false,
  };
  // GetSupportUrl = (userid, name, question) => {
  //   var response = SupportService.GetLiveSupport(
  //     userid,
  //     name,
  //     question,
  //     document.URL,
  //     document.referrer
  //   )
  //   if (response.IsSuccess) {
  //     window.open(response.data.online, "_blank")

  //   } else {
  //     this.props.alert("", response.info);

  //   }
  // };
  handleContactCs = () => {
    if (this.props.account.token == null) {
      // AppHistory.push("/" + i18n.language + value);
      this.props.GetSupportUrl("", "", "", "");
    } else {
      this.props.GetSupportUrl(
        "",
        this.props.account.info.member_username,
        "",
        this.props.account.info.member_email
      );
    }
  };

  handleChangeSelection = (value) => {
<<<<<<< HEAD
    if (value === '/main/profile' && this.props.account.token == null) {
      this.props.appHistory.push('/' + i18n.language + '/login')
=======
    if (value === "/main/profile" && this.props.account.token == null) {
      this.props.appHistory.push("/" + i18n.language + "/login");
>>>>>>> release/current
    } else {
      //if (value === "/customer-service") {
      //  if (this.props.account.token == null) {
      //    // AppHistory.push("/" + i18n.language + value);
      //    this.props.GetSupportUrl("", "", "");
      //  } else {
      //    this.props.GetSupportUrl(
      //      "",
      //      this.props.account.info.member_username,
      //      ""
      //    );
      //  }
      // } else
      {
        this.setState({
          ...this.state,
<<<<<<< HEAD
          currentPage: value
        })
        this.props.appHistory.push('/' + i18n.language + value)
=======
          currentPage: value,
        });
        this.props.appHistory.push("/" + i18n.language + value);
>>>>>>> release/current
      }
    }
  };
  toggleMenu = () => {
    if (this.props.account.token == null) {
<<<<<<< HEAD
      this.props.appHistory.push('/' + i18n.language + '/login')
=======
      this.props.appHistory.push("/" + i18n.language + "/login");
>>>>>>> release/current
    } else {
      this.setState({ ...this.state, showMenu: true });
    }
  };
  handleCloseMenu = () => {
    this.setState({ ...this.state, showMenu: false });
  };

  componentRenderer = (route) => {
    switch (route) {
      case "main":
        return (
          <Home
            navigate={this.props.navigate}
            appHistory={this.props.appHistory}
          />
        );
      case "profile":
        return (
          <My
            navigate={this.props.navigate}
            appHistory={this.props.appHistory}
          />
        );
      case "support":
        return (
          <Support
            alert={this.props.alert}
            navigate={this.props.navigate}
            cs={this.handleContactCs}
          />
        );
      case "download":
        return <Download />;
      default:
        return (
          <Home
            navigate={this.props.navigate}
            appHistory={this.props.appHistory}
          />
        );
    }
  };

  render() {
    const { page } = this.props.match.params;

    var checkTransferWallet =
      Object.values(this.props.game.providerList).filter(
        (item) => item.transferwallet === true
      ).length > 0;
    return (
      <React.Fragment>
        {this.componentRenderer(page)}
        <StyledDialog open={this.state.showMenu} onClose={this.handleCloseMenu}>
          <MenuContainer>
            <MenuItemWrap>
              <Menuitem onClick={() => this.handleChangeSelection("/deposit")}>
                <MenuImage
                  img={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-menu-deposit.png`
                  }
                ></MenuImage>
<<<<<<< HEAD
                <MenuLabel>
                  {i18n.t('wap.main.menuDrawer.deposit')}
                </MenuLabel>
=======
                <MenuLabel>{i18n.t("wap.main.menuDrawer.deposit")}</MenuLabel>
>>>>>>> release/current
              </Menuitem>

              {checkTransferWallet && (
                <Menuitem
                  onClick={() => this.handleChangeSelection("/transfer")}
                >
                  <MenuImage
                    img={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-menu-transfer.png`
                    }
                  ></MenuImage>
                  <MenuLabel>
<<<<<<< HEAD
                    {i18n.t('wap.main.menuDrawer.transfer')}
=======
                    {i18n.t("wap.main.menuDrawer.transfer")}
>>>>>>> release/current
                  </MenuLabel>
                </Menuitem>
              )}

              <Menuitem
                onClick={() => this.handleChangeSelection("/withdrawal")}
              >
                <MenuImage
                  img={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-menu-withdrawal.png`
                  }
                ></MenuImage>
                <MenuLabel>
<<<<<<< HEAD
                  {i18n.t('wap.main.menuDrawer.withdrawal')}
=======
                  {i18n.t("wap.main.menuDrawer.withdrawal")}
>>>>>>> release/current
                </MenuLabel>
              </Menuitem>

              <Menuitem onClick={() => this.handleChangeSelection("/report/2")}>
                <MenuImage
                  img={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-menu-report.png`
                  }
                ></MenuImage>
<<<<<<< HEAD
                <MenuLabel>
                  {i18n.t('wap.main.account.betReport')}
                </MenuLabel>
=======
                <MenuLabel>{i18n.t("wap.main.account.betReport")}</MenuLabel>
>>>>>>> release/current
              </Menuitem>

              {/* <Menuitem onClick={() => this.handleChangeSelection("/report/2")}>
                <MenuImage img={IconMenuReport2PNG}></MenuImage>
                <MenuLabel>{i18n.t("wap.main.menuDrawer.betReport")}</MenuLabel>
              </Menuitem>
            */}
              <Menuitem onClick={() => this.handleChangeSelection("/report/3")}>
                <MenuImage
                  img={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-menu-report.png`
                  }
                ></MenuImage>
                <MenuLabel>
<<<<<<< HEAD
                  {i18n.t('wap.main.menuDrawer.withdrawalReport')}
=======
                  {i18n.t("wap.main.menuDrawer.withdrawalReport")}
>>>>>>> release/current
                </MenuLabel>
              </Menuitem>
              <Menuitem onClick={() => this.handleChangeSelection("/report/4")}>
                <MenuImage
                  img={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-menu-report.png`
                  }
                ></MenuImage>
                <MenuLabel>
<<<<<<< HEAD
                  {i18n.t('wap.main.menuDrawer.depositReport')}
=======
                  {i18n.t("wap.main.menuDrawer.depositReport")}
>>>>>>> release/current
                </MenuLabel>
              </Menuitem>
              <Menuitem onClick={() => this.handleChangeSelection("/card")}>
                <MenuImage
                  img={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-menu-card.png`
                  }
                ></MenuImage>
<<<<<<< HEAD
                <MenuLabel>
                  {i18n.t('wap.main.menuDrawer.bankCard')}
                </MenuLabel>
=======
                <MenuLabel>{i18n.t("wap.main.menuDrawer.bankCard")}</MenuLabel>
>>>>>>> release/current
              </Menuitem>

              <Menuitem onClick={() => this.handleChangeSelection("/inbox")}>
                <MenuImage
                  img={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-menu-inbox.png`
                  }
                ></MenuImage>
<<<<<<< HEAD
                <MenuLabel>
                  {i18n.t('wap.main.menuDrawer.inbox')}
                </MenuLabel>
=======
                <MenuLabel>{i18n.t("wap.main.menuDrawer.inbox")}</MenuLabel>
>>>>>>> release/current
              </Menuitem>
            </MenuItemWrap>
            <ButtonCloseMenu onClick={this.handleCloseMenu}></ButtonCloseMenu>
          </MenuContainer>
        </StyledDialog>
        <StyledBottomAppBar position="fixed" color="default">
          <CustomBottomNavigation
            value={this.state.currentPage}
            showLabels
            style={{ width: "750px", height: "90px" }}
          >
            <CustomBottomNavigationAction
<<<<<<< HEAD
              label={i18n.t('wap.main.homePage')}
              value='/main/home'
              onClick={() => this.handleChangeSelection('/main/home')}
=======
              label={i18n.t("wap.main.homePage")}
              value="/main/home"
              onClick={() => this.handleChangeSelection("/main/home")}
>>>>>>> release/current
              icon={
                <BottomNavigatorFrame
                  src={
                    process.env.PUBLIC_URL + `/assets/images/wapp/icon-home.png`
                  }
                />
              }
            />
            <CustomBottomNavigationAction
<<<<<<< HEAD
              label={i18n.t('wap.main.promo')}
              value='/promotion-list'
              onClick={() => this.handleChangeSelection('/promotion-list')}
=======
              label={i18n.t("wap.main.promo")}
              value="/promotion-list"
              onClick={() => this.handleChangeSelection("/promotion-list")}
>>>>>>> release/current
              icon={
                <BottomNavigatorFrame
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-promotion.png`
                  }
                />
              }
            />
            <CustomBottomNavigationAction
              onClick={this.toggleMenu}
              label=""
              icon={
                <BottomNavigatorPlus
                  selected={this.props.currentPage === "/"}
                />
              }
            />

            <CustomBottomNavigationAction
<<<<<<< HEAD
              onClick={() => this.handleChangeSelection('/main/support')}
              value='/customer-service'
              label={i18n.t('wap.main.cs')}
=======
              onClick={() => this.handleChangeSelection("/main/support")}
              value="/customer-service"
              label={i18n.t("wap.main.cs")}
>>>>>>> release/current
              icon={
                <BottomNavigatorFrame
                  src={
                    process.env.PUBLIC_URL + `/assets/images/wapp/icon-cs.png`
                  }
                />
              }
            />
            <CustomBottomNavigationAction
<<<<<<< HEAD
              label={i18n.t('wap.main.my')}
              value='/main/profile'
              onClick={() => this.handleChangeSelection('/main/profile')}
=======
              label={i18n.t("wap.main.my")}
              value="/main/profile"
              onClick={() => this.handleChangeSelection("/main/profile")}
>>>>>>> release/current
              icon={
                <BottomNavigatorFrame
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-profile.png`
                  }
                />
              }
            />
          </CustomBottomNavigation>
        </StyledBottomAppBar>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    game: state.game,
  };
};

export default connect(mapStateToProps, null)(withRouter(Main));
