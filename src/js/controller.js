import * as model from "./model.js";
import loaderView from "./views/loaderView.js";
import paginationView from "./views/paginationView.js";
import recipeView from "./views/recipeView.js";
import resultsView from "./views/resultsView.js";
import searchMessageView from "./views/searchMessageView.js";
import searchView from "./views/searchView.js";

const controlLoadRandomRecipes = async function () {
  try {
    loaderView.show();

    await model.loadRandomRecipes();
    resultsView.render(model.state.search.results);
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();
  }
  loaderView.hide();
};

const controlLoadSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    const queryType = searchView.getSearchOption();
    if (!query) return;
    loaderView.show();
    await model.loadSearchResults(query, queryType);
    resultsView.render(model.getSearchResultsPage(1));
    searchMessageView.render(model.state.search.query);
    paginationView.render(model.state.search);
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
    resultsView.update(model.getSearchResultsPage());

    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
  loaderView.hide();
};
const controlPagination = function (newPage) {
  resultsView.render(model.getSearchResultsPage(newPage));
  paginationView.render(model.state.search);
};

searchView.addHandlerSearchFrom(controlLoadSearchResults);
recipeView.addHandlerLoadRecipe(controlLoadRecipe);
paginationView.addHandlerPagination(controlPagination);
controlLoadRandomRecipes().then(() => {});
