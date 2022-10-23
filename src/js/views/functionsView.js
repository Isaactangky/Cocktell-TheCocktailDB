class FunctionsView {
  _container = document.querySelector(".other-functions");
  // _errorMessage = "Cannot find recipes.";

  addHandlerRandomCocktail(handler) {
    this._container
      .querySelector(".random-cocktail-btn")
      .addEventListener("click", (e) => {
        handler();
      });
  }
}

export default new FunctionsView();
