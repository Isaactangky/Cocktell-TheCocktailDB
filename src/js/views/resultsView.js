import View from "./view.js";
import PreviewView from "./previewView.js";
class ResultView extends View {
  _container = document.querySelector(".preview-container");
  _errorMessage = "Cannot find recipes.";
  _generateMarkups() {
    return this._data
      .map((result) => this._generatePreviewMarkup(result))
      .join("");
  }
  _generatePreviewMarkup(data) {
    console.log("1");
    const id = window.location.hash.slice(1);
    console.log("data", data);
    console.log(id);
    return `
      <li class="preview" data-id=${data.id}>
        <a class="preview-link ${
          Number(data.id) === Number(id) ? "preview-active" : ""
        }" href="#${data.id}">
          <img
            src="${data.imgSrc}"
            alt="${data.name.replaceAll(" ", "-")}-icon"
            class="cocktail-icon"
          />
          <p class="preview-title">${data.name}</p>
        </a>
      </li>
    `;
  }
}

export default new ResultView();
