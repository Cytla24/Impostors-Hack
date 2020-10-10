import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { FoodCards } from "./food-cards";
import Gallery from "./gallery.js";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "50ch",
		},
	}
}));


class FoodFootPrintInner extends React.Component {
	constructor() {
		super();
		this.state = { image: "", imageData: [] };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}


	async handleSubmit(event) {		
		let urls = [
		  "https://images.all-free-download.com/images/graphicthumb/food_picture_03_hd_pictures_167556.jpg",
		  "https://images.all-free-download.com/images/graphicthumb/westernstyle_fast_food_highdefinition_picture_167342.jpg",
		  "https://images.all-free-download.com/images/graphicthumb/delicious_food_salad_03_hd_picture_167551.jpg",
		];
		const image = urls[1]
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
		let urls = [
		  "https://images.all-free-download.com/images/graphicthumb/food_picture_03_hd_pictures_167556.jpg",
		  "https://images.all-free-download.com/images/graphicthumb/westernstyle_fast_food_highdefinition_picture_167342.jpg",
		  "https://images.all-free-download.com/images/graphicthumb/delicious_food_salad_03_hd_picture_167551.jpg",
		];
		return (
			<div>
			<Gallery imageUrls={urls} />
			<h1 style={{marginLeft: '300px',marginTop:'60px'}} > Feature demos the use of the cloud vision Api.<br/> Can you guess which food is being identified?<br/>Save the Planet.<br/> Offset your footprint. </h1>
			<Button key="submit-button" type="button" onClick={this.handleSubmit}
			style={{display: 'inline-block',marginLeft: '300px',marginTop:'5px'}}
			>
				Show Carbon Footprint
			</Button>
			<FoodCards imageData={imageData} />
			</div>
		);
	}
}

export const FoodFootPrint = withStyles(useStyles)(FoodFootPrintInner);
