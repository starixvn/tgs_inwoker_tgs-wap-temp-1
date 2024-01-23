import React from "react";
import styled from "styled-components";

const CustomDopdown = styled.div`
  background-color: ${({ theme }) => theme.new_textfieldBackground ?? "#fff"};
  width: 635px;
  margin: 0 auto;
  height: 80px;
  border-radius: 4px;

  input,
  select {
    background: transparent;
    color: #fff;
    width: 100%;
    height: 100%;
    font-size: 30px;
    padding: 0 20px;
  }
`;

const InputfieldWrapper = ({ children }) => {
  return <CustomDopdown>{children}</CustomDopdown>;
};

export default InputfieldWrapper;
