import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { Cards } from "./cards";

const useStyles = (theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "50ch",
		},
	},
});

class SearchBarInner extends React.Component {
	constructor() {
		super();
		this.state = { origin: "", dest: "", cardsData: [] };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	async handleSubmit(event) {
		event.preventDefault();
		const proxy = "/getPaths";
		const response = await axios
			.get(`${proxy}`, {
				params: {
					origin: this.state.origin,
					destination: this.state.dest,
				},
			})
			.catch((error) => {
				alert(`something went wrong :(`);
				console.log(error);
			});
		const {
			data: {
				origin,
				destination,
				distance,
				driving_time,
				rail_time,
				flight_time,
			},
		} = response;
		console.log(response);
		const cardsData = [
			{ origin, destination, mode: "Flight", time: flight_time },
			{ origin, destination, mode: "Rail", time: rail_time },
			{ origin, destination, mode: "Car", time: driving_time },
		];
		this.setState({ cardsData });
	}

	handleChange(event) {
		this.setState({ [event.target.id]: event.target.value });
	}

	handleReset() {
		this.setState({ value: "" });
	}

	renderButtons = () => {
		const buttons = [
			<Button key="submit-button" type="submit">
				Submit
			</Button>,
			<Button key="reset-button" type="reset">
				Reset
			</Button>,
		];
		return buttons;
	};

	render() {
		const { classes } = this.props;
		const { cardsData } = this.state;
		return (
			<form
				className={classes.root}
				onReset={this.handleReset}
				onSubmit={this.handleSubmit}
				noValidate
				autoComplete="off"
			>
				<TextField
					id="origin"
					label="Origin"
					value={this.state.origin}
					onChange={this.handleChange}
				/>
				<TextField
					id="dest"
					label="Destination"
					value={this.state.dest}
					onChange={this.handleChange}
				/>
				{this.renderButtons()}
				<Cards cardsData={cardsData} />
			</form>
		);
	}
}

export const SearchBar = withStyles(useStyles)(SearchBarInner);
