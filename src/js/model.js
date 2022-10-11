import { API_LINK, NUM_RANDOM_DRINKS, RECIPES_PER_PAGE } from "./config.js";
import { AJAX } from "./helper.js";
export const state = {
  search: {
    type: "",
    query: "",
    results: [],
    page: 1,
    recipesPerPage: RECIPES_PER_PAGE,
  },
  recipe: {},
  bookmarks: [],
};

const formatIngredients = function (drink) {
  const ingredients = Object.entries(drink)
    .filter((ele) => ele[0].startsWith("strIngredient") && ele[1])
    .map((ele) => ele[1]);
  const quantity = Object.entries(drink)
    .filter((ele) => ele[0].startsWith("strMeasure") && ele[1])
    .map((ele) => ele[1]);
  const arrIng = [];
  ingredients.forEach((e, i) => arrIng.push([e, quantity[i] || null]));
  return arrIng;
};
const formatDrink = function (drink, preview = true) {
  // Partial data for preview
  if (preview) {
    return {
      id: drink.idDrink,
      name: drink.strDrink,
      imgSrc: `${drink.strDrinkThumb}/preview`,
    };
  }
  // Full data for recipe
  const ingredients = formatIngredients(drink);
  return {
    id: drink.idDrink,
    name: drink.strDrink,
    category: drink.strCategory,
    imgSrc: drink.strDrinkThumb,
    glass: drink.strGlass,
    IBA: drink.strIBA,
    alcoholic: drink.strAlcoholic,
    ingredients,
    // TODO reformat instructions
    instructions: drink.strInstructions.split(".").filter((ele) => ele !== ""),
  };
};
export const loadSearchResults = async function (query, queryType) {
  try {
    const endpoint =
      queryType === "ingredient" ? "filter.php?i=" : "search.php?s=";
    const { drinks } = await AJAX(`${API_LINK}${endpoint}${query}`);
    if (!drinks)
      throw new Error(":(  No cocktail found, please try another keyword");

    state.search.query = query;
    state.search.type = queryType;
    state.search.results = drinks.map((drink) => formatDrink(drink));
  } catch (error) {
    throw error;
  }
};
const setLocalStorage = function () {
  const date = new Date();
  const dateStr = `${date.getDate()}/${date.getMonth()}`;
  console.log(dateStr);
  const recommendations = JSON.stringify({
    date: dateStr,
    randomRecipes: state.search.results,
  });
  localStorage.setItem("recommendations", recommendations);
};
const getLocalStorage = function () {
  const history = JSON.parse(localStorage.getItem("recommendations"));
  return history;
};
export const loadRandomRecipes = async function () {
  try {
    const history = getLocalStorage();
    // if date changes or no local storage, get random recipes
    if (
      !history ||
      history.date !== `${new Date().getDate()}/${new Date().getMonth()}`
    ) {
      for (let i = 0; i < NUM_RANDOM_DRINKS; i++) {
        const { drinks } = await AJAX(`${API_LINK}random.php`);
        if (!drinks)
          throw new Error(":(  No cocktail found, please try another keyword");
        const drink = formatDrink(drinks[0]);
        state.search.results.push(drink);
      }
      setLocalStorage();
    } else {
      state.search.results = history.randomRecipes;
    }
  } catch (error) {
    throw error;
  }
};

export const loadRecipe = async function (id) {
  // lookup.php?i=11007
  try {
    const { drinks } = await AJAX(`${API_LINK}lookup.php?i=${id}`);
    state.recipe = formatDrink(drinks[0], false);
    console.log(state.recipe);
  } catch (error) {
    throw error;
  }
};
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const pageStart = (page - 1) * state.search.recipesPerPage;
  const pageEnd = page * state.search.recipesPerPage;
  return state.search.results.slice(pageStart, pageEnd);
};
