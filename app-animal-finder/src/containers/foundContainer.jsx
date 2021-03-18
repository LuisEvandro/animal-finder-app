import { useState, useEffect} from 'react';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { API } from '../api/api';
import { useHistory, useParams } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from 'notistack';
import Backdrop from '@material-ui/core/Backdrop';
import SendIcon from '@material-ui/icons/Send';
import Card from '../components/card';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputMask from 'react-input-mask';

const useStyles = makeStyles(() =>
	createStyles({
		boxContainer: {
			marginTop: 50,
			marginBottom: 100
		},
		inputStyle:{
			width: '100%',
			marginBottom: 25,
		},
		headerFound: {
			textAlign: 'center',
			fontSize: '1.5rem',
			fontWeight: 'bold',
			marginBottom: 25,
			color: 'var(--color-logo-1)',
			textTransform: 'uppercase'
		},
		foundButton:{
			width: '100%'
		},
		buttonProgress:{
			textAlign: 'center',
			color: 'var(--color-logo-1)'
		},
		backdrop: {
			zIndex: 999,
			color: 'var(--color-logo-1)',
		}
	})
);

const ColorButton = withStyles(() => ({
  root: {
    color: 'var(--white)',
    backgroundColor: 'var(--green)',
    '&:hover': {
      backgroundColor: 'var(--color-logo-1)',
    },
  },
}))(Button);

export default function Found() {
	const [ loading, setLoading ] = useState(false);
	const [ loaderIntial, setLoaderIntial ] = useState(true);
	const [ animal, setAnimal ] = useState(null);
	const [ phone, setPhone ] = useState('');
	const [ name, setName ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ errors, setErrors ] = useState({
		phone: false,
		name: false,
		description: false
	});
	const { enqueueSnackbar } = useSnackbar();
	let history = useHistory();
	let { animalGuid } = useParams();
	
	const goBack = () => {
		history.goBack();
	};

	useEffect(() => {
		API.get(`animals/${animalGuid}`,null).then(response => {
			if(response.Error === null){
				setAnimal(response);
				setLoaderIntial(false);
			}else{
				enqueueSnackbar(response.Error , { variant: 'error' });
			}
		});
	}, []);

	const handleChange = (event) => {
		//console.log(event.target.name+' - '+event.target.value);
		if(event.target.name === 'phone'){
			setPhone(event.target.value);
			if((event.target.value).length == 15){
				setErrors({
					phone: false,
					name: errors.name,
					description: errors.description
				});
			}else{
				setErrors({
					phone: true,
					name: errors.name,
					description: errors.description
				});
			}
		}else if(event.target.name === 'name'){
			setName(event.target.value);
			if((event.target.value).length === 0){
				setErrors({
					phone: errors.phone,
					name: true,
					description: errors.description
				});
			}else{
				setErrors({
					phone: errors.phone,
					name: false,
					description: errors.description
				});
			}
		}else if(event.target.name === 'description'){
			setDescription(event.target.value);
			if((event.target.value).length > 0 && (event.target.value).length <= 480){
				setErrors({
					phone: errors.phone,
					name: errors.name,
					description: false
				});
			}else{
				setErrors({
					phone: errors.phone,
					name: errors.name,
					description: true
				});
			}
		}
	};

	const sendNotification = () => {

		if(errors.phone === false && errors.name === false && phone && name){
			setLoading(true);

			let requestData = {
				phone: phone,
				name: name,
				description: description,
				animalGuid: animal.Data.guid
			};

			API.post('notifications/create',requestData).then(response => {
				if(response.Error === null){
					enqueueSnackbar('Aviso enviado com sucesso !', { variant: 'success' });
					history.push("/");
				}else{
					enqueueSnackbar(response.Error , { variant: 'error' });
					setLoading(false);
				}
			});
		}else{

		}
	};

	const classes = useStyles();

	return (
		<Container fixed className={classes.boxContainer}>
			<Backdrop className={classes.backdrop} open={loaderIntial}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<IconButton aria-label="go-back" onClick={goBack}>
						<ArrowBackIcon fontSize="large" />
					</IconButton>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h6" className={classes.headerFound} gutterBottom>
						Comunicar o dono
					</Typography>
				</Grid>
			</Grid>
			<Grid
				container
				direction="row"
				justify="center"
				spacing={3}
			>
				<Grid item xs={12} sm={12} md={4} lg={4}>
					{animal && 
						<Card item={animal.Data} hideButtonFound={true} /> 
					}
				</Grid>
				<Grid item xs={12} sm={12} md={4} lg={4} >
					<Paper style={{padding:15}}>
						<Typography variant="h6" className={classes.headerFound} gutterBottom>
							Seus dados para contato
						</Typography>
						<form 
							noValidate
						>
							<TextField
								id="name-id"
								name="name"
								required
								disabled={loading}
								type="text"
								className={classes.inputStyle}
								label="Nome"
								mask="(99) 99999-9999"
								onChange={handleChange}
								value={name}
								variant="outlined"
								helperText={errors.name && 'Nome invalido ou vazio!'}
								error={errors.name}
								InputProps={{maxLength: 95}}
							/>
							<InputMask
								mask="(99) 99999-9999"
								id="phone-id"
								name="phone"
								required
								value={phone}
								disabled={loading}
								maskChar=""
								onChange={handleChange}
							>
								{() => <TextField
									id="phone-id"
									name="phone"
									required
									disabled={loading}
									type="text"
									className={classes.inputStyle}
									label="Telefone"
									variant="outlined"
									onChange={handleChange}
									value={phone}
									helperText={errors.phone && 'Telefone invalido !'}
									error={errors.phone}
									InputProps={{ maxLength: 95 }}
								/>}
							</InputMask>
							<TextField
								id="description-id"
								name="description"
								label="Descrição"
								required
								disabled={loading}
								multiline
								rows={5}
								className={classes.inputStyle}
								onChange={handleChange}
								value={description}
								variant="outlined"
								helperText={errors.description && 'Descrição invalida ou vazia !'}
								error={errors.description}
								InputProps={{ maxLength: 480 }}
							/>
							
							{loading ? (
								<div style={{textAlign: 'center'}}>
									<CircularProgress size={60} className={classes.buttonProgress} />
								</div>
							) : (
								<>
									<ColorButton type="button" size="large" variant="contained" color="primary" disabled={loading} onClick={sendNotification} className={classes.foundButton}>
										Enviar <SendIcon style={{marginLeft: 10}} />
									</ColorButton>
								</>
							)}
						</form>
					</Paper>
				</Grid>
			</Grid>
			
		</Container>
	);
}