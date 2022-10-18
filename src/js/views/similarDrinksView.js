import View from "./view.js";
class SimilarDrink extends View {
  _container = document.querySelector("div.similar-drinks-container");
  _errorMessage = "Cannot load similar drink recipes.";

  _generateMarkups() {
    return `
      <p class="similar-drink-title">Similar Drinks:</p>
      <ul class="similar-drinks-list">
        ${this._data
          .map((recipe) => this._generateDrinkMarkup(recipe))
          .join("")}
      </ul>`;
  }

  _generateDrinkMarkup(recipe) {
    return `        
      <li class="preview-similar-drink" data-id=${recipe.id}>
        <a class="preview-link-similar-drink" href="#${recipe.id}">
          <img
            src="${recipe.imgSrc}"
            alt="${recipe.name.replaceAll(" ", "-")}-icon"
            class="similar-cocktail-icon"
          />
          <p class="preview-title-similar-drink">${recipe.name}</p>
        </a>
      </li>`;
  }
}

export default new SimilarDrink();
