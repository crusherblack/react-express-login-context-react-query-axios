import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContextProvider } from "./context/appContext";
//pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Post from "./pages/Post";
import NestedAPI from "./pages/NestedAPI";
import NotFound from "./pages/NotFound";

//components

import PrivateRoute from "./components/PrivateRoute";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/posts" component={Post} />
          <Route exact path="/nested-api" component={NestedAPI} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/product/:id" component={Product} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AppContextProvider>
  );
};

export default App;
