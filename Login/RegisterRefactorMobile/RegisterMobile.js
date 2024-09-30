
import Checkbox from "../../component/checkbox";
import React, { useState, useContext,useEffect } from "react";
import Verification from "../../../Common/uis/verification";
import { useRegisterForm, useRegisterHandle } from "../../../Common/hooks/pages/register";
import { RegisterContext } from "../../../Common/contexts";
import TextboxRefactor from "../TextboxRefactor";
import Select from "../Select";
import ButtonWap from "../../../Share/ButtonWap";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import { IsWithSMSCode } from "../../../Common/templates";
import { useRegister } from "../hooks";
import VerificationCode from "../VerificationCode"; 
import { CustomWrapper, CustomInvitationSelect, RememberPassContainer, } from '../styles'


const RegisterMobile = (props) => {
    useEffect(() => {
        console.log("RegisterMobile v9.24.1");
    }, []);
    const { onHandleClose, onHandleLoginSuccess } = props;
    const { performNewRegister, performGetCode, states } = useRegisterForm();
    const { countdown, prefill, fromCustomDomain, haveAffiliate } = states;
    const {
        handleChangeUserName, handleChangePwd, handleChangePwd2, handleChangePhone, handleChangePromotion,
        handleTncClick, handleChangeAreaCode, handleChangeUpper, handleChangeCode, handleChangePromoteType
    } = useRegisterHandle();
    const { formData, setFormData } = useContext(RegisterContext);
    const { hidePassword, hidePassword2, handleToggleShow, handleToggleShow2 } = useRegister()

    const onClickRegister = () => {
        performNewRegister(false, onHandleLoginSuccess, IsWithSMSCode);
    }


    return (
        <React.Fragment>
            <TextboxRefactor
                type={"text"}
                placeholder={i18n.t("wap.register.username")}
                style={{ marginTop: "60px" }}
                maxLength="16"
                value={formData.username}
                onChange={handleChangeUserName}
            ></TextboxRefactor>
            <TextboxRefactor
                type={hidePassword ? "password" : "text"}
                hidePassword={hidePassword}
                placeholder={i18n.t("wap.register.password")}
                style={{ marginTop: "20px" }}
                password={true}
                maxLength="20"
                toggleShow={handleToggleShow}
                value={formData.password}
                onChange={handleChangePwd}
            ></TextboxRefactor>
            <TextboxRefactor
                type={hidePassword2 ? "password" : "text"}
                hidePassword={hidePassword2}
                placeholder={i18n.t("wap.register.confirmPassword")}
                style={{ marginTop: "20px" }}
                password={true}
                maxLength="20"
                toggleShow={handleToggleShow2}
                value={formData.password2}
                onChange={handleChangePwd2}
            ></TextboxRefactor>
            {!(
                config.features.Register_HideInvitation && fromCustomDomain
            ) && (
                    <CustomWrapper>
                        <TextboxRefactor
                            type={"text"}
                            placeholder={i18n.t("wap.register.promoteCode")}
                            style={{ marginTop: "20px" }}
                            value={
                                formData.promoteType === "a" ? formData.promotionId : formData.upper
                            }
                            onChange={
                                formData.promoteType === "a" ? handleChangePromotion : handleChangeUpper
                            }
                            disabled={{ disabled: prefill }}
                        ></TextboxRefactor>
                        {haveAffiliate && (
                            <CustomInvitationSelect
                                disabled={prefill}
                                value={formData.promoteType}
                                selected={formData.promoteType}
                                onChange={handleChangePromoteType}
                            >
                                <option value="a">{i18n.t("usertype.agent")}</option>
                                <option value="p">{i18n.t("usertype.player")}</option>
                            </CustomInvitationSelect>
                        )}
                    </CustomWrapper>
                )} 
            {config.features.Register_ShowPhone && (
                <CustomWrapper>
                    <Select
                        type={"text"}
                        placeholder={i18n.t(
                            "forgotPassword.plsEnterPhoneNumber"
                        )}
                        selectValue={formData.areaCode}
                        onSelectChange={handleChangeAreaCode}
                        value={formData.phone}
                        maxLength={config.features.MAX_PHONE_LENGTH || 10}
                        onChange={handleChangePhone}
                    ></Select>
                </CustomWrapper>
            )}
            {!config.features.SkipSMSVerification && (
                <>
                    <VerificationCode
                        value={formData.code}
                        onChange={handleChangeCode}
                        countdown={countdown}
                        placeholder={i18n.t("common.msgEnterCode")}
                        handleGetCodeClick={performGetCode}
                    ></VerificationCode>
                </>
            )}
            <RememberPassContainer style={{ width: 635 }}>
                <Checkbox
                    checked={formData.tnc}
                    onChange={handleTncClick}
                    label={i18n.t("web.register.contract")}
                />
            </RememberPassContainer>
            <ButtonWap
                style={{ margin: "100px auto 0 auto" }}
                name={
                    config.features.Register_CustomFlow_IDR
                        ? i18n.t("common.nextStep")
                        : i18n.t("common.register")
                }
                onClick={onClickRegister}
                disableButton={!formData.tnc}
            ></ButtonWap>
        </React.Fragment>
    );
}

export default RegisterMobile;