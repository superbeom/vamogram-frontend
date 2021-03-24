import styled from "styled-components";

const StyledAvatar = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

export default ({ url }) => (
  <StyledAvatar>
    <Img src={url} />
  </StyledAvatar>
);
