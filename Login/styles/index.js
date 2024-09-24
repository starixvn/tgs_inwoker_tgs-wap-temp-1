import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import ButtonWap from "../../../Share/ButtonWap";
import i18n from "../../../../utils/i18n";
 

export const Container = styled.div`
  z-index: 10;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: url(${process.env.PUBLIC_URL + `/assets/images/wapp/login-bg.jpg`})
    no-repeat;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: scroll;
`;

export const ContentWrap = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  width: 750px;
  padding-bottom: 60px;

`;
export const Logo = styled.div`
  width: 400px;
  height: 200px;
  margin: 60px auto 60px auto;
  background: url("${(props) => props.img}") no-repeat center center;
  background-size: contain;
`;
export const RememberPassContainer = styled.div`
  float: left;
  margin: 10px 0 0 90px;
`;
export const RememberPassLabel = styled.div`
  float: left;
  font-size: ${(props) => i18n.language === "ta-IN" ? "20px" : "28px"};
  margin-top: 14px;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.secondary};
  ${(props) =>
        i18n.language === "ta-IN"
            ? `
  width: 220px;
  `
            : ``}

`;
export const CustomCheck = withStyles({
    root: {
        width: "50px",
        height: "50px",
        fontSize: "50px",
        float: "left",
    },
})(Checkbox);
export const ForgotPassContainer = styled.div`
  float: right;
  margin: 10px 100px 0 0;
`;
export const ForgotPassLabel = styled(RememberPassLabel)`
  float: right;
`;
export const LoginActionContainer = styled.div`
  margin: 100px 0 0 0;
`;

export const LanguageWrap = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.secondary};
  font-size: 28px;
  margin-top: 20px;
`;

export const DownloadButtonHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DownloadButton = styled(LanguageWrap)`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
`;
export const LanguageLink = styled.span`
  text-align: center;
  ${(props) =>
        props.selected == true ? `color:` + props.theme.primary + `;` : ``}
`;

export const Version = styled.div`
  position: fixed;
  bottom: 5px;
  right: 5px;
  color: ${({ theme }) => theme.secondary};
`;

export const TNC = styled(RememberPassLabel)`
  width: 515px;
  margin-bottom: 14px;
`;

export const CustomWapButton = styled(ButtonWap)`
  background: transparent;
  border: solid 2px ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
`;

export const CustomInvitationSelect = styled.select`
  position: absolute;
  right: 85px;
  font-size: 25px;
  bottom: 25px;
  border: none;
  outline: none;
`;

export const CustomWrapper = styled.div`
  position: relative;
`;

export const Icon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  background-color: black;
  mask: ${({ icon }) => {
        return `url(${process.env.PUBLIC_URL + `/assets/images/wapp/${icon}.svg`
            }) no-repeat center /
    contain;`;
    }};
`;
