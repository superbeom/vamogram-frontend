import { useParams } from "react-router";

const Profile = () => {
  const { username } = useParams();

  console.log("username: ", username);

  return "Profile";
};

export default Profile;
