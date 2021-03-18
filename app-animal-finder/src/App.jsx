import {BrowserRouter as Router} from "react-router-dom";
import "../src/css/global.css";
import Routes from "./routes";
import Header from "./components/header";
import Footer from "./components/footer";
import { SnackbarProvider } from 'notistack';

export default function App() {
	
	return (
		<SnackbarProvider maxSnack={3}>
			<Router>
				<Header />
				<Routes />
				<Footer />
			</Router>
		</SnackbarProvider>
	);
}