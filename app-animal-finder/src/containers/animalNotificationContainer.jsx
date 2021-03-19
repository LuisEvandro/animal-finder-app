import { useEffect, useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { API } from '../api/api';
import { useHistory, useParams } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
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

export default function BackofficeAnimalNotification() {
	const [ loadingBackdrop, setLoadingBackdrop ] = useState(true);
	const [ loading, setLoading ] = useState(false);
	const [ notifications, setNotifications ] = useState([]);
	const [ animal, setAnimal ] = useState([]);
	
	let history = useHistory();

	const goBack = () => {
		history.goBack();
	};

	let { animalGuid } = useParams();

	useEffect(() => {
		setLoading(true);
		setLoadingBackdrop(true);

		let requestData = {
			page: 1,
			size: 1000,
			orderBy: "desc"
		}

		API.post(`notification/${animalGuid}`,requestData).then(response => {
			if(response.Error == null){
				setNotifications(response.Data);
			}
		});

		API.get(`animals/${animalGuid}`).then(response => {
			if(response.Error == null){
				setAnimal(response.Data);
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
				{!loading && 
					<>
						<Grid item xs={12} className={classes.headerBackoffice}>
							Notificações do {animal && animal.name} - {animal && (animal.age > 1 ? animal.age+' anos' : animal.age+' ano')}
						</Grid>
						<Grid item xs={12}>
							<List className={classes.list}>
								<ListItem>
									<ListItemText primary="Nome"/>
									<ListItemText primary="Telefone" />
									<ListItemText primary="Descrição"/>
								</ListItem>
								{notifications.map((notificationItem,index) => {
									return (
										<ListItem key={index}>
											<ListItemText secondary={notificationItem.name} style={{width: 100}} />
											<ListItemText secondary={notificationItem.phone} style={{width: 100}} />
											<ListItemText secondary={notificationItem.description} style={{width: 300}} />
										</ListItem>)
								})}
							</List>
						</Grid>
					</>
				}
			</Grid>
		</Container>
	);
}