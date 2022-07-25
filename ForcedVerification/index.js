import React, { useEffect, useState } from "react";
import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import { AccountService } from "../../../api-services/services/AccountService";
import { Textfit } from "react-textfit";

const Wrapper = styled.div`
  padding: 20px 10px;
  min-height: 10vh;
  zoom: 2;
`;

const CustomDialog = styled(Dialog)`
  .MuiPaper-rounded {
    border-radius: 20px;
  }
`;

const Title = styled.div`
  font-size: 25px;
  width: 100%;
  text-align: center;
  padding: 10px 10px 20px 10px;
  font-weight: bold;
`;

const InputRow = styled.div`
  display: grid;
  gap: 5px;
  padding: 0 10px;
  grid-template-columns: 30% 70%;
`;

const AnotherRow = styled.div`
  padding: 5px 10px;
  display: grid;

  gap: 5px;
  grid-template-columns: 70% 30%;
`;

const ButtonRow = styled.div`
  padding: 0 5px 0 10px;
`;

const CustomSelect = styled.select`
  border-radius: 6px;
  border: solid 1px #676666;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 10%);
  height: 42px;
  padding: 0px 8px;
`;

const CustomTextField = styled.input`
  border-radius: 6px;
  border: solid 1px #676666;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 10%);
  padding: 0px 10px;
  height: 40px;
  display: flex;
  flex: 1;
  ::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const CustomButton = styled.div`
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  padding: 0 10px;
  height: 40px;
  width: 100%;
  flex: 1;

  ${({ theme }) => {
    return (
      "background-image: linear-gradient(to top, " +
      theme.primaryGradient +
      ", " +
      theme.primary +
      ");"
    );
  }}

  ${({ disabled }) => {
    return disabled && `filter: grayscale(01);pointer-events: none;`;
  }}

  color: #ffffff;
`;

const CloseButton = styled.div`
  border: solid 1px #000;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ForcedVerification = ({ forcedverify, alert }) => {
  useEffect(() => {
    setOpen(forcedverify);
  }, []);

  const [open, setOpen] = useState(forcedverify);
  const [areaCode, setAreacode] = useState(config.features.PhonePrefix);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [securityKey, setSecurityKey] = React.useState("");
  const handleGetCodeClick = async () => {
    if (countdown <= 0) {
      var expr = new RegExp(
        `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
      );
      if (!expr.test(phone)) {
        alert(
          "",
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
        );
        return;
      }

      AccountService.Activation("", "", areaCode, phone).then(
        async (response) => {
          if (response.IsSuccess) {
            setSecurityKey(response.data);
            alert("", i18n.t("common.msgTokenSent"));
            setCountdown(60);
          } else {
            alert("", response.info);
          }
        }
      );
    }
  };

  const handleActivationClick = async () => {
    var expr = new RegExp(
      `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
    );
    if (!expr.test(phone)) {
      alert(
        "",
        i18n
          .t("common.noReachMin")
          .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH)
      );
      return;
    }
    expr = /^[a-zA-Z0-9]{6}$/;
    if (!expr.test(code)) {
      alert("", i18n.t("common.msgEnterCode"));
      return;
    }

    AccountService.VerifyActivation(securityKey, code).then(
      async (response) => {
        if (response.IsSuccess) {
          alert("", i18n.t("common.msgTokenVerified"));
          setOpen(false);
        } else {
          alert("", response.info);
        }
      }
    );
  };

  useEffect(() => {
    if (countdown > 0)
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
  }, [countdown]);

  return (
    <CustomDialog open={open} maxWidth="" fullWidth="xs">
      <Wrapper>
        <Title>{i18n.t("web.register.activation")}</Title>
        {
          //     <CloseButton
          //     onClick={() => {
          //       setOpen(false);
          //     }}
          //   >
          //     ×
          //   </CloseButton>
        }
        <InputRow>
          <CustomSelect>
            <option>{areaCode}</option>
          </CustomSelect>
          <CustomTextField
            type="text"
            value={phone}
            placeholder={i18n.t("forgotPassword.plsEnterPhoneNumber")}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </InputRow>
        <AnotherRow>
          <CustomTextField
            type="text"
            value={code}
            placeholder={i18n.t("common.msgEnterCode")}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <CustomButton onClick={handleGetCodeClick} disabled={countdown > 0}>
            <Textfit>
              {countdown <= 0
                ? i18n.t("common.msgSendToken")
                : i18n.t("common.btnTokenResendLabel") + "(" + countdown + "s)"}
            </Textfit>
          </CustomButton>
        </AnotherRow>
        <ButtonRow>
          <CustomButton onClick={handleActivationClick}>
            {i18n.t("common.submit")}
          </CustomButton>
        </ButtonRow>
      </Wrapper>
    </CustomDialog>
  );
};

export default ForcedVerification;
