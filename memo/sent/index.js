import React, { useState } from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";
import moment from "moment";
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
const ContentWrapper = styled.div``;

const Content = styled.div`
  padding: 20px;
`;

const UpperSection = styled.div`
  padding: 20px;
`;
const Title = styled.div`
  font-size: 34px;
  font-weight: 600;
`;

const Sent = ({ sent, deliveryBox }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
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

  const performReadInbox = (id) => {
    deliveryBox("read", id).then((res) => {
      if (res.IsSuccess) {
        setContent(res.data);
        setOpen(true);
      }
    });
  };

  const performCloseModal = () => {
    setOpen(false);
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
          {sent.items &&
            sent.items.map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  performReadInbox(item.id);
                }}
              >
                <td>{item.subject}</td>
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
              {content.sender} - {dateTimeFormatter(content.sentOn)}
            </div>
          </UpperSection>

          <Content>{content.content}</Content>
        </ContentWrapper>
      </Modal>
    </Wrapper>
  );
};

export default Sent;
