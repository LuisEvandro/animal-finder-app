import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles({
	marginFooter: {
		marginTop: 20,
		marginBottom: 20,
	},
	gridFooter:{
		paddingTop: 30,
		textAlign: 'center'
	},
	textFooter: {
		fontSize: 16,
		fontWeight: 600,
		color: 'var(--text)',
	},
	textSpanNameFooter: {
		fontSize: 17,
		color: 'var(--color-logo-1)'
	},
	textSpanIconFooter: {
		fontSize: 18,
		color: 'var(--red)'
	},
	textLinkFooter: {
		color: 'var(--text)',
	}
});

export default function Footer() {

	const classes = useStyles();
	const date = new Date();

	return (
		<Container fixed className={classes.marginFooter}>
			<Divider />
			<Grid container spacing={3} className={classes.gridFooter}>
				<Grid item xs={12} style={{paddingBottom: 0}}>
					<Typography variant="overline" display="block" className={classes.textFooter} gutterBottom>
						© {date.getFullYear()} <span className={classes.textSpanIconFooter}>♥</span> Created by <span className={classes.textSpanNameFooter}>Luis Evandro</span>.
					</Typography>
				</Grid>
				<Grid item xs={6} style={{textAlign: 'right'}}>
					<Link href="https://github.com/LuisEvandro" target="_blank" className={classes.textLinkFooter}>
						<GitHubIcon fontSize="large" />
					</Link>
				</Grid>
				<Grid item xs={6} style={{textAlign: 'left'}}>
					<Link href="https://www.linkedin.com/in/luis-evandro-06b54818b" target="_blank" className={classes.textLinkFooter}>
						<LinkedInIcon fontSize="large" />
					</Link>
				</Grid>
			</Grid>
		</Container>
	);
}