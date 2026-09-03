"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import CategoriesData from "@/data/CategoriesData";
import TablePagination from "@/components/TablePagination";
import styles from "@/styles/scss/theme/categories.module.css";

const ITEMS_PER_PAGE = 10;

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const dropdownRef = useRef(null);

  // Window width track karo
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Outside click → close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterStatus]);

  // 768px niche collapse
  const isSm = windowWidth <= 768;

  const filtered = CategoriesData.filter((cat) => {
    const matchSearch =
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      String(cat.totalItems).includes(search);
    const matchStatus =
      filterStatus === "All" || cat.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    const currentIds = paginatedItems.map((cat) => cat.id);
    const allSelected = currentIds.every((id) => selectedRows.includes(id));
    if (allSelected) {
      setSelectedRows((prev) => prev.filter((id) => !currentIds.includes(id)));
    } else {
      setSelectedRows((prev) => [...new Set([...prev, ...currentIds])]);
    }
  };

  const currentPageAllSelected =
    paginatedItems.length > 0 &&
    paginatedItems.every((cat) => selectedRows.includes(cat.id));

  return (
    <div className={styles.pageWrapper}>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className={styles.pageTitle}>Categories</h4>
        <span className={styles.breadcrumb}>Menu / Categories</span>
      </div>

      {/* Toolbar */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div className={`${styles.searchBox} d-flex align-items-center`}>
          <input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <button className={styles.searchBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button className={styles.addBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add New Category
          </button>

          <div className={`${styles.filterBox} d-flex align-items-center gap-2`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="All">All</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={`${styles.table} w-100`}>
          <thead>
            <tr className={styles.tableHead}>

              {/* Checkbox — always */}
              <th className={styles.thCheck}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={currentPageAllSelected}
                  onChange={toggleAll}
                />
              </th>

              {/* Category ID — always */}
              <th className={styles.th}>Category ID</th>

              {/* Category Name — always */}
              <th className={styles.th}>Category Name</th>

              {/* Total Items — 768px niche hide */}
              <th className={`${styles.th} ${isSm ? styles.hiddenCol : ""}`}>
                Total Items
              </th>

              {/* Status — 768px niche hide */}
              <th className={`${styles.th} ${isSm ? styles.hiddenCol : ""}`}>
                Status
              </th>

              {/* Actions — always */}
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((cat) => {
              const isSelected = selectedRows.includes(cat.id);
              const isOpen = openDropdown === cat.id;
              const isExpanded = expandedRow === cat.id;

              return (
                <Fragment key={cat.id}>

                  {/* ── Main Row ── */}
                  <tr className={`${styles.tableRow} ${isSelected ? styles.tableRowSelected : ""}`}>

                    {/* Checkbox */}
                    <td className={styles.tdCheck}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isSelected}
                        onChange={() => toggleRow(cat.id)}
                      />
                    </td>

                    {/* Category ID */}
                    <td className={`${styles.td} ${isSelected ? styles.tdBold : ""}`}>
                      {cat.id}
                    </td>

                    {/* Category Name */}
                    <td className={`${styles.td} ${isSelected ? styles.tdBold : ""}`}>
                      {cat.name}
                    </td>

                    {/* Total Items — 768px niche hide */}
                    <td className={`${styles.td} ${isSm ? styles.hiddenCol : ""}`}>
                      <span className={styles.itemsBadge}>{cat.totalItems} Items</span>
                    </td>

                    {/* Status — 768px niche hide */}
                    <td className={`${styles.td} ${isSm ? styles.hiddenCol : ""}`}>
                      <span className={`${styles.statusBadge} ${cat.status === "ACTIVE" ? styles.statusActive : styles.statusInactive}`}>
                        {cat.status}
                      </span>
                    </td>

                    {/* Actions — expand + three dots */}
                    <td
                      className={`${styles.td} ${styles.actionCell}`}
                      ref={isOpen ? dropdownRef : null}
                    >
                      <div className="d-flex align-items-center gap-1">

                        {/* Expand button — sirf 768px niche */}
                        {isSm && (
                          <button
                            className={`${styles.expandBtn} ${isExpanded ? styles.expandBtnActive : ""}`}
                            onClick={() => setExpandedRow(isExpanded ? null : cat.id)}
                            title="Show more"
                          >
                            {isExpanded ? "▲" : "▼"}
                          </button>
                        )}

                        {/* Three dots */}
                        <button
                          className={`${styles.dotBtn} ${isOpen ? styles.dotBtnActive : ""}`}
                          onClick={() => setOpenDropdown(isOpen ? null : cat.id)}
                        >
                          ···
                        </button>
                      </div>

                      {/* Dropdown */}
                      {isOpen && (
                        <div className={styles.dropdown}>
                          <button className={styles.dropdownItem}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit
                          </button>
                          <button className={`${styles.dropdownItem} ${styles.dropdownItemDelete}`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>

                  {/* ── Expanded Row — 768px niche ── */}
                  {isSm && isExpanded && (
                    <tr className={styles.expandedRow}>
                      <td colSpan={4} className={styles.expandedCell}>
                        <div className={styles.expandedGrid}>

                          {/* Total Items */}
                          <div className={styles.expandedItem}>
                            <span className={styles.expandedLabel}>Total Items</span>
                            <span className={styles.itemsBadge}>{cat.totalItems} Items</span>
                          </div>

                          {/* Status */}
                          <div className={styles.expandedItem}>
                            <span className={styles.expandedLabel}>Status</span>
                            <span className={`${styles.statusBadge} ${cat.status === "ACTIVE" ? styles.statusActive : styles.statusInactive}`}>
                              {cat.status}
                            </span>
                          </div>

                        </div>
                      </td>
                    </tr>
                  )}

                </Fragment>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className={`${styles.emptyState} d-flex justify-content-center align-items-center`}>
            <p>No categories found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={filtered.length}
          label="categories"
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}