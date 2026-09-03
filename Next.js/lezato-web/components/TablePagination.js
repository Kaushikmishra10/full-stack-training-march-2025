import { Pagination } from "react-bootstrap";
import styles from "@/styles/scss/theme/TablePagination.module.css";

function TablePagination({
  currentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  totalItems,
  label = "items",
  onPageChange,
}) {
  return (
    <div className={`${styles.footer} d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2`}>
      <span className={styles.footerText}>
        Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, totalItems)} from {totalItems} {label}
      </span>
      <Pagination size="sm" className={`${styles.pagination} mb-0`}>
        <Pagination.First
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Pagination.Item
            key={page}
            active={currentPage === page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
}

export default TablePagination;