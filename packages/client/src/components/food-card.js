import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";

const useStyles = (theme) => ({
	root: {
		maxWidth: 345,
	},
});

class FoodCardInner extends React.Component {
	renderButtons = () => {
		const buttons = [<Button key="more">Offset Carbon Footprint</Button>];
		return buttons;
	};

	render() {
		const { classes, names, carbon_footprint } = this.props;
		return (
			<Card className={classes.root}>
				<CardContent>
					<h2>
						{names.join(",")}
						<br/><br/>
						Estimated Carbon Footprint of food in Grams: {carbon_footprint}
					</h2>
					
				</CardContent>
				<CardActions>{this.renderButtons()}</CardActions>
			</Card>
		);
	}
}

export const FoodCard = withStyles(useStyles)(FoodCardInner);
