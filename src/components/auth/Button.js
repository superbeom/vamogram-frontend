import styled from "styled-components";

export default styled.input`
  width: 100%;
  border: none;
  border-radius: 3px;
  margin-top: 12px;
  background-color: ${(props) =>
    props.disabled ? props.theme.borderColor : props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
`;
