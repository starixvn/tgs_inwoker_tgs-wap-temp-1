import React, { Component } from "react";
import styled from "styled-components";


const Container = styled.div`
  margin: 0 auto;

  width: 635px;
  height: 80px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
`;

const TextSpan = styled.span`
  margin: 22px 0 0 35px;
  width: 56px;
  height: 38px;
  float: left;
  background: url(${(props) => props.icon}) no-repeat;
  background-size: contain;
`;

const InputTextBox = styled.input`
  width: 410px;
  font-size: 30px;
  float: left;
  background: none;
  border: none;
  padding-left: 20px;
  margin-top: 20px;
  &::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.7);
    font-size: 23px;
  }
  &:-webkit-autofill {
    /* -webkit-text-fill-color: ${({ theme }) =>
      theme.new_textfieldPlaceholder ?? "#b7b7b7"}; */
      -webkit-text-fill-color: #000;
  }
`;
const TextContainer = styled.div`
  float: left;
  width: 550px;
  height: 100%;
`;

const RightIcon = styled.div`
  width: 40px;
  height: 60px;
  mask: url(${(props) =>
      props.password === true
        ? props.hidden
          ? process.env.PUBLIC_URL + `/assets/images/wapp/hide-password.png`
          : process.env.PUBLIC_URL + `/assets/images/wapp/show-password.png`
        : ""})
    no-repeat;
  background: rgba(0, 0, 0, 0.7);
  mask-size: contain;
  margin: 25px 25px 0 0;
  display: inline-block;
  float: left;
`;

const TextBox = ({ style, icon, type, value, onChange, maxLength, placeholder, disabled, toggleShow, password, hidePassword, }) => {

  return (
    <Container style={style}>
      <TextContainer>
        {icon && <TextSpan icon={icon}></TextSpan>}
        <InputTextBox
          type={type}
          value={value}
          onChange={(e) => onChange(e)}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled === true ? true : false}
        />
      </TextContainer>
      <RightIcon
        onClick={toggleShow}
        password={password}
        hidden={hidePassword}
      ></RightIcon>
    </Container>
  );
}
export default TextBox; 