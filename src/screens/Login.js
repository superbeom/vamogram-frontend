import styled from "styled-components";
import { darkModeVar } from "../apollo";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
  font-family: ---apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

export default () => {
  return (
    <Container>
      <Title>Login</Title>
      <button onClick={() => darkModeVar(true)}>Dark Mode</button>
      <button onClick={() => darkModeVar(false)}>Light Mode</button>
    </Container>
  );
};
