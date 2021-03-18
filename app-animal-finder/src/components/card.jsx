import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

const ColorButton = withStyles(() => ({
  root: {
    color: 'var(--white)',
	transition: '0.3s',
    backgroundColor: 'var(--green)',
    '&:hover': {
		paddingInline: 35,
		backgroundColor: 'var(--color-logo-1)',
    },
  },
}))(Button);

const useStyles = makeStyles({
	image: {
		marginTop: 10,
		height: 200,
		backgroundSize: 'contain'
	},
	cardDescription: {
		minHeight: 180,
	},
	TypographyStyle: {
		color: 'var(--color-logo-2)',
	},
	TypographyTitleStyle: {
		color: 'var(--color-logo-1)',
		marginBottom: 10,
	},
	TypographySubTitleStyle: {
		color: 'var(--color-logo-1)',
		textTransform: 'uppercase'
	},
	marginTop25: {
		marginTop: 25
	},
	statusDivStyle: {
		marginTop: 15,
		textAlign: "left"
	},
	statusStyle: {
		marginLeft: 8,
	},
	smileButton: {
		marginRight: 5
	},
	button: {
		textAlign: "center",
		marginTop: 30,
		marginBottom: 5	
	}
});

export default function ItemCard(props) {
	const classes = useStyles();
	let history = useHistory();

	const handleClickOpen = () => {
		console.log(props);
		history.push(`/encontrei/${props.item.guid}`)
	};

	return (
		<Card>
			<CardMedia
				className={classes.image}
				image={props.item.photo}
				title={props.item.name}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" className={classes.TypographyTitleStyle}  component="h2">
					{props.item.name} - {props.item.age} {props.item.age > 1 ? 'Anos' : 'Ano'}
				</Typography>
				
				<Typography variant="subtitle2" align="justify" className={classes.TypographyStyle, classes.cardDescription}>
					{props.item.description}
				</Typography>

				<Typography variant="subtitle2" align="left" className={classes.TypographyStyle, classes.marginTop25}>
					<span className={classes.TypographySubTitleStyle}>Local : </span> {props.item.cityMissing} - {props.item.stateMissing}
				</Typography>

				<Typography variant="subtitle2" align="left" className={classes.TypographyStyle, classes.statusDivStyle}>
					<span className={classes.TypographySubTitleStyle}>Status : </span>
					<Chip color="secondary" icon={<SentimentVeryDissatisfiedIcon />} className={classes.statusStyle} label={props.item.status.toUpperCase()}/>
				</Typography>

				{!props.hideButtonFound && 
					<div className={classes.button}>
						<ColorButton variant="contained" color="primary" size="large" onClick={handleClickOpen}>
							<SentimentVerySatisfiedIcon className={classes.smileButton}/> ENCONTREI
						</ColorButton>
					</div>
				}
			</CardContent>
		</Card>
	);
}