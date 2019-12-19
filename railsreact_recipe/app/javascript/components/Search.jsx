import React from "react";
import ReactDOM from "react-dom";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchString: "",
			recipes: []
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.setState({
			recipes: recipes
		});
		this.refs.search.focus();
	}

	handleChange() {
		this.setState({
			searchString: this.refs.search.value
		});
	}

	render() {
		let _recipes = this.state.recipes;
		let search = this.state.searchString.trim().toLowerCase();

		if (search.length > 0) {
			_recipes = _recipes.filter(function(recipe) {
				return recipe.name.toLowerCase().match(search);
			});
		}

		return (
			<div>
				<h3>React - simple search</h3>
				<div>
					<input
						type="text"
						value={this.state.searchString}
						ref="search"
						onChange={this.handleChange}
						placeholder="type name here"
					/>
					<ul>
						{_recipes.map(l => {
							return <li>{recipe.name}</li>;
						})}
					</ul>
				</div>
			</div>
		);
	}
}
export default Search;
ReactDOM.render(<Search />, document.getElementById("app"));
