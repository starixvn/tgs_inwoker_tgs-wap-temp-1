import React from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";
import moment from "moment";
import { useState } from "react";
import Modal from "../modal";

const Wrapper = styled.div`
  background: #fff;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
  background-color: #fff;
  text-align: left;
  font-size: 25px;
  tr {
    border-bottom: 1px solid #eaeaea;
  }
  thead {
    tr {
      th {
        padding: 15px 10px;
        &:last-child {
          text-align: right;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 15px 10px;
        &:last-child {
          text-align: right;
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;
const Title = styled.div`
  font-size: 34px;
  font-weight: 600;
`;

const ContentWrapper = styled.div``;

const Content = styled.div`
  padding: 20px;
  font-size: 25px;
  white-space: pre-wrap;
`;

const UpperSection = styled.div`
  padding: 20px;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr;
  padding-bottom: 10px;
`;

const CustomTextArea = styled.textarea`
  outline: none;
  padding: 5px 10px;
  border: solid 1px #b7c7cc;
  font-size: 25px;
  width: -webkit-fill-available;
`;

const CustomButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 25px;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CustomTextfield = styled.input`
  outline: none;
  padding: 5px 10px;
  font-size: 25px;
  width: -webkit-fill-available;

  ::placeholder {
    color: #eaeaea;
  }
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 50px;
`;

const Inbox = ({ memo, getMemoV2, performReplyMemo, readMemo }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [memoSubject, setMemoSubject] = useState("");
  const [memoContent, setMemoContent] = useState("");

  const performReadInbox = (id) => {
    getMemoV2(id).then((res) => {
      if (res.IsSuccess) {
        readMemo(id);
        setContent(res.data);
        setOpen(true);
      }
    });
  };
  const dateTimeFormatter = (date) => {
    const today = moment();
    const diffInDays = today.diff(date, "days");
    return (
      moment(date).format("YYYY/MM/DD") +
      " - " +
      diffInDays +
      " " +
      i18n.t("daysago")
    );
  };

  const [replyModal, setReplyModal] = useState(false);
  const [replyId, setReplyId] = useState("");

  const performReplyClickAction = (item) => {
    setReplyModal(true);
    setMemoSubject("Re: " + item.subject);
    setReplyId(item.id);
  };
  const performCloseModal = () => {
    setOpen(false);
    setReplyModal(false);
    //reset form
    setMemoSubject("");
    setMemoContent("");
  };
  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <th>{i18n.t("subject")}</th> <th>{i18n.t("date")}</th>
          </tr>
        </thead>
        <tbody>
          {memo.items &&
            memo.items.map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  performReadInbox(item.id);
                }}
              >
                <td>{item.subject}</td>{" "}
                <td>{moment(item.sentOn).format("DD/MM/YYYY")}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal open={open} handleClose={performCloseModal}>
        <ContentWrapper>
          <UpperSection>
            <Title>{content.subject}</Title>

            <div>
              {i18n.t("sentBy")} {content.sender}{" "}
              {dateTimeFormatter(content.sentOn)}
            </div>
          </UpperSection>

          <Content>{content.content}</Content>
          <ActionButtonWrapper>
            <CustomButton
              onClick={() => {
                performReplyClickAction(content);
              }}
            >
              {i18n.t("reply")}
            </CustomButton>
          </ActionButtonWrapper>
        </ContentWrapper>
      </Modal>
      <Modal open={replyModal} handleClose={performCloseModal}>
        <Content>
          <InputRow>
            <div>{i18n.t("subject")}</div>
            <div>
              <CustomTextfield
                value={memoSubject}
                disabled
                onChange={(e) => {
                  setMemoSubject(e.target.value);
                }}
              />
            </div>
          </InputRow>
          <InputRow>
            <div>
              <span style={{ color: "red" }}>*</span>
              {i18n.t("yourmessage")}
            </div>
            <div>
              <CustomTextArea
                rows="7"
                cols="50"
                value={memoContent}
                placeholder="Enter your memo here..."
                onChange={(e) => {
                  const value = e.target.value;
                  const lastChar = value.charAt(value.length - 1);
                  if (lastChar === "\n") {
                    setMemoContent(value + lastChar);
                  } else {
                    setMemoContent(value);
                  }
                }}
              />
            </div>
          </InputRow>
          <InputRow>
            <div></div>
            <div>
              <CustomButton
                disabled={memoContent.length === 0}
                onClick={() => {
                  performReplyMemo(replyId, memoContent);
                  performCloseModal();
                }}
              >
                {i18n.t("common.submit")}
              </CustomButton>
            </div>
          </InputRow>
        </Content>
      </Modal>
    </Wrapper>
  );
};

export default Inbox;
