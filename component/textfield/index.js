import React from "react";
import styled from "styled-components";
import InputWrapper from "../input-wrapper";

const CustomInput = styled.input`
  color: ${({ theme }) => theme.secondary};
  font-size: 28px;
  font-weight: 500;
  margin-top: 25px;
  border: 0;
  width: 100%;
  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
    font-size: 28px;
    font-weight: 500;
  }
  &:disabled {
    background: #fff;

    opacity: 1;
  }
`;

const Textfield = ({
  title,
  label,
  value,
  onChange,
  type,
  placeholder,
  disabled,
  onClick,
  maxLength,
}) => {
  return (
    <InputWrapper title={title} label={label} onClick={onClick}>
      <CustomInput
        type={type ? type : "text"}
        value={value}
        placeholder={placeholder}
        disabled={disabled ? disabled : false}
        onChange={onChange}
        maxLength={maxLength ? maxLength : 50}
      ></CustomInput>
    </InputWrapper>
  );
};

export default Textfield;
