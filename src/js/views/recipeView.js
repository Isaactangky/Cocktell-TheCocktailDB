import View from "./view.js";
class RecipeView extends View {
  _container = document.querySelector(".recipe-container");
  _errorMessage = "Cannot load recipe.";

  _generateMarkups() {
    const html = `        
    <div class="recipe-header">
      <img
        src=${this._data.imgSrc}
        alt="cocktail image"
        class="cocktail-img"
      />
      <h2 class="recipe-cocktail-title">${this._data.name}</h2>
    </div>
    <div class="recipe-info">
      ${this._generateCategoryMarkup()}
      <div class="recipe-main">
        <p class="info-title ingredients">INGREDIENTS</p>
        ${this._generateIngredientsMarkup()}

        <p class="info-title instructions">INSTRUCTIONS</p>
        <ol>
          ${this._generateInstructionsMarkup()}
        </ol>
      </div>
    </div>`;
    return html;
  }

  addHandlerLoadRecipe(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }
  _generateCategoryMarkup() {
    return `<ul class="recipe-category">
        <li class="category">
          Category: <span class="category-text">${this._data.category}</span>
        </li>
        <li class="category ${this._data.IBA ? "" : "hidden"}">
          IBA Class: <span class="category-text">${
            this._data.IBA ? this._data.IBA : ""
          }</span>
        </li>
        <li class="category">
          Alcoholic: <span class="category-text">${this._data.alcoholic}</span>
        </li>
        <li class="category">
          Glass to use:
          <span class="category-text">${this._data.glass}</span>
        </li>
      </ul>`;
  }
  _generateInstructionsMarkup() {
    return this._data.instructions
      .map(
        (instruction) =>
          `<li class="instruction-text">${instruction + "."}</li>`
      )
      .join("");
  }
  _generateIngredientsMarkup() {
    const ingredientLi = this._data.ingredients
      .map(
        (ing) => `
    <li class="ingredient">
      <i class="fa-solid fa-wine-glass"></i>
      ${ing[0]} <span class="quantity">${ing[1] || ""}</span>
    </li> `
      )
      .join("");
    return `
    <div class="ingredients-container">
      <ul class="ingredients">
        ${ingredientLi}
      </ul>
    </div>
    `;
  }
}

export default new RecipeView();
