import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darkModeVar, enableDarkMode, disableDarkMode } from "../../apollo";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 350px;
`;

const Footer = styled.footer`
  margin-top: 20px;
`;

const DarkModeButton = styled.span`
  cursor: pointer;
`;

const AuthLayout = ({ children }) => {
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeButton onClick={darkMode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </DarkModeButton>
      </Footer>
    </Container>
  );
};

export default AuthLayout;
