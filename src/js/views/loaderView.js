import View from "./view.js";

class LoaderView extends View {
  _container = document.querySelector(".loader");
  generateMarkup() {}
}

export default new LoaderView();
