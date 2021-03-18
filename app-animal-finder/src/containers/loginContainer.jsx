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
import { setToken, setUserData } from "../services/auth";

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
		headerLogin: {
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
			marginTop: 25
		},
		buttonProgress:{
			textAlign: 'center',
			color: 'var(--color-logo-1)'
		}
	})
);

export default function Login() {
	const [ showPassword, setShowPassword ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errors, setErrors ] = useState({
		email: false,
		password: false
	});
	const { enqueueSnackbar } = useSnackbar();

	let history = useHistory();

	const goBack = () => {
		history.goBack();
	};

	const goCadastro = () => {
		history.push("/cadastro");
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
					password: errors.password
				});
			}else{
				setErrors({
					email: true,
					password: errors.password
				});
			}
		}else if(event.target.name === 'password'){
			setPassword(event.target.value);
			if((event.target.value).length < 6){
				setErrors({
					email: errors.email,
					password: true
				});
			}else{
				setErrors({
					email: errors.email,
					password: false
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

	const login = () => {

		if(errors.email === false && errors.password === false && email && password.length >= 6){
			setLoading(true);

			let requestData = {
				email: email,
				pass: password
			};

			API.post('auth/login',requestData).then(response => {
				if(response.Error == null){
					let tokenData = response.Data.token;
					setToken(tokenData.token);
					setUserData(response.Data);
					enqueueSnackbar('Login realizado com sucesso !', { variant: 'success' });
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
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<IconButton aria-label="go-back" onClick={goBack}>
						<ArrowBackIcon fontSize="large" />
					</IconButton>
				</Grid>
				<Grid item xs={12} className={classes.headerLogin}>
					LOGIN
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
						
						{loading ? (
							<CircularProgress size={60} className={classes.buttonProgress} />
						) : (
							<>
								<Button type="button" size="large" variant="contained" disabled={loading} onClick={login} className={classes.loginButton}>
									Login
								</Button>
								<Button type="button" size="large" variant="contained" disabled={loading} onClick={goCadastro} className={classes.registerButton}>
									Cadastrar-se
								</Button>
							</>
						)}
					</form>
				</Grid>
			</Grid>
		</Container>
	);
}