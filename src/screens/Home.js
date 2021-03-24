import { logUserOut } from "../apollo";

export default () => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logUserOut()}>Logout</button>
    </div>
  );
};
