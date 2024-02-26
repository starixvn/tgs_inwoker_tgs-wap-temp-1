import React from "react";
import styled from "styled-components";
import i18n from "../../../../../utils/i18n";

const ListItem = styled.div`
  background: url(${(props) => props.src}) no-repeat right top;
  background-size: 100% 100%;
  position: relative;

  margin: 10px auto;
  border-radius: 10px;
  width: 690px;
  height: 280px;
`;
const LayoutOne = (props) => {
  return props.promotionList.items
    .sort((a, b) => {
      return a.order - b.order;
    })
    .map((row, index) => {
      const checkIfLocaleExist = row.localization[i18n.language];
      if (row.localization !== null) {
        return (
          <ListItem
            key={index}
            order={row.order}
            src={
              checkIfLocaleExist
                ? checkIfLocaleExist.mobileBanner
                : row.mobileBanner
            }
            onClick={() => props.handlePromoClick(row.id)}
          ></ListItem>
        );
      } else {
        return (
          <ListItem
            key={index}
            src={row.mobileBanner}
            onClick={() => props.handlePromoClick(row.id)}
          ></ListItem>
        );
      }
    });
};

export default LayoutOne;
