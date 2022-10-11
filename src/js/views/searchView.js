class SearchView {
  _container = document.querySelector(".search-form");

  getQuery() {
    const query = this._container.querySelector(".search-input").value;
    this._clearSearchField();
    return query;
  }
  getSearchOption() {
    const type = this._container.querySelector(
      'input[name="search-option"]:checked'
    ).value;
    return type;
  }
  _clearSearchField() {
    this._container.querySelector(".search-input").value = "";
  }
  addHandlerSearchFrom(handler) {
    this._container.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
