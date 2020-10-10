import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
	Card,
	CardContent,
	CardActions,
	Button,
	Grid,
} from "@material-ui/core";

const useStyles = (theme) => ({
	root: {
		maxWidth: 700,
	},
});

class FlightCardInner extends React.Component {
	renderButtons = () => {
		const buttons = [<Button key="more">Purchase</Button>];
		return buttons;
	};

	render() {
		const {
			classes,
			flightNumber,
			arrivalTime,
			departureTime,
		} = this.props;
		return (
			<Grid item xs={12} sm={6} md={4}>
				<Card className={classes.root}>
					<CardContent>
						<h2>American Airlines Flight {flightNumber}</h2>
						<h3>Depature {departureTime}</h3>
						<h3>Arrival {arrivalTime}</h3>
						<p></p>
						<p></p>
					</CardContent>
					<CardActions>{this.renderButtons()}</CardActions>
				</Card>
			</Grid>
		);
	}
}

export const FlightCard = withStyles(useStyles)(FlightCardInner);
