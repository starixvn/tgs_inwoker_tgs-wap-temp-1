import React from "react";
import styled from "styled-components";
import InputWrapper from "../input-wrapper";

const CustomSelect = styled.select`
  font-size: 28px;
  margin-top: 25px;
  border-radius: 16px;
  border: solid 1px transparent;
  width: 100%;
  color: ${({ theme }) => theme.secondary};
`;

const Select = ({ title, label, value, onChange, children }) => {
  return (
    <InputWrapper title={title} label={label}>
      <CustomSelect value={value} onChange={onChange} native>
        {children}
      </CustomSelect>
    </InputWrapper>
  );
};

export default Select;
