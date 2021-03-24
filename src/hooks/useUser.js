import { useEffect } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

export default () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, error, loading } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);

  return { data, loading };
};
