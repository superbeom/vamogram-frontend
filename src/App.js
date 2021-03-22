import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { isLoggedInVar, darkModeVar } from "./apollo";
import { ThemeProvider } from "styled-components";

const lightTheme = {
  bgColor: "lightgray",
  fontColor: "#2c2c2c",
};

const darkTheme = {
  bgColor: "#2c2c2c",
  fontColor: "lightgray",
};

export default () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
