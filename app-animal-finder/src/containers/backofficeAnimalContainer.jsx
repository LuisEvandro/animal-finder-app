import { useEffect, useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { API } from '../api/api';
import { useHistory } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getUserData } from "../services/auth";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles(() =>
	createStyles({
		boxContainer: {
			marginTop: 50,
			marginBottom: 100
		},
		headerBackoffice: {
			textAlign: 'center',
			fontSize: '2rem',
			fontWeight: 'bold',
			marginBottom: 25,
			color: 'var(--color-logo-1)'
		},
		backdrop: {
			zIndex: 999,
			color: 'var(--color-logo-1)',
		},
		list:{
			width: '100%',
			maxHeight: 500,
			overflow: 'scroll'
		}
	})
);

export default function BackofficeAnimal() {
	const [ loadingBackdrop, setLoadingBackdrop ] = useState(true);
	const [ loading, setLoading ] = useState(false);
	const [ user, setUser ] = useState([]);
	const [ data, setData ] = useState([]);
	const [ animals, setAnimals ] = useState([]);
	
	let history = useHistory();

	const goBack = () => {
		history.goBack();
	};

	function ListItemLink(props) {
		return <ListItem button component="a" {...props} />;
	}

	useEffect(() => {
		setLoading(true);
		setLoadingBackdrop(true);
		let userData = getUserData();
		setUser(userData);

		API.get(`animalOwner/${userData.guid}`).then(response => {
			if(response.Error == null){
				setData(response.Data);
				setAnimals(response.Data.animals);
				setLoading(false);
				setLoadingBackdrop(false);
			}else{
				setLoading(false);
				setLoadingBackdrop(false);
			}
		});

	}, []);

	const classes = useStyles();

	return (
		<Container fixed className={classes.boxContainer}>
			<Backdrop className={classes.backdrop} open={loadingBackdrop}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<IconButton aria-label="go-back" onClick={goBack}>
						<ArrowBackIcon fontSize="large" />
					</IconButton>
				</Grid>
				<Grid item xs={12} className={classes.headerBackoffice}>
					Animais cadastrados por {user && user.name}
				</Grid>
				{!loading && 
					<Grid item xs={12}>
						<List className={classes.list}>
							<ListItem>
								<ListItemText primary="Nome"/>
								<ListItemText primary="Idade" />
								<ListItemText primary="Cidade"/>
								<ListItemText primary="Estado" />
								<ListItemText primary="Status" />
							</ListItem>
							{animals.slice(0).reverse().map((animal,index) => {
								return (
									<ListItemLink href={'animal/'+animal.guid} key={index}>
										<ListItemText secondary={animal.name} style={{width: 100}} />
										<ListItemText secondary={(animal.age > 1) ? animal.age+' anos' : animal.age+' ano'} style={{width: 100}} />
										<ListItemText secondary={animal.cityMissing} style={{width: 100}} />
										<ListItemText secondary={animal.stateMissing} style={{width: 100}} />
										<ListItemText secondary={animal.status} style={{width: 100}} />
									</ListItemLink>)
							})}
						</List>
					</Grid>
				}
			</Grid>
		</Container>
	);
}