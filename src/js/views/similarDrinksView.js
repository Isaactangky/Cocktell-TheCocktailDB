import View from "./view.js";
class SimilarDrink extends View {
  _container = document.querySelector(".similar-drinks-container");
  _errorMessage = "Cannot load similar drink recipes.";

  _generateMarkups() {
    this._container = document.querySelector(".similar-drinks-container");
    return this._data
      .map((recipe) => {
        // console.log(recipe);
        return this._generateDrinkMarkup(recipe);
      })
      .join("");
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
