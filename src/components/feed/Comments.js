import styled from "styled-components";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  display: block;
  margin: 10px 0px;
  opacity: 0.7;
  font-size: 10px;
  font-weight: 600;
`;

const Comments = ({ author, caption, comments, commentNumber }) => (
  <CommentsContainer>
    <Comment author={author} payload={caption} />
    <CommentCount>
      {commentNumber > 0
        ? commentNumber === 1
          ? "1 comment"
          : `${commentNumber} comments`
        : null}
    </CommentCount>
    {comments?.map((comment) => (
      <Comment
        key={comment.id}
        author={comment.user.username}
        payload={comment.payload}
      />
    ))}
  </CommentsContainer>
);

export default Comments;
