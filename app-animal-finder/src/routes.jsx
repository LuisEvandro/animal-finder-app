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
import RegisterAnimalOwner from "./pages/RegisterAnimalOwner";
import BackofficeAnimal from "./pages/BackofficeAnimal";
import AnimalNotification from "./pages/AnimalNotification";
import RegisterAnimal from "./pages/RegisterAnimal";

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

				<LoginRoute path="/cadastro/dono-animal" exact component={RegisterAnimalOwner} />
				<LoginRoute path="/login" exact component={Login} />

				<PrivateRoute path="/backoffice/animal" exact component={BackofficeAnimal} />
				<PrivateRoute path="/backoffice/animal/:animalGuid" exact component={AnimalNotification} />
				<PrivateRoute path="/cadastro/animal" exact component={RegisterAnimal} />
				
				<Route component={Page404} />
			</Switch>
		</BrowserRouter>
	)
}