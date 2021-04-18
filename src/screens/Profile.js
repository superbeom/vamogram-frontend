import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";

import useUser from "../hooks/useUser";
import {
  SEE_PROFILE_QUERY,
  FOLLOW_USER_MUTATION,
  UNFOLLOW_USER_MUTATION,
} from "../schema/mutations";

import { FatText } from "../components/shared";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";

const Header = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-right: 150px;
  margin-left: 50px;
`;

const Column = styled.div``;

const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
  font-size: 16px;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  margin-right: 20px;
`;

const Value = styled(FatText)`
  font-size: 18px;
`;

const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div`
  position: relative;
  background-image: url(${(props) => props.bg});
  background-size: cover;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin: 0px 5px;
  font-size: 18px;
  svg {
    margin-right: 5px;
    font-size: 14px;
  }
`;

const ProfileBtn = styled(Button).attrs({
  as: "span",
})`
  margin-top: 0;
  margin-left: 10px;
`;

const Profile = () => {
  const { username } = useParams();
  const { data: userData } = useUser();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  const updateFollowUser = (cache, result) => {
    const {
      data: {
        followUser: { ok },
      },
    } = result;

    if (!ok) {
      return;
    }

    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return true;
        },
        totalFollowers(prev) {
          return prev + 1;
        },
      },
    });

    cache.modify({
      id: `User:${userData?.username}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1;
        },
      },
    });
  };

  const updateUnfollowUser = (cache, result) => {
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;

    if (!ok) {
      return;
    }

    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return false;
        },
        totalFollowers(prev) {
          return prev - 1;
        },
      },
    });

    cache.modify({
      id: `User:${userData?.username}`,
      fields: {
        totalFollowing(prev) {
          return prev - 1;
        },
      },
    });
  };

  const [followUserMutation] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    update: updateFollowUser,
  });
  const [unfollowUserMutation] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    update: updateUnfollowUser,
  });

  const getButton = (seeProfile) => {
    const { isMe, isFollowing } = seeProfile;

    if (isMe) return <ProfileBtn>Edit Profile</ProfileBtn>;
    else if (isFollowing)
      return <ProfileBtn onClick={unfollowUserMutation}>Unfollow</ProfileBtn>;
    else return <ProfileBtn onClick={followUserMutation}>follow</ProfileBtn>;
  };

  return (
    <div>
      <PageTitle
        title={
          loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile`
        }
      />

      <Header>
        <Avatar src={data?.seeProfile?.avatar} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile && getButton(data.seeProfile)}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName} {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos?.map((photo) => (
          <Photo key={photo.id} bg={photo.file}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo.commentNumber}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </div>
  );
};

export default Profile;
