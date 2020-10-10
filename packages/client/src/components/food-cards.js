import React from "react";
import { FoodCard as Card } from "./food-card";

export class FoodCards extends React.Component {
	render() {
		const { imageData } = this.props;
		return imageData.map(({ names, carbon_footprint }) => {
			return (
				<div style={{display: 'flex',marginLeft: '300px'}}>
				<Card
					key={`${names}-${carbon_footprint}`}
					names={names}
					carbon_footprint={carbon_footprint}
				/>
				</div>
			);
		});
	}
}
