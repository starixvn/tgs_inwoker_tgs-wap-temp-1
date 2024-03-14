import React from "react";
import styled from "styled-components";

const CheckboxOuterWrapper = styled.div`
  display: flex;
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  gap: 20px;
  font-size: 28px;
`;

const CheckboxWrapper = styled.div`
  min-height: 28px;
  min-width: 28px;
  aspect-ratio: 1;
  background: ${({ checked, theme }) =>
    checked ? theme.new_gradientBackground : "transparent "};
  border: solid 1px ${({ checked }) => (checked ? "transparent" : "#000 ")};
  font-size: 28px;
  color: #000;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Checkbox = ({ checked, onChange, label, center }) => {
  return (
    <CheckboxOuterWrapper onClick={onChange} center={center}>
      <CheckboxWrapper checked={checked}>
        {checked === true && "✓"}
      </CheckboxWrapper>
      <div className="label">{label}</div>
    </CheckboxOuterWrapper>
  );
};

export default Checkbox;
