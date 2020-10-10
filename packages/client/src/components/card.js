import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";

const useStyles = (theme) => ({
	root: {
		maxWidth: 700,
	},
});

class CardInner extends React.Component {
	constructor() {
		super();
		this.state = {};
		this.handlePay = this.handlePay.bind(this);
	}

	handlePay() {
		window.open("http://localhost:5000/pay");
	}
	renderButtons = () => {
		const buttons = [
			<Button key="pay" onClick={this.handlePay}>
				Offset Carbon Footprint
			</Button>,
		];
		return buttons;
	};

	render() {
		const { classes, origin, destination, mode, time, cf } = this.props;
		const arrow = "   =>  ";
		return (
			<Card className={classes.root}>
				<CardContent>
					<h2>
						{origin}
						{arrow}
						{destination}
					</h2>
					<h3>By {mode}</h3>
					<p>{time}</p>
					<p>Carbon Footprint: {cf}</p>
				</CardContent>
				<CardActions>{this.renderButtons()}</CardActions>
			</Card>
		);
	}
}

export const MyCard = withStyles(useStyles)(CardInner);
