import View from "./view.js";

class MenuView extends View {
  _container = document.querySelector(".search-results");
  render() {}
  _generateMarkup() {}
  addHandlerClick() {
    const bar = document.querySelector(".menu-bar");
    console.log(bar);
    bar.addEventListener("click", () => {
      this._container.classList.add("active");
      document.querySelector(".overlay").classList.remove("hidden");
    });
  }
  hide() {
    this._container.classList.remove("active");
    document.querySelector(".overlay").classList.add("hidden");
  }
}

export default new MenuView();
