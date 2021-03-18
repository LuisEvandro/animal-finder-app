import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SentimentDissatisfiedSharp from '@material-ui/icons/SentimentDissatisfiedSharp';

export default function page404() {
	return (
		<Container fixed style={{textAlign: 'center', marginTop: 100, marginBottom: 100}}>
			<Card variant="outlined" style={{paddingTop: 50, paddingBottom: 50}}>
				<CardContent>
					<Typography variant="h1" component="h2">
						<SentimentDissatisfiedSharp fontSize="large"/>
					</Typography>
					<Typography variant="h1" component="h1">
						404
					</Typography>
				</CardContent>
			</Card>
		</Container>
	);
}