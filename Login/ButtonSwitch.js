import React, { Component } from "react";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";

const Container = styled.div`
  margin: 20px auto 0 auto;

  font-weight: 500;

  box-shadow: none;

  position: relative;

  width: 635px;
  height: 81px;

  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const SwitchTextContainerComponent = styled.div`
  height: 81px;

  text-align: center;

  font-size: 32px;

  color: #000;
  font-weight: ${({ theme }) =>
    theme.new_gradientBackground ? "bold" : "normal"};
  text-transform: ${({ theme }) =>
    theme.new_gradientBackground ? "uppercase" : "capitalize"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;

  background: ${({ active, theme }) => {
    return active
      ? `linear-gradient(180deg, rgba(255, 223, 156, 1) 0%, rgba(211, 176, 96, 1) 100%)`
      : ` rgba(255, 255, 255, 0.2);`;
  }};
`;

class ButtonSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activation: config.features.SMSVerification,
    };
  }
  // constructor(props) {
  //   super(props);
  // }

  // handleChangeSelection = index => {
  //   this.setState({
  //     ...this.state,
  //     selected: index
  //   });
  // };
  render() {
    return (
      <Container>
        <SwitchTextContainerComponent
          active={this.props.selected === 0}
          onClick={() => this.props.handleChangeSelection(0)}
        >
          {i18n.t("common.login")}
        </SwitchTextContainerComponent>
        <SwitchTextContainerComponent
          active={this.props.selected === 1}
          onClick={() => this.props.handleChangeSelection(1)}
        >
          {i18n.t("common.register")}
        </SwitchTextContainerComponent>
        {
          // this.state.activation ? (
          //   <SwitchTextrightContainer
          //     style={{ width: "200px" }}
          //     active={this.props.selected === 2}
          //     onClick={() => this.props.handleChangeSelection(2)}
          //   >
          //     {i18n.t("web.register.activation")}
          //   </SwitchTextrightContainer>
          // ) : null
        }
      </Container>
    );
  }
}
export default ButtonSwitch;
