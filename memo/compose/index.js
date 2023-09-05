import React, { useState } from "react";
import Textbox from "../../Share/Textbox";
import i18n from "../../../../utils/i18n";
import ButtonWap from "../../../Share/ButtonWap";
import Modal from "../modal";

import styled from "styled-components";

const ContentWrapper = styled.div``;

const UpperSection = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  padding: 15px 30px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 25px;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CustomButton = styled(Button)`
  background: ${({ theme }) => theme.primary};
  color: #fff;
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 50px;
  gap: 20px;
`;
const Title = styled.div`
  font-size: 34px;
  font-weight: 600;
`;

const Compose = ({ composeMemo, alert }) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);

  const performSend = () => {
    composeMemo(subject, content).then((result) => {
      if (result.IsSuccess) {
        setSubject("");
        setContent("");
        setOpen(false);
        alert(i18n.t("sendsuccess"));
      }
    });
  };

  const performClickCompose = () => {
    setOpen(true);
  };

  return (
    <div>
      <Textbox
        style={{ margin: "0px auto 10px auto" }}
        value={subject}
        required
        onChange={(e) => {
          setSubject(e.target.value);
        }}
        placeholder={i18n.t("pleaseenter") + i18n.t("subject")}
        label={i18n.t("subject")}
      ></Textbox>
      <Textbox
        required
        style={{ margin: "0px auto 10px auto" }}
        value={content}
        placeholder={i18n.t("pleaseenter") + i18n.t("yourmessage")}
        onChange={(e) => {
          const value = e.target.value;
          const lastChar = value.charAt(value.length - 1);
          if (lastChar === "\n") {
            setContent(value + lastChar);
          } else {
            setContent(value);
          }
        }}
        label={i18n.t("yourmessage")}
      ></Textbox>
      <div style={{ padding: "5px 2px  " }}>
        <ButtonWap
          style={{ margin: 0, width: "100%" }}
          disabled={subject === "" || content === ""}
          onClick={() => {
            subject !== "" && content !== "" && performClickCompose();
          }}
          name={i18n.t("common.submit")}
        />
      </div>
      <Modal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      >
        <ContentWrapper>
          <UpperSection>
            <Title>{i18n.t("confirmSubmit")}?</Title>
          </UpperSection>

          <ActionButtonWrapper>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              {i18n.t("common.cancel")}
            </Button>
            <CustomButton
              onClick={() => {
                performSend(content);
              }}
            >
              {i18n.t("common.submit")}
            </CustomButton>
          </ActionButtonWrapper>
        </ContentWrapper>
      </Modal>
    </div>
  );
};

export default Compose;
