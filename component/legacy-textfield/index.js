import React from "react";
import styled from "styled-components";

const CustomInput = styled.div`
  font-size: 30px;
  margin: 20px;
`;

const CustomInputBackground = styled.div`
  background-color: ${({ theme }) => theme.new_textfieldBackground ?? "#fff"};
  height: 80px;
  color: ${({ theme }) => theme.new_textColor ?? theme.secondary};
  display: flex;
  align-items: center;
  padding: 0 20px;
  flex: ${({ flex }) => flex ?? "0"};
  border-radius: 6px;
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
  background: none;
  border: none;
  color: inherit;
  width: 100%;
  font-size: inherit;

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.new_textfieldPlaceholder ?? "#b7b7b7"};
    font-size: inherit;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: ${({ theme }) =>
      theme.new_textfieldPlaceholder ?? "#b7b7b7"};
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
  background: url(${(props) =>
      props.password === true
        ? props.hidden
          ? process.env.PUBLIC_URL + `/assets/images/wapp/hide-password.png`
          : process.env.PUBLIC_URL + `/assets/images/wapp/show-password.png`
        : ""})
    no-repeat;
  background-size: contain;
  margin: 25px 25px 0 0;
  display: inline-block;
  float: left;
`;
const LegacyTextfield = (props) => {
  return (
    <CustomInput>
      <TextContainer>
        {props.icon && <TextSpan icon={props.icon}></TextSpan>}
        <CustomInputBackground>
          <InputTextBox
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            maxLength={props.maxLength}
            placeholder={props.placeholder}
            disabled={props.disabled === true ? true : false}
          />
        </CustomInputBackground>
      </TextContainer>
      <RightIcon
        onClick={props.toggleShow}
        password={props.password}
        hidden={props.hidePassword}
      ></RightIcon>
    </CustomInput>
  );
};
export default LegacyTextfield;
