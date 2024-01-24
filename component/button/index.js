import React from "react";
import styled from "styled-components";

const StyleButton = styled.div`
  width: 637px;
  height: 81px;
  border-radius: 8px;
  border: solid 1px transparent;
  background: ${({ styledtype, theme, secondary }) =>
    styledtype === "2"
      ? " #404040"
      : secondary
      ? theme.new_accent
      : theme.new_gradientBackground ??
        `linear-gradient(to top, ${theme.primaryGradient}, ${theme.primary});`};
  text-transform: ${({ theme }) =>
    theme.new_gradientBackground ? "uppercase" : "capitalize"};
  font-weight: ${({ theme }) =>
    theme.new_gradientBackground ? "bold" : "normal"};
  margin: 0 auto;
  font-size: 25px;
  color: ${({ theme, secondary }) =>
    secondary ? "#fff" : theme.new_gradientBackground ? "#000" : "#fff"};
  padding-top: 20px;
  text-align: center;

  ${({ disabled }) => {
    if (disabled) {
      return `
        background: #404040 !important;
        color: rgba(255,255,255,0.2);
        border: none;
        pointer-events: none;
        user-select: none;
      `;
    }
  }}
`;

const Button = (props) => {
  return (
    <StyleButton onClick={props.onClick} {...props}>
      {props.name || props.label}
    </StyleButton>
  );
};

export default Button;
