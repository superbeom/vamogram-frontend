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

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

export default () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmitValid = (data) => console.log(data);

  const onSubmitInvalid = (data) => console.log("This is error: ", data);

  return (
    <AuthLayout>
      <PageTitle title={"Login"} />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Input
            ref={register({
              required: "Username is required.",
              validate: {
                minLength: (value) =>
                  value.length < 5 && "Please write at least 5 charaters",
              },
            })}
            name="username"
            type="text"
            placeholder="Username"
          />
          {errors?.username && <span>{errors.username.message}</span>}
          <Input
            ref={register({ required: "Password is required." })}
            name="password"
            type="password"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <span>{errors.password.message}</span>
          )}
          <Button type="submit" placeholder="Log in" />
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
