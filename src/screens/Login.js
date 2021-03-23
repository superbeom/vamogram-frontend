import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default () => {
  const { register, handleSubmit, errors, formState, setError } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const {
      login: { ok, token, error },
    } = data;

    if (!ok) {
      setError("result", { message: error });
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: onCompleted,
  });

  const onSubmitValid = async ({ username, password }) => {
    if (loading) {
      return;
    } else {
      login({
        variables: {
          username,
          password,
        },
      });
    }
  };

  return (
    <AuthLayout>
      <PageTitle title={"Login"} />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 characters",
              },
            })}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({ required: "Password is required." })}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta={"Don't have an account?"}
        link={routes.signUp}
        linkText={"Sign up"}
      />
    </AuthLayout>
  );
};
