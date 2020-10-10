import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";

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
		);
	}
}

export const FlightCard = withStyles(useStyles)(FlightCardInner);
