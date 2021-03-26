import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    color: ${(props) => props.theme.accent};
    margin-left: 5px;
    font-weight: 600;
  }
`;

// cta = call to action = 클릭 유도 문구
const BottomBox = ({ cta, link, linkText }) => (
  <Container>
    <span>{cta}</span>
    <Link to={link}>{linkText}</Link>
  </Container>
);

export default BottomBox;
