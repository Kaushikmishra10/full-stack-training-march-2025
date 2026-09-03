"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import styles from "@/styles/scss/theme/menu.module.css";
import MenuData from "@/data/MenuData";
import StarRating from "@/components/StarRating";
import TablePagination from "@/components/TablePagination";
import Link from "next/link";

const categoryMap = {
  1: "Main Course",
  2: "Dessert",
  3: "Drinks",
  5: "Pizza",
  6: "Burger",
  7: "Pasta",
  9: "Seafood",
};

const ITEMS_PER_PAGE = 10;

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(null); // three dots menu
  const [expandedRow, setExpandedRow] = useState(null); // mobile expand row
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
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
  }, [search, selectedCategory]);

  const categories = ["All", ...Object.values(categoryMap)];

  const filtered = MenuData.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.price.includes(search) ||
      categoryMap[item.categoryId]
        ?.toLowerCase()
        .includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "All" ||
      categoryMap[item.categoryId] === selectedCategory;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    const currentIds = paginatedItems.map((item) => item.id);
    const allSelected = currentIds.every((id) => selectedRows.includes(id));
    if (allSelected) {
      setSelectedRows((prev) => prev.filter((id) => !currentIds.includes(id)));
    } else {
      setSelectedRows((prev) => [...new Set([...prev, ...currentIds])]);
    }
  };

  const currentPageAllSelected =
    paginatedItems.length > 0 &&
    paginatedItems.every((item) => selectedRows.includes(item.id));

  // Breakpoints
  const isMd = windowWidth <= 992; // 992px niche: rating, reviews, status, dots → expand
  const isSm = windowWidth <= 756; // 756px niche: category, item id bhi expand mein

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className={styles.pageTitle}>Menu Items</h4>
        <span className={styles.breadcrumb}>Menu / Items</span>
      </div>

      {/* Toolbar */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div className={styles.searchBox + " d-flex align-items-center"}>
          <input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <button className={styles.searchBtn}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <Link href="/add-menu">
            <button className={styles.addBtn}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add New Item
            </button>
          </Link>

          <div
            className={styles.filterBox + " d-flex align-items-center gap-2"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.filterSelect}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table + " w-100"}>
          <thead>
            <tr className={styles.tableHead}>
              {/* Checkbox — always show */}
              <th className={styles.thCheck}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={currentPageAllSelected}
                  onChange={toggleAll}
                />
              </th>

              {/* Item ID — 756px niche hide */}
              <th className={`${styles.th} ${isSm ? styles.hiddenCol : ""}`}>
                Item ID
              </th>

              {/* Item Name — always show */}
              <th className={styles.th}>Item Name</th>

              {/* Category — 756px niche hide */}
              <th className={`${styles.th} ${isSm ? styles.hiddenCol : ""}`}>
                Category
              </th>

              {/* Price — always show */}
              <th className={styles.th}>Price</th>

              {/* Rating — 992px niche hide */}
              <th className={`${styles.th} ${isMd ? styles.hiddenCol : ""}`}>
                Rating
              </th>

              {/* Reviews — 992px niche hide */}
              <th className={`${styles.th} ${isMd ? styles.hiddenCol : ""}`}>
                Reviews
              </th>

              {/* Status — 992px niche hide */}
              <th className={`${styles.th} ${isMd ? styles.hiddenCol : ""}`}>
                Status
              </th>

              {/* Actions — always show */}
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => {
              const isSelected = selectedRows.includes(item.id);
              const isOpen = openDropdown === item.id;
              const isExpanded = expandedRow === item.id;

              return (
                <Fragment key={item.id}>
                  <tr
                    className={
                      styles.tableRow +
                      " " +
                      (isSelected ? styles.tableRowSelected : "")
                    }
                  >
                    {/* Checkbox */}
                    <td className={styles.tdCheck}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isSelected}
                        onChange={() => toggleRow(item.id)}
                      />
                    </td>

                    {/* Item ID — 756px niche hide */}
                    <td
                      className={`${styles.td} ${isSelected ? styles.tdBold : ""} ${isSm ? styles.hiddenCol : ""}`}
                    >
                      {item.id}
                    </td>

                    {/* Item Name */}
                    <td
                      className={
                        styles.td + " " + (isSelected ? styles.tdBold : "")
                      }
                    >
                      {item.name}
                    </td>

                    {/* Category — 756px niche hide */}
                    <td
                      className={`${styles.td} ${isSm ? styles.hiddenCol : ""}`}
                    >
                      <span className={styles.categoryBadge}>
                        {categoryMap[item.categoryId]}
                      </span>
                    </td>

                    {/* Price */}
                    <td
                      className={
                        styles.td + " " + (isSelected ? styles.tdBold : "")
                      }
                    >
                      {item.price}
                    </td>

                    {/* Rating — 992px niche hide */}
                    <td
                      className={`${styles.td} ${isMd ? styles.hiddenCol : ""}`}
                    >
                      <StarRating rating={item.rating} />
                    </td>

                    {/* Reviews — 992px niche hide */}
                    <td
                      className={`${styles.td} ${isMd ? styles.hiddenCol : ""}`}
                    >
                      <span className={styles.reviewBadge}>{item.reviews}</span>
                    </td>

                    {/* Status — 992px niche hide */}
                    <td
                      className={`${styles.td} ${isMd ? styles.hiddenCol : ""}`}
                    >
                      <span
                        className={
                          styles.statusBadge +
                          " " +
                          (item.status === "ACTIVE"
                            ? styles.statusActive
                            : styles.statusInactive)
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Actions — three dots + expand button */}
                    <td
                      className={styles.td + " " + styles.actionCell}
                      ref={isOpen ? dropdownRef : null}
                    >
                      <div className="d-flex align-items-center gap-1">
                        {/* Expand button — sirf tab dikhe jab kuch columns hide hon */}
                        {isMd && (
                          <button
                            className={`${styles.expandBtn} ${isExpanded ? styles.expandBtnActive : ""}`}
                            onClick={() =>
                              setExpandedRow(isExpanded ? null : item.id)
                            }
                            title="Show more"
                          >
                            {isExpanded ? "▲" : "▼"}
                          </button>
                        )}

                        {/* Three dots */}
                        <button
                          className={
                            styles.dotBtn +
                            " " +
                            (isOpen ? styles.dotBtnActive : "")
                          }
                          onClick={() =>
                            setOpenDropdown(isOpen ? null : item.id)
                          }
                        >
                          ···
                        </button>
                      </div>

                      {/* Dropdown menu */}
                      {isOpen && (
                        <div className={styles.dropdown}>
                          <button className={styles.dropdownItem}>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            className={
                              styles.dropdownItem +
                              " " +
                              styles.dropdownItemDelete
                            }
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
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

                  {/* ── Expanded Row — hidden columns ka data ── */}
                  {isMd && isExpanded && (
                    <tr className={styles.expandedRow}>
                      <td
                        colSpan={isSm ? 4 : 6}
                        className={styles.expandedCell}
                      >
                        <div className={styles.expandedGrid}>
                          {/* Item ID — sirf 756px niche */}
                          {isSm && (
                            <div className={styles.expandedItem}>
                              <span className={styles.expandedLabel}>
                                Item ID
                              </span>
                              <span className={styles.expandedValue}>
                                {item.id}
                              </span>
                            </div>
                          )}

                          {/* Category — sirf 756px niche */}
                          {isSm && (
                            <div className={styles.expandedItem}>
                              <span className={styles.expandedLabel}>
                                Category
                              </span>
                              <span className={styles.categoryBadge}>
                                {categoryMap[item.categoryId]}
                              </span>
                            </div>
                          )}

                          {/* Rating — 992px niche */}
                          <div className={styles.expandedItem}>
                            <span className={styles.expandedLabel}>Rating</span>
                            <StarRating rating={item.rating} />
                          </div>

                          {/* Reviews — 992px niche */}
                          <div className={styles.expandedItem}>
                            <span className={styles.expandedLabel}>
                              Reviews
                            </span>
                            <span className={styles.reviewBadge}>
                              {item.reviews}
                            </span>
                          </div>

                          {/* Status — 992px niche */}
                          <div className={styles.expandedItem}>
                            <span className={styles.expandedLabel}>Status</span>
                            <span
                              className={
                                styles.statusBadge +
                                " " +
                                (item.status === "ACTIVE"
                                  ? styles.statusActive
                                  : styles.statusInactive)
                              }
                            >
                              {item.status}
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
          <div
            className={
              styles.emptyState +
              " d-flex justify-content-center align-items-center"
            }
          >
            <p>No items found</p>
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
          label="items"
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
