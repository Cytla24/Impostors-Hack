import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";

const useStyles = (theme) => ({
	root: {
		maxWidth: 700,
	},
});

class CardInner extends React.Component {
	renderButtons = () => {
		const buttons = [<Button key="more">Offset Carbon Footprint</Button>];
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
