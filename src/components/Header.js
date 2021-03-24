import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faHome, faUser } from "@fortawesome/free-solid-svg-icons";

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 930px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

export default () => (
  <StyledHeader>
    <Wrapper>
      <Column>
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </Column>
      <Column>
        <Icon>
          <FontAwesomeIcon icon={faHome} size="lg" />
        </Icon>
        <Icon>
          <FontAwesomeIcon icon={faCompass} size="lg" />
        </Icon>
        <Icon>
          <FontAwesomeIcon icon={faUser} size="lg" />
        </Icon>
      </Column>
    </Wrapper>
  </StyledHeader>
);
