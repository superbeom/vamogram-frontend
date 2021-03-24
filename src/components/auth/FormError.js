import styled from "styled-components";

const StyledFormError = styled.span`
  color: tomato;
  font-size: 12px;
  font-weight: 600;
  margin: 5px 0px 10px 0px;
`;

export default ({ message }) =>
  message ? <StyledFormError>{message}</StyledFormError> : null;
