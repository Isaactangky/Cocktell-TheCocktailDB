import PreviewView from "./previewView.js";
class ResultView extends PreviewView {
  _container = document.querySelector(".preview-container-search-results");
  _errorMessage = "";

  renderError() {
    this._clear();
  }
}

export default new ResultView();
