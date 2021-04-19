import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";

import routes from "../routes";
import { CREATE_ACCOUNT_MUTATION } from "../schema/authMutations";

import { FatLink } from "../components/shared";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import FormError from "../components/auth/FormError";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const SignUp = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    formState,
    setError,
    clearErrors,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;

    if (!ok) {
      return setError("result", { message: error });
    }

    /* createAccount를 성공적으로 실행하면, home으로 redirect */
    history.push(routes.home, {
      message: "Account created. Please log in.",
      username,
      password,
    });
  };

  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmitValid = async ({
    firstName,
    lastName,
    email,
    username,
    password,
  }) => {
    if (loading) {
      return;
    }

    return createAccountMutation({
      variables: {
        firstName,
        lastName,
        email,
        username,
        password,
      },
    });
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title={"Signup"} />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({ required: "First name is required." })}
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          <FormError message={errors?.firstName?.message} />
          <Input
            ref={register}
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
          <FormError message={errors?.lastName?.message} />
          <Input
            ref={register({ required: "Email is required." })}
            onChange={clearLoginError}
            name="email"
            type="text"
            placeholder="Email"
          />
          <FormError message={errors?.email?.message} />
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
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({ required: "Password is required." })}
            name="password"
            type="password"
            placeholder="Password"
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox
        cta={"Have an account?"}
        link={routes.home}
        linkText={"Log in"}
      />
    </AuthLayout>
  );
};

export default SignUp;
