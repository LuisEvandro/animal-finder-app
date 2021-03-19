import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../images/logo_ong_animal_finder.png';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PetsIcon from '@material-ui/icons/Pets';
import { Link } from "react-router-dom";
import { logout, isAuthenticated, getUserData } from "../services/auth";

const useStyles = makeStyles({
	drawer: {
		width: 220,
	},
	drawerIcon:{
		marginBottom: 8,
		marginTop: 7,
		color: 'var(--color-logo-1)'
	},
	logo: {
		marginLeft: "auto",
    	marginRight: "auto"
	},
	img: {
		maxHeight: 60
	},
	dividerList:{
		marginTop: 8,
		marginBottom: 8
	},
	iconColor:{
		color: '#1498D5'	
	},
	backgroundLeftBar:{
		backgroundColor: 'var(--background)'
	},
	nameUser:{
		fontSize: '1rem',
		color: 'var(--color-logo-2)',
		fontWeight: 600,
		marginLeft: 5,
		marginRight: 5
	}
});


export default function Header() {
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState([]);

	useEffect(() => {
		if(isAuthenticated()){
			let user = getUserData();
			setUser(user);
		}
	}, []);

	const headerItemsAuthTrue = [
		{ "Nome": "Início", "Link": "/", "Chave": "HomeKey", "Icone": "HomeIcon" },
		{ "Nome": "Meus animais", "Link": `/backoffice/animal`, "Chave": "BackOfficeAnimal", "Icone": "PetsIcon" },
		{ "Nome": "Registrar animal", "Link": "/cadastro/animal", "Chave": "RegisterAnimalKey", "Icone": "PetsIcon" },
	];

	const headerItemsAuthFalse = [
		{ "Nome": "Início", "Link": "/", "Chave": "HomeKey", "Icone": "HomeIcon" },
		{ "Nome": "Login ", "Link": "/login", "Chave": "LoginKey", "Icone": "AccountBoxIcon" },
		{ "Nome": "Registre-se", "Link": "/cadastro/dono-animal", "Chave": "RegisterKey", "Icone": "PersonAddIcon" },
	];

	const IconSelected = (Icon) => {
		switch(Icon.IconName){
			case 'HomeIcon': return <HomeIcon/>;
			case 'AccountBoxIcon': return <AccountBoxIcon/>;
			case 'PersonAddIcon': return <PersonAddIcon/>;
			case 'PetsIcon': return <PetsIcon/>;
			default: return <BrokenImageIcon/>
		}
	};

	function ListItemLink(props) {
		return <ListItem button component="a" {...props} />;
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const logoutButton = () => {
		logout();
	};

	const classes = useStyles();

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.iconColor} aria-label="menu-icon" onClick={handleDrawerOpen}>
						<MenuIcon />
					</IconButton>
					<Link to={'/'} className={classes.logo}><img src={Logo} className={classes.img} alt="logo" /></Link>
					{isAuthenticated() && 
						<>
							<IconButton edge="end" className={classes.iconColor} aria-label="menu-icon">
								<AccountCircleIcon />
							</IconButton>
							<span className={classes.nameUser}>{user && user.name}</span>
						</>
					}
				</Toolbar>
			</AppBar>
			<Drawer
				variant="persistent"
				anchor="left"
				open={open}
				className={classes.backgroundLeftBar}
			>
				<div className={classes.drawer}>
					<IconButton className={classes.drawerIcon} onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
					<Divider />
				</div>
				<List>
					{isAuthenticated() ? (
						headerItemsAuthTrue.map((item,index) => (
							<div key={index}>
								<ListItemLink href={item.Link} button key={item.Chave}>
									<ListItemIcon><IconSelected IconName={item.Icone} /></ListItemIcon>
									<ListItemText primary={item.Nome} />
								</ListItemLink>
								<Divider className={classes.dividerList} />
							</div>
						))
					) : (
						headerItemsAuthFalse.map((item,index) => (
							<div key={index}>
								<ListItemLink href={item.Link} button key={item.Chave}>
									<ListItemIcon><IconSelected IconName={item.Icone} /></ListItemIcon>
									<ListItemText primary={item.Nome} />
								</ListItemLink>
								<Divider className={classes.dividerList} />
							</div>
						))
					)}
					
					{isAuthenticated() && (
						<>
							<ListItemLink href={'/'} onClick={logoutButton} button key={'sair-01'}>
								<ListItemIcon><ExitToAppIcon /></ListItemIcon>
								<ListItemText primary={'Sair'} />
							</ListItemLink>
							<Divider className={classes.dividerList} />
						</>
					)}

				</List>
			</Drawer>
		</>
	);
}