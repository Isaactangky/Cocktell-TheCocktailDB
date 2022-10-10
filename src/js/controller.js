import * as model from "./model.js";
import loaderView from "./views/loaderView.js";
import recipeView from "./views/recipeView.js";
import resultsView from "./views/resultsView.js";
import searchMessageView from "./views/searchMessageView.js";
import searchView from "./views/searchView.js";

const controlLoadRandomRecipes = async function () {
  try {
    loaderView.show();

    await model.loadRandomRecipes();
    resultsView.render(model.state.search.results);
  } catch (error) {
    resultsView.renderError();
  }
  loaderView.hide();
};

const controlLoadSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    loaderView.show();
    await model.loadSearchResults(query);
    resultsView.render(model.state.search.results);
    searchMessageView.render(model.state.search.query);
  } catch (error) {
    resultsView.renderError(error);
  }
  loaderView.hide();
};
const controlLoadRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    loaderView.show();
    resultsView.update(model.state.search.results);

    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
  loaderView.hide();
};

searchView.addHandlerSearchFrom(controlLoadSearchResults);
recipeView.addHandlerLoadRecipe(controlLoadRecipe);
controlLoadRandomRecipes().then(() => {});
