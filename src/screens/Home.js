import { useQuery } from "@apollo/client";

import { FEED_QUERY } from "../schema/authMutations";

import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

const Home = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      <PageTitle title={"Home"} />
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
};

export default Home;
