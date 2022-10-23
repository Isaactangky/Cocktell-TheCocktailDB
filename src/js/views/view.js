export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) this.renderError();
    this._data = data;
    const markup = this._generateMarkups();

    this._clear();
    this._container.insertAdjacentHTML("beforeend", markup);
  }
  update(data) {
    this._data = data;
    const markup = this._generateMarkups();
    const newDOM = document.createRange().createContextualFragment(markup);
    const newElemets = Array.from(newDOM.querySelectorAll("*"));

    const curElements = Array.from(this._container.querySelectorAll("*"));
    curElements.forEach((curEle, i) => {
      const newEle = newElemets[i];
      // update value
      if (
        !newEle.isEqualNode(curEle) &&
        newEle.firstChild?.nodeValue?.trim() !== ""
      ) {
        curEle.textContent = newEle.textContent;
      }
      // update attrubutes
      if (!curEle.isEqualNode(newEle)) {
        Array.from(newEle.attributes).forEach((attr) => {
          curEle.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  show() {
    this._container.classList.remove("hidden");
  }
  hide() {
    this._container.classList.add("hidden");
  }
  _clear() {
    this._container.innerHTML = "";
  }
  renderError(error = null) {
    this._container.innerHTML = `<p class="error-message">${
      this._errorMessage
    }(${error ? error.message : ""})<p>`;
  }
}
