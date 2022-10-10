class SearchView {
  _container = document.querySelector(".search-form");

  getQuery() {
    const query = this._container.querySelector(".search-input").value;
    this._clearSearchField();
    return query;
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
