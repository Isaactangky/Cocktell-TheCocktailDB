class RandomView {
  _container = document.querySelector(".other-functions");
  // _errorMessage = "Cannot find recipes.";

  addHandlerRandomCocktail(handler) {
    this._container
      .querySelector(".random-cocktail-btn")
      .addEventListener("click", (e) => {
        // e.preventDefault();
        handler();
      });
  }
}

export default new RandomView();
