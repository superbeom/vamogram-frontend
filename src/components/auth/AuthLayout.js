import styled from "styled-components";

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

export default ({ children }) => (
  <Container>
    <Wrapper>{children}</Wrapper>
  </Container>
);
