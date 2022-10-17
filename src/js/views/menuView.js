import View from "./view.js";

class MenuView extends View {
  _container = document.querySelector(".side-menu");
  _overlay = document.querySelector(".overlay");
  _menuIcon = document.querySelector(".menu-icon");
  render() {}
  _generateMarkup() {}
  addHandlerClick() {
    this._menuIcon.addEventListener("click", this.show.bind(this));
    this._overlay.addEventListener("click", this.hide.bind(this));
  }

  show() {
    this._container.classList.add("active");
    this._overlay.classList.remove("hidden");
    this._menuIcon.classList.remove("active");
  }
  hide() {
    this._container.classList.remove("active");
    this._overlay.classList.add("hidden");
    this._menuIcon.classList.add("active");
  }
}

export default new MenuView();
