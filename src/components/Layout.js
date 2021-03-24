import styled from "styled-components";
import Header from "./Header";

const Content = styled.main`
  width: 100%;
  max-width: 930px;
  margin: 0 auto;
  margin-top: 45px;
`;

const Layout = ({ children }) => (
  <>
    <Header />
    <Content>{children}</Content>
  </>
);

export default Layout;
