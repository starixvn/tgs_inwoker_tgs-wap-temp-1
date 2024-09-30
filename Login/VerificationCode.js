import React, { Component } from "react";
import styled from "styled-components";
import ButtonWap from "../../Share/ButtonWap";
import i18n from "../../../utils/i18n";
const Container = styled.div`
  margin: 0 auto;

  width: 635px;
  height: 80px;
  border-radius: 6px;
  border: solid 1px #676666;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
`;

const InputTextBox = styled.input`
  width: 300px;
  color: #000;
  font-size: 30px;
  float: left;
  background: none;
  border: none;
  padding-left: 0;

  margin: 20px 10px;
  &::-webkit-input-placeholder {
    color: #b7b7b7;
    font-size: 23px;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: #b7b7b7;
  }
`;

const TextContainer = styled.div`
  float: right;
  width: 100%;
  height: 100%;
`;

class VerificationCode extends Component {
  render() {
    return (
      <React.Fragment>
        <Container
          style={{
            margin: " 20px 0 20px 57px",
            width: "395px",
            float: "left",
          }}
        >
          <TextContainer>
            <InputTextBox
              type={this.props.type}
              value={this.props.value}
              onChange={this.props.onChange}
              maxLength={this.props.maxLength}
              placeholder={this.props.placeholder}
              disabled={this.props.disabled === true ? true : false}
            />
          </TextContainer>
        </Container>
        <ButtonWap
          style={{
            float: "right",
            width: "230px",
            margin: "20px 57px 0 0",
            height: "80px",
          }}
          name={
            this.props.countdown <= 0
              ? i18n.t("common.msgSendToken")
              : i18n.t("common.btnTokenResendLabel") +
                "(" +
                this.props.countdown +
                "s)"
          }
          onClick={this.props.handleGetCodeClick}
        ></ButtonWap>
      </React.Fragment>
    );
  }
}
export default VerificationCode;