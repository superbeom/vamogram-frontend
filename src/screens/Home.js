import { isLoggedInVar } from "../apollo";

export default () => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => isLoggedInVar(false)}>Logout</button>
    </div>
  );
};
