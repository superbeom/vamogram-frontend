export default ({ setIsLoggedIn }) => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => setIsLoggedIn((curIsLoggedIn) => !curIsLoggedIn)}>
        Login
      </button>
    </div>
  );
};
