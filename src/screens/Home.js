import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
    }
  }
`;

const PhotoContainer = styled.div`
  max-width: 615px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;

const PhotoHeader = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
`;

const Likes = styled(FatText)`
  display: block;
  margin-top: 15px;
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);

  return (
    <div>
      {data?.seeFeed?.map((photo) => (
        <PhotoContainer key={photo.id}>
          <PhotoHeader>
            <Avatar url={photo.user.avatar} lg />
            <Username>{photo.user.username}</Username>
          </PhotoHeader>
          <PhotoFile src={photo.file} />
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon icon={faHeart} size={"2x"} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon icon={faComment} size={"2x"} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon icon={faPaperPlane} size={"2x"} />
                </PhotoAction>
              </div>
              <div>
                <FontAwesomeIcon icon={faBookmark} size={"2x"} />
              </div>
            </PhotoActions>
            <Likes>
              {photo.likes === 1 ? "1 like" : `${photo.likes} likes`}
            </Likes>
          </PhotoData>
        </PhotoContainer>
      ))}
    </div>
  );
};

export default Home;
