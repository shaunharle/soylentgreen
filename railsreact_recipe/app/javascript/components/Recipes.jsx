import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

class Recipes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: [],
			searchString: ""
		};
		this.getAllRecipes = this.getAllRecipes.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSearchFilter = this.handleSearchFilter.bind(this);
	}
	componentDidMount() {
		this.getAllRecipes();
	}
	getAllRecipes() {
		const url = "/api/v1/recipes/index";
		fetch(url)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok.");
			})
			.then(response => this.setState({ recipes: response }))
			.catch(() => this.props.history.push("/"));
	}
	handleChange(event) {
		const { value } = event.target;
		this.setState({
			searchString: value
		});
	}
	handleSearchFilter() {
		const filteredRecipes = this.state.recipes.filter(recipe => {
			return recipe.name === this.state.searchString;
		});
		this.setState({
			recipes: filteredRecipes,
			searchString: ""
		});
	}
	render() {
		const { recipes } = this.state;
		const allRecipes = recipes.map((recipe, index) => (
			<div key={index} className="col-md-6 col-lg-4">
				<div className="card mb-4">
					<img
						src={recipe.image}
						className="card-img-top"
						alt={`${recipe.name} image`}
					/>
					<div className="card-body">
						<h5 className="card-title">{recipe.name}</h5>
						<Link to={`/recipe/${recipe.id}`} className="btn custom-button">
							View Recipe
						</Link>
					</div>
				</div>
			</div>
		));
		const noRecipe = (
			<div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
				<h4>
					No recipes yet. Why not <Link to="/new_recipe">create one</Link>
				</h4>
			</div>
		);

		return (
			<>
				<section className="jumbotron jumbotron-fluid text-center">
					<div className="container py-5">
						<h1 className="display-4">
							Recipes for when you're feeling like having family for dinner.
						</h1>
						<p className="lead text-muted">
							These are super popular recipes from around the world for people
							who tire of contributing to factory farms and want to do their
							part to help with climate change.
						</p>
						<Search
							handleChange={this.handleChange}
							searchString={this.state.searchString}
							handleSearchFilter={this.handleSearchFilter}
							getAllRecipes={this.getAllRecipes}
						/>
					</div>
				</section>
				<div className="py-5">
					<main className="container">
						<div className="text-right mb-3">
							<Link to="/recipe" className="btn custom-button">
								Create New Recipe
							</Link>
						</div>
						<div className="row">
							{recipes.length > 0 ? allRecipes : noRecipe}
						</div>
						<Link to="/" className="btn btn-link">
							Home
						</Link>
					</main>
				</div>
			</>
		);
	}
}
export default Recipes;
