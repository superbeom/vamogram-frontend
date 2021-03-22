import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        background-color: ${(props) => props.theme.bgColor}
    }
`;

export const lightTheme = {
  bgColor: "lightgray",
  fontColor: "#2c2c2c",
};

export const darkTheme = {
  bgColor: "#2c2c2c",
  fontColor: "lightgray",
};
