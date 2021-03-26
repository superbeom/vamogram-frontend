import { Fragment } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      error
    }
  }
`;

const Comment = ({ id: commentId, author, payload, isMine, photoId }) => {
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;

    if (ok && isMine) {
      const cacheCommentId = `Comment:${commentId}`;
      const cachePhotoId = `Photo:${photoId}`;

      const deleteResult = cache.evict({ id: cacheCommentId });

      if (deleteResult) {
        cache.modify({
          id: cachePhotoId,
          fields: {
            comments(cacheComments) {
              return cacheComments.filter(
                (cacheComment) => cacheComment.__ref !== cacheCommentId
              );
            },
            commentNumber(cacheCommentNumber) {
              return cacheCommentNumber - 1;
            },
          },
        });
      }
    }
  };

  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id: commentId,
    },
    update: updateDeleteComment,
  });

  const onDeleteClick = () => {
    return deleteCommentMutation();
  };

  return (
    <CommentContainer>
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CommentCaption>
        {payload.split(" ").map((word, index) =>
          /#[\w]+/.test(word) ? (
            <Link key={index} to={`/hashtags/${word}`}>
              {word}{" "}
            </Link>
          ) : (
            <Fragment key={index}>{word} </Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? <button onClick={onDeleteClick}>❌</button> : null}
    </CommentContainer>
  );
};

export default Comment;
