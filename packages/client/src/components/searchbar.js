import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
	TextField,
	Button,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Badge,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import axios from "axios";
import { Cards } from "./cards";
import "../index.css";

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
		this.state = { origin: "", dest: "", cardsData: [], searched: false };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	render() {
		const { classes } = this.props;
		const { cardsData, searched } = this.state;
		return (
			<div>
				<AppBar
					position="absolute"
					// className={clsx(classes.appBar, open && classes.appBarShift)}
				>
					<Toolbar className={classes.toolbar}>
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							className={classes.title}
						>
							Dashboard
						</Typography>
						<IconButton color="inherit">
							<Badge badgeContent={4} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>
				<div className={searched ? "container-up" : "container"}>
					{/* <h1>Hey!</h1> */}
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
						<p>Example: Boston, California</p>
						<div>{this.renderButtons()}</div>
					</form>
				</div>
				{cardsData[0] ? (
					<Cards cardsData={cardsData} />
				) : (
					<p>No results found</p>
				)}
			</div>
		);
	}

	async handleSubmit(event) {
		event.preventDefault();
		const url = "/getPaths";
		await this.setState({ searched: true });
		const response = await axios
			.get(`${url}`, {
				params: {
					origin: this.state.origin,
					destination: this.state.dest,
				},
			})
			.catch((error) => {
				alert(`something went wrong :(`);
				console.log(error);
				return;
			});
		if (response.status === 200) {
			const {
				data: {
					origin,
					destination,
					driving_time,
					rail_time,
					flight_time,
					car_cf,
					rail_cf,
					flight_cf,
				},
			} = response;
			const cardsData = [
				{
					origin,
					destination,
					mode: "Flight",
					time: flight_time,
					cf: flight_cf,
				},
				{
					origin,
					destination,
					mode: "Rail",
					time: rail_time,
					cf: rail_cf,
				},
				{
					origin,
					destination,
					mode: "Car",
					time: driving_time,
					cf: car_cf,
				},
			];
			this.setState({ cardsData });
		} else {
			alert("Something went wrong :( ");
		}
	}

	handleChange(event) {
		this.setState({ [event.target.id]: event.target.value });
	}

	handleReset() {
		this.setState({ origin: "", dest: "", searched: false });
	}

	renderButtons = () => {
		const buttons = [
			<Button
				key="submit-button"
				type="submit"
				style={{
					display: "inline-block",
					marginLeft: "10px",
					marginTop: "30px",
				}}
			>
				Submit
			</Button>,
			<Button
				key="reset-button"
				type="reset"
				style={{
					display: "inline-block",
					marginLeft: "10px",
					marginTop: "30px",
				}}
			>
				Reset
			</Button>,
		];
		return buttons;
	};
}

export const SearchBar = withStyles(useStyles)(SearchBarInner);
