# Cocktell - Search Cocktail Recipe - JavaScript Project

"Cocktell" is a project to practice Asynchronous JS, API fetching, OOP, Error Handling and other tools such as NPM, Parcel and Github. The appllication incorporate a search function, a user can search for diffent cocktail recipes by cocktail name or by single ingredient. A user can then view the recipe details and get similar cocktails suggestions.

The project consumes data from [CocktailDB API](https://www.thecocktaildb.com/api.php).

![screenshoot](Screenshot-Cocktell.png?raw=true)

## Overview

### The challenge

Users should be able to:

- Search for recipe by name or ingredient
- Search for recipe and view the results on Pagination area
- Navigate the search results and view results in pages
- View a recipe in the Recipe area when they click on a preview in the Pagination area
- Change servings of the menu and view immediate change in the quantity of ingredient
- Bookmark recipes and view bookmarked recipes in the Bookmark view
- Upload user-generated recipes to the API
- Load bookmarks and user-generated recipes when they reload the page

### Links

- Live Site URL: [Cocktell Netlify](https://cocktell.netlify.app/#17248)

## My process

### Built with

- HTML5
- CSS
- GitHub
- JavaScript (ES6)
- [Axios](https://axios-http.com/)
- [Parcel](https://parceljs.org/)
- Model-View-Controller Pattern
- OOP

### Development process

#### Search Field

Four endpoints were chosen:

- Search by ingredient: https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
- Search by name: https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
- Random cocktail: https://www.thecocktaildb.com/api/json/v1/1/random.php
- Lookup full cocktail details by id: https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

Choosing from the radio options (ingredient or name) sets the query type passed to the api call. A ternary operator help us to get the endpoint.

```js
export const loadSearchResults = async function (query, queryType) {
  try {
    const endpoint =
      queryType === "ingredient" ? "filter.php?i=" : "search.php?s=";
    const { drinks } = await AJAX(`${API_LINK}${endpoint}${query}`);
    ...
  } catch (error) {
    ...
  }
};
```

#### Cocktail Detail Page

The detail page is fetched when hash changes or page loaded. The hash id then passed to the corresponding api call.

```js
export const loadRecipe = async function (id) {
  try {
    const { drinks } = await AJAX(`${API_LINK}lookup.php?i=${id}`);
    state.recipe = formatDrink(drinks[0], false);
  }
  ...
};
```

The data from the endpoints are not in the same format, some endpoints only deliver brief information. This was resolved by using short circuting and spread operator:

```js
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
```

The ingredients data from the API was unstructured and with many empty or null values, and the ingredients and measures are separated into different key: value pairs. A seperate function is defined to resoleve this challenge:

```js
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
```

#### Similar cocktails

The similar cocktails recommendation was created by pooling all the relavant cocktails from api calls by ingredients of the cocktail on show, then randomly choose some cocktails from the pool.

```js
export const generateSimilarDrinks = async function () {
  try {
    const ingredients = state.recipe.ingredients.map((e) => e[0]);
    const data = await AJAXBatch(`${API_LINK}filter.php`, ingredients, "i");
    const drinks = data.reduce((arr, cur) => [...arr, ...cur.drinks], []);
    state.similarDrinks = [];
    for (let i = 0; i < NUM_SIMILAR_DRINK ** 2; i++) {
      // Select one new drink from the results
      const drink = drinks[Math.floor(Math.random() * drinks.length)];
      if (
        !state.similarDrinks.find((d) => d.id === drink.idDrink) &&
        drink.idDrink !== state.recipe.id
      ) {
        state.similarDrinks.push(formatDrink(drink, true));
      }
      if (state.similarDrinks.length >= NUM_SIMILAR_DRINK) break;
    }
  } catch (error) {
    throw error;
  }
};
```

#### Random Cocktail

The "Shake a Cocktail" and "Cocktail of the Day" functions are achieved by geting data from the random endpoint. The random cocktail(s) are then displayed in the recipe view or search result view.

"Cocktails of the Day" are generated daily and saved in the browser, if there is no local storage item, cocktails recommendations will be regenerated.

### Running batch API calls

When fetching daily recommendations or similar drinks, multiple API calls have to be made. Instead of using a for-loop and await for the results on by one (synchronous behavior), Promise.all() is used to handle the batch AJAX calls concurrently:

```js
// helper.js
export const AJAXBatch = async function (url, paramsArr = [], paramsType) {
  try {
    const promises = paramsArr.map((p) =>
      axios.get(url, {
        params: paramsType ? { [paramsType]: p } : {},
      })
    );
    const response = await Promise.race([
      timeout(TIMEOUT),
      Promise.allSettled(promises),
    ]);
    ...
  } catch (err) {
    throw err;
  }
};
```

### Continued development

- improving responsive web design
- sort search results
- bookmark feature
- improving failed search notifications
- add backend server and login function
