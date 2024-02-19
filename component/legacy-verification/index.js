import React from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";

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
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
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
  flex: 1;
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
  width: 100%;
  height: 100%;
`;

const Button = styled.div`
  background: #3e97ff;
  padding: 10px;
  font-size: 20px;
  white-space: nowrap;
  border-radius: 8px;

  ${({ disabled }) => {
    if (disabled) {
      return `
        background: #404040 !important;
        color: rgba(255,255,255,0.2);
        pointer-events: none;
        user-select: none;
      `;
    }
  }}
`;

const LegacyVerificationfield = (props) => {
  const [countdown, setCountdown] = React.useState(60);
  const [timer, setTimer] = React.useState(null);

  React.useEffect(() => {
    if (props.successGetCode) {
      setTimer(
        setInterval(() => {
          setCountdown((prev) => {
            if (prev === 0) {
              clearInterval(timer);
              props.resetGetCode();
              return 60;
            } else {
              return prev - 1;
            }
          });
        }, 1000)
      );
    }
    return () => {
      clearInterval(timer);
    };
  }, [props.successGetCode]);

  return (
    <CustomInput>
      <TextContainer>
        {props.icon && <TextSpan icon={props.icon}></TextSpan>}
        <CustomInputBackground>
          <InputTextBox
            type={props.type}
            value={props.code}
            onChange={props.onCodeChange}
            placeholder={props.placeholder}
            disabled={props.disabled === true ? true : false}
          />
          <Button onClick={props.onGetCode} disabled={props.successGetCode}>
            {i18n.t("common.msgSendToken")}{" "}
            {props.successGetCode ? `(${countdown})` : ""}
          </Button>
        </CustomInputBackground>
      </TextContainer>
    </CustomInput>
  );
};
export default LegacyVerificationfield;
