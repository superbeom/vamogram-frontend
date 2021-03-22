import { isLoggedInVar } from "../apollo";

export default () => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => isLoggedInVar(true)}>Login</button>
    </div>
  );
};
