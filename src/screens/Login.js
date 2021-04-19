import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";

import { logUserIn } from "../apollo";
import routes from "../routes";
import { LOGIN_MUTATION } from "../schema/authMutations";

import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import FormError from "../components/auth/FormError";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;

const Login = () => {
  const location = useLocation();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    formState,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username,
      password: location?.state?.password,
    },
  });

  const onCompleted = (data) => {
    const {
      login: { ok, token, error },
    } = data;

    if (!ok) {
      return setError("result", { message: error });
    }

    if (token) {
      logUserIn(token);
    }
  };

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = async ({ username, password }) => {
    if (loading) {
      return;
    } else {
      loginMutation({
        variables: {
          username,
          password,
        },
      });
    }
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  useEffect(() => {
    history.replace();
  }, []);

  return (
    <AuthLayout>
      <PageTitle title={"Login"} />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Notification>{location?.state?.message}</Notification>
          <Input
            ref={register({
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 characters",
              },
            })}
            onChange={clearLoginError}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({ required: "Password is required." })}
            onChange={clearLoginError}
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

export default Login;
