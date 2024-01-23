import React from "react";
import InputfieldWrapper from "../inputfield-wrapper";
import styled from "styled-components";

const CustomSelect = styled.select`
  option {
    color: #000;
    font-size: 20px;
  }
`;
const Dropdown = ({ children, value, onChange }) => {
  return (
    <InputfieldWrapper>
      <CustomSelect
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {children}
      </CustomSelect>
    </InputfieldWrapper>
  );
};

export default Dropdown;
