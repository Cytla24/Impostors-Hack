import React, { Component } from "react";
import { SearchBar } from "./components/searchbar";
import { FoodFootPrint } from "./components/foodFootprint";
import Flights from "./Flights";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ResponsiveDrawer from "./components/sidebar";
import Dashboard from "./components/dashboard";

class App extends Component {
	constructor() {
		super();
		this.state = { appname: "Carbon is SUS" };
		this.changeName = this.changeName.bind(this);
	}

	changeName(name) {
		this.setState({ appname: name });
	}
	render() {
		return (
			<div className={"flex"}>
				<Router>
					<div style={{ display: "flex" }}>
						<ResponsiveDrawer
							changeName={this.changeName}
							name={this.state.appname}
						/>
						<Switch>
							<Route
								path="/foodfootprint"
								exact
								component={FoodFootPrint}
							/>
							<Route
								path="/dashboard"
								exact
								component={Dashboard}
							/>
							<Route
								path="/plantrips"
								exact
								component={SearchBar}
							/>
							<Route
								path="/flights/:origin/:destination"
								exact
								component={Flights}
							/>
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
