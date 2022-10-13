import View from "./view.js";

class SearchMessageView extends View {
  _container = document.querySelector(".search-title-container");
  _errorMessage = "Cannot find recipes.";

  _generateMarkups() {
    return `
    <p class="search-title">
      Results for: <span class="search-query">${this._data}</span>
    </p>`;
  }
}

export default new SearchMessageView();
