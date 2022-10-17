import {
  API_LINK,
  NUM_RANDOM_DRINKS,
  NUM_SIMILAR_DRINK,
  RECIPES_PER_PAGE,
  RANDOM_POOL,
  MAX_API_CALL,
  MAX_LOOP,
} from "./config.js";
import { AJAX, AJAXBatch } from "./helper.js";
export const state = {
  search: {
    type: "",
    query: "",
    results: [],
    page: 1,
    recipesPerPage: RECIPES_PER_PAGE,
    numPages: 1,
  },
  recipe: {},
  similarDrinks: [],
  randomRecipe: {},

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
  return {
    id: drink.idDrink,
    name: drink.strDrink,
    imgSrc: `${drink.strDrinkThumb}${preview ? "/preview" : ""}`,
    ...(drink.strCategory && { category: drink.strCategory }),
    ...(drink.strGlass && { glass: drink.strGlass }),
    ...(drink.strIBA && { IBA: drink.strIBA }),
    ...(drink.strAlcoholic && { alcoholic: drink.strAlcoholic }),
    // TODO reformat instructions
    ...(drink.strInstructions && { instructions: drink.strInstructions }),
    ...(!preview && { ingredients: formatIngredients(drink) }),
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
    state.search.numPages = Math.ceil(
      state.search.results.length / state.search.recipesPerPage
    );
  } catch (error) {
    throw error;
  }
};
const setLocalStorage = function () {
  const date = new Date();
  const dateStr = `${date.getDate()}/${date.getMonth()}`;
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
export const load1RandomRecipe = async function (preview = true) {
  try {
    const { drinks } = await AJAX(`${API_LINK}random.php`);
    if (!drinks) throw new Error(":(  Fail to shake cocktail");
    state.randomRecipe = formatDrink(drinks[0], preview);
    return state.randomRecipe;
  } catch (error) {
    throw error;
  }
};
export const loadRandomRecipes = async function () {
  try {
    const history = getLocalStorage();
    // if date changes or no local storage, get random recipes from api
    if (
      !history ||
      history.date !== `${new Date().getDate()}/${new Date().getMonth()}` ||
      history.randomRecipes.length !== NUM_RANDOM_DRINKS
    ) {
      const drinksArray = await AJAXBatch(
        NUM_RANDOM_DRINKS,
        `${API_LINK}random.php`
      );
      const formatedDrinks = drinksArray.map((d) => formatDrink(d.drinks[0]));
      state.search.results = formatedDrinks;
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
    // console.log(state.recipe);
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

export const generateSimilarDrinks = async function () {
  try {
    const endpoint = "filter.php?i=";
    const ingredients = state.recipe.ingredients.map((e) => e[0]);
    state.similarDrinks = [];
    let numCalls = 0;

    while (
      state.similarDrinks.length < NUM_SIMILAR_DRINK &&
      numCalls < MAX_API_CALL
    ) {
      // 1) randomly choose an ingredient
      const ing = ingredients[Math.floor(Math.random() * ingredients.length)];
      numCalls++;
      // 2) search by ingredient
      const { drinks } = await AJAX(`${API_LINK}${endpoint}${ing}`);

      if (!drinks || drinks.length <= 1) continue;
      // 3) select (drinks.length / RANDOM POOL) drinks
      const num_drinks = Math.ceil(drinks.length / RANDOM_POOL);
      let count = 0;
      // 4) MAX_LOOP: there may not be enough drinks to make count >= num_drinks
      //    break the loop if there is not enough drinks in the pool
      //    and make another api call
      for (let i = 0; i < MAX_LOOP; i++) {
        if (
          count >= num_drinks ||
          state.similarDrinks.length >= NUM_SIMILAR_DRINK
        )
          break;
        // 5) Select one new drink from the results
        const drink = drinks[Math.floor(Math.random() * drinks.length)];
        if (
          !state.similarDrinks.find((d) => d.id === drink.idDrink) &&
          drink.idDrink !== state.recipe.id
        ) {
          state.similarDrinks.push(formatDrink(drink, true));
          count++;
        }
      }
    }
  } catch (error) {
    throw error;
  }
};
