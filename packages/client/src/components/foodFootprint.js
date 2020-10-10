import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { FoodCards } from "./food-cards";
import camera from "./camera";

const useStyles = (theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "50ch",
		},
	},
});

class FoodFootPrintInner extends React.Component {
	constructor() {
		super();
		this.state = { image: "", imageData: [] };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.openCamera = this.openCamera.bind(this);
	}
	openCamera() {
		camera.startCamera();
	}
	async handleSubmit(event) {
		
		camera.takeSnapshot();
		const image = "https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
		console.log(camera.canvasObject());
		event.preventDefault();
		const proxy = "/convertImage";
		const response = await axios
			.get(`${proxy}`, {
				params: {
					image: image,
				},
			})
			.catch((error) => {
				alert(`something went wrong :(`);
				console.log(error);
			});
			console.log(response);
		const {
			data: {
				names,
				carbon_footprint
			},
		} = response;
		console.log(response);
		const imageData = [
			{ names:response.data.Names, carbon_footprint:response.data.Carbon_footprint}
		];
		this.setState({ imageData });
	}

	handleChange(event) {
		this.setState({ [event.target.id]: event.target.value });
	}

	handleReset() {
		this.setState({ value: "" });
	}

	render() {
		const { classes } = this.props;
		const { imageData } = this.state;
		return (
			<div>
			<Button key="submit-button" type="button" onClick={this.openCamera}>
				Open Camera
			</Button>
			<Button key="submit-button" type="button" onClick={this.handleSubmit}>
				Take Image
			</Button>
			<FoodCards imageData={imageData} />
			</div>
		);
	}
}

export const FoodFootPrint = withStyles(useStyles)(FoodFootPrintInner);
