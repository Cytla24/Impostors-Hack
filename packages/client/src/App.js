import React, { Component } from "react";
import { SearchBar } from "./components/searchbar";
import { FoodFootPrint } from "./components/foodFootprint";


class App extends Component {
	render() {
		return (
			<div>
				<SearchBar />
				<FoodFootPrint/>
			</div>
		);
	}
}

export default App;
