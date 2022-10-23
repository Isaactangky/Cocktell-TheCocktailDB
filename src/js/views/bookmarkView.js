import PreviewView from "./previewView.js";
class BookmarkView extends PreviewView {
  _container = document.querySelector(".preview-container-bookmarks");
  _errorMessage = "";

  addHandlerBookmark(handler) {
    window.addEventListener("load", handler);
  }
  renderError() {
    this._clear();
  }
}

export default new BookmarkView();
