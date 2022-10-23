import View from "./view.js";

class PreviewView extends View {
  _container = "";
  _generateMarkups() {
    console.log(this._data);
    return this._data
      .map((result) => this._generatePreviewMarkup(result))
      .join("");
  }
  _generatePreviewMarkup(data) {
    const id = window.location.hash.slice(1);
    return `
      <li class="preview" data-id=${data.id}>
        <a class="preview-link btn-light ${
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

export default PreviewView;
