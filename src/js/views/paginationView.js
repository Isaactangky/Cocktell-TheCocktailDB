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
    const maxPage = Math.ceil(
      this._data.results.length / this._data.recipesPerPage
    );
    const prevPageBtn = `
      <button data-goto="${
        curPage - 1
      }" class="pagination-btn pagination-btn-prev">
        <i class="fa-solid fa-caret-left"></i>
        <span>Page ${curPage - 1}</span>
      </button>
    `;
    const nextPageBtn = `
      <button data-goto="${
        curPage + 1
      }" class="pagination-btn pagination-btn-next">
        <span>Page ${curPage + 1}</span>
        <i class="fa-solid fa-caret-right"></i>
      </button>
    `;
    if (curPage === 1 && maxPage > 1) {
      return nextPageBtn;
    }
    if (curPage === maxPage && maxPage > 1) {
      return prevPageBtn;
    }
    if (curPage < maxPage) {
      return `${prevPageBtn}${nextPageBtn}`;
    }
    return "";
  }
}

export default new PaginationView();
