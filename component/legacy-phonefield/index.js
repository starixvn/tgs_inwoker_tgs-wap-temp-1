import React from "react";
import styled from "styled-components";

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

const CustomPhonefield = styled.div`
  font-size: 30px;
  margin: 20px;
`;

const InputRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 175px auto;
  width: 100%;
  gap: 20px;
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

const InputSelect = styled.select`
  background: none;
  border: none;
  color: inherit;
  padding-right: 40px;
  font-size: inherit;
`;

const LegacyPhonefield = (props) => {
  return (
    <CustomPhonefield>
      <InputRow>
        <CustomInputBackground>
          <InputSelect
            areaCode={props.areaCode}
            onAreaCodeChange={props.onAreaCodeChange}
          >
            {props.children}
          </InputSelect>
        </CustomInputBackground>
        <CustomInputBackground>
          <InputTextBox
            type={props.type}
            value={props.phone}
            onChange={props.onPhoneChange}
            maxLength={props.maxLength}
            placeholder={props.placeholder}
            disabled={props.disabled === true ? true : false}
          />
        </CustomInputBackground>
      </InputRow>
    </CustomPhonefield>
  );
};
export default LegacyPhonefield;
