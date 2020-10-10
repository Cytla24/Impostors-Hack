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

const styles = {
	fullHeightCard: {
		height: "100%",
	},
};

class CardInner extends React.Component {
	constructor() {
		super();
		this.state = {};
		this.handlePay = this.handlePay.bind(this);
	}

	handlePay() {
		window.open("http://localhost:5000/pay");
	}

	// handleFligh
	renderButtons = () => {
		const buttons = [
			<Button key="pay" onClick={this.handlePay}>
				Offset Carbon Footprint
			</Button>,
			this.props.mode == "Flight" ? (
				<Button key="pay">
					<a href="/flights/lax/ord">Find Flights</a>
				</Button>
			) : null,
		];
		return buttons;
	};

	render() {
		const { classes, origin, destination, mode, time, cf } = this.props;
		// const classes = useStyles();
		const arrow = " : ";
		return (
			<Grid item xs={12} sm={6} md={4}>
				<Card className={classes.root}>
					<CardContent>
						<h3>
							{origin}
							{arrow}
							{destination}
						</h3>
						<h3>By {mode}</h3>
						<p>{time}</p>
						<p>Carbon Footprint: {cf}</p>
					</CardContent>
					<CardActions>{this.renderButtons()}</CardActions>
				</Card>
			</Grid>
		);
	}
}

export const MyCard = withStyles(useStyles)(CardInner);
