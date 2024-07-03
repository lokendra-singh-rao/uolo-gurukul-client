import React from "react";
import generatePaginationData from "../utils/generatePaginationData";

function Pagination({ currentPage, totalPage, onPageChange }) {
  const paginationData = generatePaginationData(currentPage, totalPage);

  return (
    <div className="pagination">
      {totalPage > 0 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={paginationData.hasPrevious ? false : true}
        >
          {"<"}
        </button>
      )}

      {paginationData.pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      {totalPage > 0 && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={paginationData.hasNext ? false : true}
        >
          {">"}
        </button>
      )}
    </div>
  );
}

export default Pagination;
