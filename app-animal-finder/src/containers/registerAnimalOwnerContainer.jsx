import { useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { API } from '../api/api';
import { useHistory } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from 'notistack';
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

export default function Register() {
	const [ showPassword, setShowPassword ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ name, setName ] = useState('');
	const [ errors, setErrors ] = useState({
		email: false,
		password: false,
		phone: false,
		name: false
	});
	const { enqueueSnackbar } = useSnackbar();

	let history = useHistory();

	const goBack = () => {
		history.goBack();
	};

	const goLogin = () => {
		history.push("/login");
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleChange = (event) => {
		if(event.target.name === 'email'){
			setEmail(event.target.value);
			if(validateEmail(event.target.value)){
				setErrors({
					email: false,
					password: errors.password,
					phone: errors.phone,
					name: errors.name,
				});
			}else{
				setErrors({
					email: true,
					password: errors.password,
					phone: errors.phone,
					name: errors.name,
				});
			}
		}else if(event.target.name === 'password'){
			setPassword(event.target.value);
			if((event.target.value).length < 6){
				setErrors({
					email: errors.email,
					password: true,
					phone: errors.phone,
					name: errors.name,
				});
			}else{
				setErrors({
					email: errors.email,
					password: false,
					phone: errors.phone,
					name: errors.name,
				});
			}
		}else if(event.target.name === 'phone'){
			setPhone(event.target.value);
			if((event.target.value).length === 15){
				setErrors({
					email: errors.email,
					password: errors.password,
					phone: false,
					name: errors.name,
				});
			}else{
				setErrors({
					email: errors.email,
					password: errors.password,
					phone: true,
					name: errors.name,
				});
			}
		}else if(event.target.name === 'name'){
			setName(event.target.value);
			if((event.target.value).length === 0){
				setErrors({
					email: errors.email,
					password: errors.password,
					phone: errors.phone,
					name: true,
				});
			}else{
				setErrors({
					email: errors.email,
					password: errors.password,
					phone: errors.phone,
					name: false,
				});
			}
		}
	};

	function validateEmail(mail) 
	{
		if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
		{
			return (true)
		}
		return (false)
	}

	const register = () => {

		if(errors.email === false && errors.password === false && errors.name === false && errors.phone === false && 
			email && name && password.length >= 6 && phone.length === 15){
			setLoading(true);

			let requestData = {
				name: name,
				email: email,
				phone: phone,
				password: password
			};

			API.post('auth/animalOwner/create',requestData).then(response => {
				if(response.Error == null){
					enqueueSnackbar('Cadastro realizado com sucesso !', { variant: 'success' });
					history.push("/login");
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
					Cadastro
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
							id="email-id"
							name="email"
							required
							disabled={loading}
							type="email"
							className={classes.inputStyle}
							label="E-mail"
							variant="outlined"
							onChange={handleChange}
							value={email}
							helperText={errors.email && 'E-mail invalido !'}
							error={errors.email}
							InputProps={{maxLength: 95}}
						/>
						<TextField
							id="password-id"
							name="password"
							required
							disabled={loading}
							type={showPassword ? 'text' : 'password'}
							className={classes.inputStyle}
							label="Senha"
							variant="outlined"
							onChange={handleChange}
							value={password}
							helperText={errors.password && 'Senha deve conter no minimo 6 digitos !'}
							error={errors.password}
							InputProps={{
								endAdornment: 	<IconButton
													aria-label="toque para ver a senha"
													onClick={handleClickShowPassword}
													edge="end"
												>
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>,
								maxLength: 95
							}}
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
						
						{loading ? (
							<div style={{textAlign: 'center'}}>
								<CircularProgress size={60} className={classes.buttonProgress} />
							</div>
						) : (
							<>
								<Button type="button" size="large" variant="contained" disabled={loading} onClick={register} className={classes.registerButton}>
									Finalizar
								</Button>
								<Button type="button" size="large" variant="contained" disabled={loading} onClick={goLogin} className={classes.loginButton}>
									Ir para login
								</Button>
							</>
						)}
					</form>
				</Grid>
			</Grid>
		</Container>
	);
}