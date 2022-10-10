import { API_LINK, NUM_RANDOM_DRINKS } from "./config.js";

export const state = {
  search: {
    type: "",
    query: "",
    results: [],
  },
  recipe: {},
  bookmarks: [],
};

const AJAX = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok || !data)
      throw new Error("Cannot find receipt, please try again");
    return data;
  } catch (err) {
    throw err;
  }
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
const formatDrink = function (drink) {
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
    instructions: drink.strInstructions.split(".").filter((ele) => ele !== ""),
  };
};
export const loadSearchResults = async function (query) {
  try {
    const { drinks } = await AJAX(`${API_LINK}search.php?s=${query}`);
    if (!drinks)
      throw new Error(":(  No cocktail found, please try another keyword");
    state.search.query = query;
    state.search.results = drinks.map((drink) => formatDrink(drink));
  } catch (error) {
    throw error;
  }
};
export const loadRandomRecipes = async function () {
  try {
    // www.thecocktaildb.com/api/json/v1/1/random.php
    for (let i = 0; i < NUM_RANDOM_DRINKS; i++) {
      const { drinks } = await AJAX(`${API_LINK}random.php`);
      console.log("random", drinks);
      if (!drinks)
        throw new Error(":(  No cocktail found, please try another keyword");
      const drink = formatDrink(drinks[0]);
      state.search.results.push(drink);
    }
  } catch (error) {
    throw error;
  }
};

export const loadRecipe = async function (id) {
  // lookup.php?i=11007
  try {
    const { drinks } = await AJAX(`${API_LINK}lookup.php?i=${id}`);
    state.recipe = formatDrink(drinks[0]);
  } catch (error) {
    throw error;
  }
};
