import React from 'react'

import Header from "../../Wap/Share/Header";
import { WageringWrapper } from "../../Common/components"
import i18n from "../../../utils/i18n";

const Wagering = (props={}) => {

  const { appHistory } = props

  const handleBackClick = () => {
    appHistory.goBack();
  }

  return (
    <>
      <Header title={i18n.t("common.wagering")} onBackClick={ handleBackClick }></Header>
      <WageringWrapper ></WageringWrapper>
    </>
  )
}

export default Wagering