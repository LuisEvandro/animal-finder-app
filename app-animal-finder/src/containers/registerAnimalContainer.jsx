import { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { API } from '../api/api';
import { useHistory } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from 'notistack';
import { getUserData } from '../services/auth';

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
		headerRegister: {
			textAlign: 'center',
			fontSize: '2rem',
			fontWeight: 'bold',
			marginBottom: 25,
			color: 'var(--color-logo-1)'
		},
		loginButton:{
			width: '100%'
		},
		registerButton:{
			width: '100%',
			marginTop: 25,
			marginBottom: 25
		},
		buttonProgress:{
			textAlign: 'center',
			color: 'var(--color-logo-1)'
		}
	})
);

export default function RegisterAnimal() {
	const [ loading, setLoading ] = useState(false);
	const [ name, setName ] = useState('');
	const [ age, setAge ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ cityMissing, setCityMissing ] = useState('');
	const [ stateMissing, setStateMissing ] = useState('');
	const [ user, setUser ] = useState([]);

	const [ errors, setErrors ] = useState({
		name: false,
		age: false,
		description: false,
		cityMissing: false,
		stateMissing: false
	});
	const { enqueueSnackbar } = useSnackbar();

	let history = useHistory();

	useEffect(() => {
		setUser(getUserData());
	}, []);

	const goBack = () => {
		history.goBack();
	};

	const handleChange = (event) => {
		if(event.target.name === 'name'){
			setName(event.target.value);
			if((event.target.value).length > 1){
				setErrors({
					name: false,
					age: errors.age,
					description: errors.description,
					cityMissing: errors.cityMissing,
					stateMissing: errors.stateMissing,
				});
			}else{
				setErrors({
					name: true,
					age: errors.age,
					description: errors.description,
					cityMissing: errors.cityMissing,
					stateMissing: errors.stateMissing,
				});
			}
		}else if(event.target.name === 'age'){
			setAge(event.target.value);
		}else if(event.target.name === 'photo'){

		}else if(event.target.name === 'description'){
			setDescription(event.target.value);
			if((event.target.value).length === 0){
				setErrors({
					name: errors.name,
					age: errors.age,
					description: true,
					cityMissing: errors.cityMissing,
					stateMissing: errors.stateMissing,
				});
			}else{
				setErrors({
					name: errors.name,
					age: errors.age,
					description: false,
					cityMissing: errors.cityMissing,
					stateMissing: errors.stateMissing,
				});
			}
		}else if(event.target.name === 'cityMissing'){
			setCityMissing(event.target.value);
			if((event.target.value).length === 0){
				setErrors({
					name: errors.name,
					age: errors.age,
					description: errors.description,
					cityMissing: true,
					stateMissing: errors.stateMissing,
				});
			}else{
				setErrors({
					name: errors.name,
					age: errors.age,
					description: errors.description,
					cityMissing: false,
					stateMissing: errors.stateMissing,
				});
			}
		}else if(event.target.name === 'stateMissing'){
			setStateMissing(event.target.value);
			if((event.target.value).length === 0){
				setErrors({
					name: errors.name,
					age: errors.age,
					description: errors.description,
					cityMissing: errors.cityMissing,
					stateMissing: false,
				});
			}else{
				setErrors({
					name: errors.name,
					age: errors.age,
					description: errors.description,
					cityMissing: errors.cityMissing,
					stateMissing: false,
				});
			}
		}
	};

	const register = () => {

		if(errors.age === false && errors.name === false && errors.description === false && errors.cityMissing === false && 
			errors.stateMissing === false){
			setLoading(true);

			let requestData = {
				name: name,
				age: parseInt(age),
				photo: "http://lorempixel.com/800/600/animals/",
				description: description,
				cityMissing: cityMissing,
				stateMissing: stateMissing,
				status: "perdido",
				guidOwner: user && user.guid
			};

			API.post('animal/create',requestData).then(response => {
				if(response.Error == null){
					enqueueSnackbar('Cadastro realizado com sucesso !', { variant: 'success' });
					history.push("/backoffice/animal");
				}else{
					enqueueSnackbar(response.Error , { variant: 'error' });
					setLoading(false);
				}
			});
		}else{
			enqueueSnackbar('Preencha os campos corretamente !' , { variant: 'error' });
		}
	};

	const classes = useStyles();

	return (
		<Container fixed className={classes.boxContainer}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<IconButton aria-label="go-back" onClick={goBack}>
						<ArrowBackIcon fontSize="large" />
					</IconButton>
				</Grid>
				<Grid item xs={12} className={classes.headerRegister}>
					Cadastrar animal perdido
				</Grid>
			</Grid>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="flex-start"
			>
				<Grid item xs={4}>
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
							variant="outlined"
							onChange={handleChange}
							value={name}
							helperText={errors.name && 'Nome invalido !'}
							error={errors.name}
							InputProps={{maxLength: 95}}
						/>
						<TextField
							id="age-id"
							name="age"
							required
							disabled={loading}
							type="number"
							className={classes.inputStyle}
							label="Idade"
							variant="outlined"
							onChange={handleChange}
							value={age}
							helperText={errors.age && 'Idade invalida !'}
							error={errors.age}
							InputProps={{max: 20, min:0}}
						/>
						<TextField
							id="photo-id"
							name="photo"
							required
							disabled={loading}
							type="file"
							className={classes.inputStyle}
							label="Foto"
							variant="outlined"
						/>
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
						<TextField
							id="cityMissing-id"
							name="cityMissing"
							required
							disabled={loading}
							type="text"
							className={classes.inputStyle}
							label="Cidade"
							variant="outlined"
							onChange={handleChange}
							value={cityMissing}
							helperText={errors.cityMissing && 'Cidade invalida !'}
							error={errors.cityMissing}
							InputProps={{ maxLength: 50 }}
						/>
						<TextField
							id="stateMissing-id"
							name="stateMissing"
							required
							disabled={loading}
							type="text"
							className={classes.inputStyle}
							label="Estado"
							variant="outlined"
							onChange={handleChange}
							value={stateMissing}
							helperText={errors.stateMissing && 'Estado invalida !'}
							error={errors.stateMissing}
							InputProps={{ maxLength: 50 }}
						/>
						
						{loading ? (
							<div style={{textAlign: 'center'}}>
								<CircularProgress size={60} className={classes.buttonProgress} />
							</div>
						) : (
							<>
								<Button type="button" size="large" variant="contained" disabled={loading} onClick={register} className={classes.registerButton}>
									Finalizar
								</Button>
							</>
						)}
					</form>
				</Grid>
			</Grid>
		</Container>
	);
}