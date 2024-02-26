import React from "react";
import styled from "styled-components";
import i18n from "../../../../../utils/i18n";

const ListItem = styled.div`
  background: url(${(props) => props.src}) no-repeat right top;
  background-size: 100% 100%;
  position: relative;
  width: 100%;
  height: 280px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 20px;
  margin-bottom: 30px;
`;

const Content = styled.div`
  border-radius: 40px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const TitleAndButton = styled.div`
  padding: 30px 40px;
  font-size: 24px;
  display: grid;
  grid-template-columns: 75% auto;
  gap: 20px;
  align-items: center;
`;

const Title = styled.div`
  font-size: 30px;
  opacity: 0.75;
  color: ${({ theme }) => theme.primaryText};
`;

const Button = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  color: ${({ theme }) =>
    theme.wapPrimary ? theme.wapPrimary : theme.primary};
  padding: 10px 30px;
  border: solid 2px
    ${({ theme }) => (theme.wapPrimary ? theme.wapPrimary : theme.primary)};
`;

const LayoutTwo = (props) => {
  return props.promotionList.items
    .sort((a, b) => {
      return a.order - b.order;
    })
    .map((row, index) => {
      const checkIfLocaleExist = row.localization[i18n.language];
      if (row.localization !== null) {
        return (
          <Wrapper
            onClick={() => props.handlePromoClick(row.id)}
            order={row.order}
          >
            <Content>
              <ListItem
                key={index}
                src={
                  checkIfLocaleExist
                    ? checkIfLocaleExist.mobileBanner
                    : row.mobileBanner
                }
              ></ListItem>
              <TitleAndButton>
                <Title>
                  {checkIfLocaleExist && checkIfLocaleExist.name
                    ? checkIfLocaleExist.name
                    : row.name}
                </Title>
                <Button>{i18n.t("inbox.details")}</Button>
              </TitleAndButton>
            </Content>
          </Wrapper>
        );
      } else {
        return (
          <Wrapper onClick={() => props.handlePromoClick(row.id)}>
            <Content>
              <ListItem key={index} src={row.mobileBanner}></ListItem>
              <TitleAndButton>
                <Title>{row.name}</Title>
                <Button>{i18n.t("inbox.details")}</Button>
              </TitleAndButton>
            </Content>
          </Wrapper>
        );
      }
    });
};

export default LayoutTwo;
