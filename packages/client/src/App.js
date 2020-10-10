import React, { Component } from "react";
import { SearchBar } from "./components/searchbar";
import { FoodFootPrint } from "./components/foodFootprint";
import Flights from "./Flights";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ResponsiveDrawer from "./components/sidebar";

class App extends Component {
	render() {
		return (
			<div>
			<ResponsiveDrawer/>
			<Router>
				<Switch>
					<Route path="/plantrips" exact component={SearchBar} />
					<Route
						path="/flights/:origin/:destination"
						exact
						component={Flights}
					/>
				</Switch>
			</Router>
			</div>
		);
	}
}

export default App;
