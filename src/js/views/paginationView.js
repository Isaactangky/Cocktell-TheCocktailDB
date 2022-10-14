import View from "./view.js";
import PreviewView from "./previewView.js";
class PaginationView extends View {
  _container = document.querySelector(".pagination");
  _errorMessage = "Fail rendering pagination.";
  addHandlerPagination(handler) {
    this._container.addEventListener("click", (e) => {
      const btn = e.target.closest(".pagination-btn");
      if (!btn) return;
      const newPage = +btn.dataset.goto;
      console.log("new page", newPage);
      handler(newPage);
    });
  }
  _generateMarkups() {
    const curPage = this._data.page;
    // const maxPage = Math.ceil(
    //   this._data.results.length / this._data.recipesPerPage
    // );
    const pageNum = `<div class="page-num">${curPage}-${this._data.numPages}</div>`;
    const prevPageBtn = `
      <button data-goto="${
        curPage - 1
      }" class="pagination-btn pagination-btn-prev btn-light">
        <i class="fa-solid fa-caret-left"></i>
        <span>Page ${curPage - 1}</span>
      </button>
    `;
    const nextPageBtn = `
      <button data-goto="${
        curPage + 1
      }" class="pagination-btn pagination-btn-next btn-light">
        <span>Page ${curPage + 1}</span>
        <i class="fa-solid fa-caret-right"></i>
      </button>
    `;
    if (curPage === 1 && this._data.numPages > 1) {
      return `${pageNum}${nextPageBtn}`;
    }
    if (curPage === this._data.numPages && this._data.numPages > 1) {
      return `${prevPageBtn}${pageNum}`;
    }
    if (curPage < this._data.numPages) {
      return `${prevPageBtn}${pageNum}${nextPageBtn}`;
    }
    return "";
  }
}

export default new PaginationView();
