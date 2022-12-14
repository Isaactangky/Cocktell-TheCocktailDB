import View from "./view.js";
class RecipeView extends View {
  _container = document.querySelector(".recipe-container");
  _errorMessage = "Cannot load recipe.";

  _generateMarkups() {
    return `        
    <div class="recipe-header">
      <img
        src=${this._data.imgSrc}
        alt="${this._data.name} image"
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
        <div class="instructions">
          ${this._generateInstructionsMarkup()}
        </div>
        
      </div>
    </div>`;
  }

  addHandlerLoadRecipe(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }
  addHandlerAddBookmark(handler) {
    console.log("click");
    this._container.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-bookmark");
      if (!btn) return;
      handler();
    });
  }
  _generateCategoryMarkup() {
    return `<ul class="recipe-category">
         <i class="fa-${
           this._data.bookmarked ? "solid" : "regular"
         } fa-bookmark btn-bookmark"></i>
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
    return `<p class="instruction-text">${this._data.instructions}</p>`;
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
