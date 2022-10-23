import * as model from "./model.js";
import loaderView from "./views/loaderView.js";
import paginationView from "./views/paginationView.js";
import functionsView from "./views/functionsView.js";
import recipeView from "./views/recipeView.js";
import resultsView from "./views/resultsView.js";
import searchMessageView from "./views/searchMessageView.js";
import searchView from "./views/searchView.js";
import menuView from "./views/menuView.js";
import similarDrinksView from "./views/similarDrinksView.js";
import bookmarkView from "./views/bookmarkView.js";

const controlLoadRandomRecipes = async function () {
  try {
    loaderView.show();

    await model.loadRandomRecipes();
    resultsView.render(model.state.search.results);
    paginationView.render(model.state.search);
  } catch (error) {
    searchMessageView.renderError(error);
  }
  loaderView.hide();
};
const controlShakeCocktail = async function () {
  try {
    loaderView.show();
    await model.load1RandomRecipe(false);
    // trigger hash change event, then controlLoadRecipe
    window.location.hash = `#${model.state.randomRecipe.id}`;
  } catch (error) {
    recipeView.renderError(error);
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
    searchMessageView.renderError(error);
    resultsView.renderError();
  }
  menuView.show();
  loaderView.hide();
};
const controlLoadRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    loaderView.show();
    // recipeView.hide();
    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    await model.generateSimilarDrinks();
    similarDrinksView.render(model.state.similarDrinks);
    menuView.hide();
  } catch (error) {
    if (error.status !== 400) recipeView.renderError(error);
    similarDrinksView.renderError(error);
  }
  // recipeView.show();
  loaderView.hide();
};

const controlPagination = function (newPage) {
  resultsView.render(model.getSearchResultsPage(newPage));
  paginationView.render(model.state.search);
};
const controlAddBookmark = function () {
  console.log("recipe", model.state.recipe);
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe);
  console.log("recipe", model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const controlLoadBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};
const init = function () {
  controlLoadRandomRecipes()
    .then(() => menuView.show())
    .catch((error) => {
      searchMessageView.renderError(error);
      resultsView.renderError(error);
    });
  bookmarkView.addHandlerBookmark(controlLoadBookmark);
  searchView.addHandlerSearchFrom(controlLoadSearchResults);
  recipeView.addHandlerLoadRecipe(controlLoadRecipe);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  paginationView.addHandlerPagination(controlPagination);
  functionsView.addHandlerRandomCocktail(controlShakeCocktail);
  menuView.addHandlerClick();
};
init();
