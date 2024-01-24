import React from "react";
import styled from "styled-components";

const CustomSelectContainer = styled.div`
  width: 700px;
  height: 170px;

  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px 20px 0 20px;
  margin: 20px auto;
`;

const CustomLabel = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 3px;
  color: #212e31;
`;

const InputWrapper = ({ title, label, children, onClick }) => {
  return (
    <CustomSelectContainer onClick={onClick}>
      <CustomLabel>{title || label}</CustomLabel>
      {children}
    </CustomSelectContainer>
  );
};

export default InputWrapper;
