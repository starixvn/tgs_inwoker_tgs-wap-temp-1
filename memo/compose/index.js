import React, { useState } from "react";
import Textbox from "../../Share/Textbox";
import i18n from "../../../../utils/i18n";
import ButtonWap from "../../../Share/ButtonWap";

const Compose = ({ composeMemo, alert }) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const performClickCompose = () => {
    composeMemo(subject, content).then((result) => {
      if (result.IsSuccess) {
        setSubject("");
        setContent("");
        alert(i18n.t("sendsuccess"));
      }
    });
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
        placeholder={i18n.t("pleaseenter") + i18n.t("memo")}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        label={i18n.t("memo")}
      ></Textbox>

      <ButtonWap
        style={{ margin: 0, width: "100%" }}
        disabled={subject === "" || content === ""}
        onClick={() => {
          subject !== "" && content !== "" && performClickCompose();
        }}
        name={i18n.t("common.submit")}
      />
    </div>
  );
};

export default Compose;
