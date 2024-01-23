import React from "react";
import styled from "styled-components";

const CheckboxOuterWrapper = styled.div`
  display: flex;
  color: #fff;
  align-items: flex-start;
  gap: 20px;
  font-size: 28px;
`;

const CheckboxWrapper = styled.div`
  min-height: 28px;
  min-width: 28px;
  aspect-ratio: 1;
  background: ${({ checked, theme }) =>
    checked ? theme.new_gradientBackground : "transparent "};
  border: solid 1px ${({ checked }) => (checked ? "transparent" : "#fff ")};
  font-size: 28px;
  color: #000;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Checkbox = ({ checked, onChange, label }) => {
  return (
    <CheckboxOuterWrapper onClick={onChange}>
      <CheckboxWrapper checked={checked}>
        {checked === true && "✓"}
      </CheckboxWrapper>
      <div>{label}</div>
    </CheckboxOuterWrapper>
  );
};

export default Checkbox;
