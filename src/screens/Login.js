import { useState } from "react";
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

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

export default () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const onUsernameChange = (event) => {
    setUsernameError("");
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.length < 5) {
      setUsernameError("Please write at least 5 characters.");
    }
  };

  return (
    <AuthLayout>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit}>
          {usernameError}
          <Input
            value={username}
            onChange={onUsernameChange}
            type="text"
            placeholder="Username"
          />
          <Input type="password" placeholder="Password" />
          <Button
            type="submit"
            placeholder="Log in"
            disabled={username === "" || username.length < 5}
          />
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
