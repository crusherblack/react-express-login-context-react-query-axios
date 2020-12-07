import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AppContext } from "./context/appContext";
import { API, setAuthToken } from "./config/api";

import PrivateRoute from "./components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";

//pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Post from "./pages/Post";
import NestedAPI from "./pages/NestedAPI";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [state, dispatch] = useContext(AppContext);

  const loadUser = async () => {
    try {
      const response = await API("/check-auth");

      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      dispatch({
        type: "USER_LOADED",
        payload: response.data.data,
      });
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/logout" component={Logout} />

        <Route exact path="/posts" component={Post} />
        <Route exact path="/nested-api" component={NestedAPI} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/cart" component={Cart} />
        <PrivateRoute exact path="/product/:id" component={Product} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
