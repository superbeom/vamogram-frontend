import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
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

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

const Comments = ({ photoId, author, caption, comments, commentNumber }) => {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();

  const updateCreateComment = (cache, result) => {
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;

    if (ok && userData?.me) {
      const fragmentId = `Photo:${photoId}`;
      const { payload } = getValues();

      const newComment = {
        __typename: "Comment",
        id,
        payload,
        user: {
          ...userData.me,
        },
        isMine: true,
        createdAt: `${Date.now()}`,
      };

      const newCacheComment = cache.writeFragment({
        fragment: gql`
          fragment BSName on Comment {
            id
            payload
            user {
              username
              avatar
            }
            isMine
            createdAt
          }
        `,
        data: newComment,
      });

      cache.modify({
        id: fragmentId,
        fields: {
          comments(cacheComments) {
            return [...cacheComments, newCacheComment];
          },
          commentNumber(cacheCommentNumber) {
            return cacheCommentNumber + 1;
          },
        },
      });
    }
  };

  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: updateCreateComment,
    }
  );

  const onSubmitValid = async ({ payload }) => {
    if (loading) {
      return;
    }

    await createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });

    setValue("payload", "");
  };

  return (
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
      <div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <input
            ref={register({ required: "Comment can not be empty." })}
            name="payload"
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </div>
    </CommentsContainer>
  );
};

export default Comments;
