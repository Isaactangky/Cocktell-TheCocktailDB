import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import resultsView from "./views/resultsView.js";
import searchMessageView from "./views/searchMessageView.js";
import searchView from "./views/searchView.js";

const controlLoadRandomRecipes = async function () {
  try {
    await model.loadRandomRecipes();
    resultsView.render(model.state.search.results);
  } catch (error) {
    resultsView.renderError();
  }
};

const controlLoadSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.state.search.results);
    searchMessageView.render(model.state.search.query);
  } catch (error) {
    resultsView.renderError(error);
  }
};
const controlLoadRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    resultsView.update(model.state.search.results);
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

searchView.addHandlerSearchFrom(controlLoadSearchResults);
recipeView.addHandlerLoadRecipe(controlLoadRecipe);
controlLoadRandomRecipes().then(() => {});
