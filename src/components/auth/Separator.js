import styled from "styled-components";

const StyledSeparator = styled.div`
  width: 100%;
  margin: 20px 0px 30px 0px;
  display: flex;
  text-transform: uppercase;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    margin: 0px 10px;
    color: #8e8e8e;
    font-size: 12px;
    font-weight: 600;
  }
`;

export default () => (
  <StyledSeparator>
    <div />
    <span>or</span>
    <div />
  </StyledSeparator>
);
