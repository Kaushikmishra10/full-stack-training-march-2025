"use client";
import { useState } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import ReviewsData from "@/data/ReviewsData";
import CustomersData from "@/data/CustomersData";
import styles from "@/styles/scss/theme/review.module.css";

/* ── Stars renderer ─────────────────────────────────────────────── */
const renderStars = (rating) =>
  Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={i < Math.round(rating) ? styles.starFilled : styles.starEmpty}
    >
      ★
    </span>
  ));

const ITEMS_PER_PAGE = 5;

export default function ReviewPage() {
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  /* ── Merge customerName from CustomersData ── */
  const combined = ReviewsData.map((r) => ({
    ...r,
    customerName:
      CustomersData.find((c) => c.id === r.customerId)?.customerName ||
      `Customer #${r.customerId}`,
  }));

  /* ── Filter ── */
  const filtered = combined.filter(
    (r) =>
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.review.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const goTo = (page) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  /* ── Row selection ── */
  const toggleRow = (id) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );

  const toggleAll = () => {
    const pageIds = paginated.map((r) => r.id);
    const allSel = pageIds.every((id) => selectedRows.includes(id));
    setSelectedRows((prev) =>
      allSel
        ? prev.filter((id) => !pageIds.includes(id))
        : [...new Set([...prev, ...pageIds])],
    );
  };

  const allPageSelected =
    paginated.length > 0 && paginated.every((r) => selectedRows.includes(r.id));

  /* ── Actions ── */
  const handlePublish = () => {
    alert(`Published ${selectedRows.length} review(s)`);
    setSelectedRows([]);
  };
  const handleDelete = () => {
    alert(`Deleted ${selectedRows.length} review(s)`);
    setSelectedRows([]);
  };
  const handleRefresh = () => {
    setSearch("");
    setCurrentPage(1);
    setSelectedRows([]);
  };

  /* ── Smart page numbers — max 5 visible ── */
  const pageNumbers = () => {
    const half = 2;
    let start = Math.max(1, safePage - half);
    let end = Math.min(totalPages, safePage + half);
    if (safePage <= half) end = Math.min(totalPages, 5);
    if (safePage > totalPages - half) start = Math.max(1, totalPages - 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className={styles.page}>
      <Container fluid className="px-0">

        {/* ══════ HEADER ══════ */}
        <Row className="align-items-center mb-4">
          <Col>
            <h4 className={styles.heading}>Review</h4>
          </Col>
          <Col xs="auto">
            <span className={styles.breadcrumb}>
              <span className={styles.breadcrumbLink}>Customer</span> / Review
            </span>
          </Col>
        </Row>

        {/* ══════ TOOLBAR ══════ */}
        <Row className="align-items-center mb-4 g-2">
          {/* Search */}
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search here"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className={styles.searchInput}
              />
              <span className={styles.searchIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </div>
          </Col>

          {/* Right-side buttons */}
          <Col xs={12} sm={6} md={8} lg={9}>
            <Row className="align-items-center justify-content-sm-end g-2 flex-wrap">
              <Col xs="auto">
                <button className={styles.publishBtn} onClick={handlePublish} disabled={selectedRows.length === 0}>
                  <span className={styles.iconCircleGreen}>✓</span>
                  <span className={styles.btnLabel}>PUBLISH</span>
                </button>
              </Col>
              <Col xs="auto">
                <button className={styles.deleteBtn} onClick={handleDelete} disabled={selectedRows.length === 0}>
                  <span className={styles.iconCircleRed}>✕</span>
                  <span className={styles.btnLabel}>DELETE</span>
                </button>
              </Col>
              <Col xs="auto">
                <div className={styles.filterBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  <span>Filter</span>
                  <span>▾</span>
                </div>
              </Col>
              <Col xs="auto">
                <button className={styles.refreshBtn} onClick={handleRefresh} title="Reset">↻</button>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* ══════ LIST CARD ══════ */}
        <Row>
          <Col xs={12}>
            <div className={styles.listCard}>

              {/* Select-all header */}
              <div className={styles.selectAllRow}>
                <input
                  type="checkbox"
                  checked={allPageSelected}
                  onChange={toggleAll}
                  className={styles.checkbox}
                  title="Select all on this page"
                />
                <span className={styles.selectAllLabel}>
                  {selectedRows.length > 0 ? `${selectedRows.length} selected` : "Select all"}
                </span>
              </div>

              {/* Empty state */}
              {paginated.length === 0 ? (
                <div className={styles.emptyState}>No reviews found.</div>
              ) : (
                paginated.map((review) => {
                  const selected = selectedRows.includes(review.id);
                  return (
                    <div
                      key={review.id}
                      className={`${styles.reviewRow} ${selected ? styles.reviewRowSelected : ""}`}
                    >
                      <Row className="align-items-center w-100 g-0">

                        {/* Checkbox + Avatar Image */}
                        <Col xs="auto" className="d-flex align-items-center gap-3 pe-3">
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleRow(review.id)}
                            className={styles.checkbox}
                          />
                          <img
                            src={review.avatar}
                            alt={review.customerName}
                            className={styles.avatar}
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          {/* Fallback div agar image load na ho */}
                          <div className={styles.avatarFallback} style={{ display: "none" }}>
                            {review.customerName?.charAt(0) || "?"}
                          </div>
                        </Col>

                        {/* Customer name + date */}
                        <Col xs={12} sm={3} md={2} className="pe-2 mt-2 mt-sm-0">
                          <div className={styles.customerId}>#{review.id}</div>
                          <div className={styles.customerIdLabel}>{review.customerName}</div>
                          <div className={styles.date}>{review.date}</div>
                        </Col>

                        {/* Review text */}
                        <Col xs={12} sm={true} className="pe-2 mt-2 mt-sm-0">
                          <div className={styles.reviewText}>{review.review}</div>
                        </Col>

                        {/* Rating */}
                        <Col xs="auto" className="text-center px-3 mt-2 mt-sm-0">
                          <div className={styles.ratingNumber}>{review.rating.toFixed(1)}</div>
                          <div className={styles.starsRow}>{renderStars(review.rating)}</div>
                        </Col>

                        {/* Accept / Reject */}
                        <Col xs="auto" className="mt-2 mt-sm-0">
                          <div className={styles.actions}>
                            <button className={styles.acceptBtn} title="Accept">✓</button>
                            <button className={styles.rejectBtn} title="Reject">✕</button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  );
                })
              )}
            </div>
          </Col>
        </Row>

        {/* ══════ FOOTER + PAGINATION ══════ */}
        <Row className="align-items-center mt-3 g-2">
          <Col xs={12} sm="auto">
            <span className={styles.footerText}>
              Showing{" "}
              {filtered.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} from{" "}
              {filtered.length} data
            </span>
          </Col>
          <Col xs={12} sm="auto" className="ms-sm-auto">
            <Pagination size="sm" className="mb-0 flex-wrap">
              <Pagination.First onClick={() => goTo(1)} disabled={safePage === 1} />
              <Pagination.Prev onClick={() => goTo(safePage - 1)} disabled={safePage === 1} />
              {pageNumbers()[0] > 1 && <Pagination.Ellipsis disabled />}
              {pageNumbers().map((page) => (
                <Pagination.Item key={page} active={safePage === page} onClick={() => goTo(page)}>
                  {page}
                </Pagination.Item>
              ))}
              {pageNumbers()[pageNumbers().length - 1] < totalPages && (
                <Pagination.Ellipsis disabled />
              )}
              <Pagination.Next onClick={() => goTo(safePage + 1)} disabled={safePage === totalPages} />
              <Pagination.Last onClick={() => goTo(totalPages)} disabled={safePage === totalPages} />
            </Pagination>
          </Col>
        </Row>

      </Container>
    </div>
  );
}