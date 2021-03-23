import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import { FatLink } from "../components/shared";

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

export default () => (
  <AuthLayout>
    <FormBox>
      <HeaderContainer>
        <FontAwesomeIcon icon={faInstagram} size="3x" />
        <Subtitle>Sign up to see photos and videos from your friends.</Subtitle>
      </HeaderContainer>
      <form>
        <Input type="text" placeholder="Name" />
        <Input type="text" placeholder="Email" />
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Button type="submit" placeholder="Sign up" />
      </form>
    </FormBox>
    <BottomBox
      cta={"Have an account?"}
      link={routes.home}
      linkText={"Log in"}
    />
  </AuthLayout>
);
