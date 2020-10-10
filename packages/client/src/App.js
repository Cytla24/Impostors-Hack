import React, { Component } from "react";
import { SearchBar } from "./components/searchbar";
import { FoodFootPrint } from "./components/foodFootprint";
import Flights from "./Flights";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" exact component={SearchBar} />
					<Route path="/foodfootprint" exact component={FoodFootPrint} />
					<Route
						path="/flights/:origin/:destination"
						exact
						component={Flights}
					/>
				</Switch>
			</Router>
		);
	}
}

export default App;
