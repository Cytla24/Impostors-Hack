import React, { Component } from "react";
import axios from "axios";
import { FlightCard } from "./components/flightCard";
import { Grid } from "@material-ui/core";

class Flights extends Component {
	constructor(props) {
		super(props);
		this.state = {
			flights: [],
			origin: props.match.params.origin,
			destination: props.match.params.destination,
		};
	}

	renderCards = () => {
		var flightCards = [];
		this.state.flights.map((props) => {
			flightCards.push(<FlightCard {...props} />);
		});
		return flightCards;
	};

	async componentDidMount() {
		const { origin, destination } = this.state;
		const url = `https://imposters-hack.herokuapp.com/flights?date=2020-12-12&origin=${origin}&destination=${destination}`;
		const response = await axios.get(`${url}`).catch((error) => {
			alert(`something went wrong :(`);
			console.log(error);
		});
		this.setState({ flights: response.data });
		console.log(response.data);
	}

	render() {
		return (
			<div>
				<h1>Flights</h1>
				{this.state.flights[0] ? (
					<Grid container>{this.renderCards()}</Grid>
				) : (
					<p>Loading...</p>
				)}
			</div>
		);
	}
}

export default Flights;
