import React,{ useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '../components/card';
import { API } from '../api/api';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles(() =>
	createStyles({
		marginPagination: {
			marginBottom: 50,
			marginTop: 35,
		},
		styleLoader: {
			marginBottom: 100,
			marginTop: 25,
			textAlign: "center"
		},
		styleBoxTextEmpty: {
			marginTop: 50,
			textAlign: "center",
		},
		styleTextEmpty: {
			textTransform: 'uppercase',
			color: 'var(--text)'
		},
		styleSearch: {
			marginTop: 25,
		},
		styleInputSearch: {
			width: '30%',
			'@media (max-width:780px)': {
				width: '55%'
			},
			'@media (max-width:550px)' : {
				width: '100%'
			}
		}
	})
);

export default function AnimalsList() {
	const classes = useStyles();
	const [ data , setData ] = useState([]);
	const [ animals , setAnimals ] = useState([]);
	const [ stringSearch , setStringSearch ] = useState("");
	const [ stringClickSearch , setStringClickSearch ] = useState("");
	const [ loading , setLoading ] = useState(true);

	const [page, setPage] = useState(1);
	const handleChangePage = (event, value) => {
		setPage(value);
	};

	const handleChangeSearch = (event) => {
		setStringSearch(event.target.value);
	};

	const clickSearch = () => {
		setPage(1);
		setStringClickSearch(stringSearch);
	};

	useEffect(() => {
		setLoading(true);
		let requestData = {
			page: page,
			size: 9,
			search: stringSearch,
			orderBy: "desc",
			status: "perdido"
		};

		API.post('animals/list',requestData).then(response => {
			if(response.Error == null){
				setData(response.Data);
				setAnimals(response.Data.Registros);
				setLoading(false);
			}else{
				setData(response);
				setLoading(false);
			}
		});

	}, [page,stringClickSearch]);

	return (
		<Container fixed>
			<Grid container spacing={3}>
				<Grid item xs={12} className={classes.styleSearch}>
					<TextField 
						label="Pesquisar" 
						value={stringSearch}
						className={classes.styleInputSearch}
						variant="outlined"
						color="secondary"
						onChange={handleChangeSearch}
						onKeyPress={event => {
							event.key === "Enter" && clickSearch();
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment>
									<IconButton aria-label="Search" onClick={clickSearch}>
										<SearchIcon />
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				{(animals.length > 0 && !loading) &&
					<>
						<Grid item xs={12} className={classes.marginPagination}>
							<Pagination color="standard" count={data.TotalPaginas} page={page} onChange={handleChangePage} />
						</Grid>
						{animals.map((animalItem,index) => {
							return 	(
								<Grid item xs={12} sm={6} md={4} key={animalItem.guid} >
									<Card key={animalItem.guid+index}  item={animalItem} hideButtonFound={false} /> 
								</Grid>
							)
						})}
						<Grid item xs={12} className={classes.marginPagination} >
							<Pagination color="standard" count={data.TotalPaginas} page={page} onChange={handleChangePage} />
						</Grid>
					</>
				}
					<>
						{(data.Contagem === 0 && !loading) &&
							<Grid item xs={12} className={classes.styleBoxTextEmpty}>
								<Typography variant="h6" className={classes.styleTextEmpty} gutterBottom>
									Sem Resultados
								</Typography>
							</Grid>
						}
						{loading &&
							<>
								<Grid item xs={12} className={classes.styleBoxTextEmpty}>
									<Typography variant="h6" className={classes.styleTextEmpty} gutterBottom>
										Carregando ...
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6} md={4} className={classes.styleLoader}>
									<Skeleton variant="rect" height={200} animation="wave" />
									<Skeleton variant="text" animation="wave" width="100%" />
									<Skeleton variant="text" animation="wave" width="85%" />
								</Grid>
								<Grid item xs={12} sm={6} md={4} className={classes.styleLoader}>
									<Skeleton variant="rect" height={200} animation="wave" />
									<Skeleton variant="text" animation="wave" width="100%" />
									<Skeleton variant="text" animation="wave" width="85%" />
								</Grid>
								<Grid item xs={12} sm={6} md={4} className={classes.styleLoader}>
									<Skeleton variant="rect" height={200} animation="wave" />
									<Skeleton variant="text" animation="wave" width="100%" />
									<Skeleton variant="text" animation="wave" width="85%" />
								</Grid>
							</>
						}
					</>

				{data.Error != null &&
					<Grid item xs={12} className={classes.styleBoxTextEmpty}>
						<Typography variant="h6" className={classes.styleTextEmpty} gutterBottom>
							{data.Error}
						</Typography>
					</Grid>
				}
			</Grid>
		</Container>
	);
}