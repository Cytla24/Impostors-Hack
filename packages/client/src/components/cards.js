import React from "react";
import { MyCard as Card } from "./card";

export class Cards extends React.Component {
	render() {
		const { cardsData } = this.props;
		return cardsData.map(({ origin, destination, mode, time, cf }) => {
			return (
				<div style={{display: 'inline-block',marginLeft: '10px'}}>
				<Card
					key={`${origin}-${destination}-${mode}`}
					origin={origin}
					destination={destination}
					mode={mode}
					time={time}
					cf={cf}
				/>
				</div>
			);
		});
	}
}
