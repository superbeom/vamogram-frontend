import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

const Comment = ({ author, payload }) => (
  <CommentContainer>
    <FatText>{author}</FatText>
    <CommentCaption>{payload}</CommentCaption>
  </CommentContainer>
);

export default Comment;
