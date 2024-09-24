
import React, { useState, useContext } from "react";
import Verification from "../../../Common/uis/verification";
import { useRegisterForm, useRegisterHandle } from "../../../Common/hooks/pages/register";
import { RegisterContext } from "../../../Common/contexts";
import TextboxRefactor from "../TextboxRefactor";
import Select from "../Select";
import ButtonWap from "../../../Share/ButtonWap";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { IsWithSMSCode } from "../../../Common/templates";
import { useRegister } from "../hooks";
import VerificationCodeRefactor from "../VerificationCodeRefactor";


import { CustomWrapper, CustomInvitationSelect, RememberPassContainer, CustomCheck, TNC } from '../styles'


const RegisterMobile = ({ handleLoginSuccess }) => {
    // 重构注册
    const { performNewRegister, performGetCode, states } = useRegisterForm();
    const { prefill, countdown, fromCustomDomain, haveAffiliate } = states;
    const {
        handleChangeUserName, handleChangePwd, handleChangePwd2, handleChangePhone, handleChangePromotion, handleTncClick,
        handleChangeAreaCode, handleChangePromoteType, handleChangeUpper, handleChangeCode
    } = useRegisterHandle();
    const { formData, setFormData } = useContext(RegisterContext);
    const { hidePassword, hidePassword2, handleToggleShow, handleToggleShow2 } = useRegister()

    const onClickRegister = () => {
        performNewRegister(false, handleLoginSuccess, IsWithSMSCode);
    }

    return (
        <React.Fragment>
            <TextboxRefactor
                icon={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-user.png`
                }
                type={"text"}
                placeholder={i18n.t("wap.register.username")}
                style={{ marginTop: "60px" }}
                maxLength="16"
                value={formData.username}
                onChange={handleChangeUserName}
            ></TextboxRefactor>

            <TextboxRefactor
                icon={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-unlock.png`
                }
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
                icon={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-unlock.png`
                }
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
                config.features.Register_HideInvitation &&
                fromCustomDomain
            ) && (
                    <CustomWrapper>
                        <TextboxRefactor
                            icon={
                                process.env.PUBLIC_URL +
                                `/assets/images/wapp/icon-promo.png`
                            }
                            type={"text"}
                            placeholder={i18n.t("wap.register.promoteCode")}
                            style={{ marginTop: "20px" }}
                            value={
                                formData.promoteType === "a"
                                    ? formData.promotionId
                                    : formData.upper
                            }
                            onChange={
                                formData.promoteType === "a"
                                    ? handleChangePromotion
                                    : handleChangeUpper
                            }
                            disabled={prefill}
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

            {!config.features.SkipSMSVerification && (
                <>
                    <VerificationCodeRefactor
                        value={formData.code}
                        onChange={handleChangeCode}
                        countdown={countdown}
                        placeholder={i18n.t("common.msgEnterCode")}
                        handleGetCodeClick={performGetCode}
                    ></VerificationCodeRefactor>
                </>
            )}

            <RememberPassContainer>
                <CustomCheck
                    style={{ fontSize: "30px" }}
                    icon={
                        <CircleUnchecked
                            style={{ color: "#404040", fontSize: "38px" }}
                        />
                    }
                    checkedIcon={
                        <img
                            src={
                                process.env.PUBLIC_URL +
                                `/assets/images/wapp/icon-checked.png`
                            }
                            style={{ width: "40px" }}
                        />
                    }
                    checked={formData.tnc}
                    value={formData.tnc}
                    onChange={handleTncClick}
                />
                <TNC>{i18n.t("web.register.contract")}</TNC>
            </RememberPassContainer>
            <ButtonWap
                style={{ margin: "100px auto 0 auto" }}
                name={i18n.t("common.register")}
                onClick={onClickRegister}
                disableButton={!formData.tnc}
            ></ButtonWap>
        </React.Fragment>
    );
}

export default RegisterMobile;
