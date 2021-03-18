import {
	Switch,
	Route,
	BrowserRouter,
	Redirect
} from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import Home from "./pages/Home";
import Page404 from "./pages/404";
import Login from "./pages/Login";
import Found from "./pages/Found";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);



export default function MainRoutes(){
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/encontrei/:animalGuid" exact component={Found} />

				<LoginRoute path="/login" exact component={Login} />
				
				<Route component={Page404} />
			</Switch>
		</BrowserRouter>
	)
}