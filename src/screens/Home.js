export default ({ setIsLoggedIn }) => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => setIsLoggedIn((curIsLoggedIn) => !curIsLoggedIn)}>
        Logout
      </button>
    </div>
  );
};
