import React from "react";
import { MyCard as Card } from "./card";
import { Grid, withStyles } from "@material-ui/core";

const useStyles = (theme) => ({
	root: {
		maxWidth: 700,
	},
	gridContainer: {
		paddingTop: "80px",
		paddingLeft: "40px",
		paddingRight: "40px",
	},
});

export class CardsInner extends React.Component {
	render() {
		const { classes, cardsData } = this.props;
		const cards = [];
		cardsData.map(({ origin, destination, mode, time, cf }) => {
			cards.push(
				<Card
					key={`${origin}-${destination}-${mode}`}
					origin={origin}
					destination={destination}
					mode={mode}
					time={time}
					cf={cf}
				/>
			);
		});
		return (
			<Grid container spacing={4} className={classes.gridContainer}>
				{cards}
			</Grid>
		);
	}
}

export const Cards = withStyles(useStyles)(CardsInner);
