import React from "react";
import ReactDOM from "react-dom";

const Search = props => {
	return (
		<div>
			<h3>React - simple search</h3>
			<div>
				<input
					type="text"
					value={props.searchString}
					onChange={props.handleChange}
					placeholder="type name here"
				/>
				<button onClick={props.handleSearchFilter}>Search</button>
				<button onClick={props.getAllRecipes}>All Recipes</button>
			</div>
		</div>
	);
};
export default Search;
