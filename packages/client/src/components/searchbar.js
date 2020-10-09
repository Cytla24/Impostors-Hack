import React, { Component } from "react";

class SearchBar extends Component {
	render() {
		const { placeholder } = this.props;

		return (
			<div>
				<input type="text" placeholder={placeholder || ""} />
			</div>
		);
	}
}

export default SearchBar;
// export default withRouter(App);
