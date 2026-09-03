"use client";
import { useState, useRef, useEffect } from "react";
import CustomersData from "@/data/CustomersData";
import TablePagination from "@/components/TablePagination";
import styles from "@/styles/scss/theme/customer.module.css";

const ITEMS_PER_PAGE = 10;

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [viewCustomer, setViewCustomer] = useState(null); // ✅ View Details modal
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = CustomersData.filter(
    (c) =>
      c.customerName.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const toggleRow = (id) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setOpenDropdown(null);
  };

  return (
    <div className={styles.page}>

      {/* ✅ View Details Modal */}
      {viewCustomer && (
        <div
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setViewCustomer(null)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "28px 24px",
              width: "100%",
              maxWidth: "420px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setViewCustomer(null)}
              style={{
                position: "absolute", top: "14px", right: "16px",
                background: "none", border: "none",
                fontSize: "20px", cursor: "pointer", color: "#aaa",
                lineHeight: 1,
              }}
            >✕</button>

            {/* Title */}
            <h5 style={{ fontWeight: 700, marginBottom: "20px", fontSize: "17px", color: "#1a1a1a" }}>
              Customer Details
            </h5>

            {/* Detail Rows */}
            {[
              { label: "Customer ID", value: viewCustomer.id },
              { label: "Customer Name", value: viewCustomer.customerName },
              { label: "Join Date", value: viewCustomer.joinDate },
              { label: "Location", value: viewCustomer.location },
              { label: "Total Spent", value: viewCustomer.totalSpent },
              { label: "Last Order", value: viewCustomer.lastOrder },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #f3f3f3",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "13px", color: "#999", fontWeight: 600, minWidth: "110px" }}>
                  {label}
                </span>
                <span style={{ fontSize: "13px", color: "#222", fontWeight: 500, textAlign: "right" }}>
                  {value}
                </span>
              </div>
            ))}

            {/* Close Button */}
            <button
              onClick={() => setViewCustomer(null)}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "10px",
                background: "#ff6b35",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={styles.header}>
        <h4 className={styles.heading}>Customers</h4>
        <span className={styles.breadcrumb}>Customer / Customer</span>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </div>

        <button className={styles.addBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="7" r="4" />
            <path d="M3 21c0-4 3-7 6-7s6 3 6 7" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="16" y1="11" x2="22" y2="11" />
          </svg>
          Add New Customer
        </button>

        <div className={styles.filterBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span>Filter</span>
          <span>▾</span>
        </div>

        <button className={styles.refreshBtn}>↻</button>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.theadRow}>
              <th className={styles.th}></th>
              <th className={styles.th}>Customer ID</th>
              <th className={`${styles.th} ${styles.colJoinDate}`}>Join Date</th>
              <th className={styles.th}>Customer Name</th>
              <th className={`${styles.th} ${styles.colLocation}`}>Location</th>
              <th className={`${styles.th} ${styles.colTotalSpent}`}>Total Spent</th>
              <th className={`${styles.th} ${styles.colLastOrder}`}>Last Order</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((customer) => {
                const selected = selectedRows.includes(customer.id);
                return (
                  <tr
                    key={customer.id}
                    className={`${styles.tr} ${selected ? styles.trSelected : ""}`}
                  >
                    <td className={styles.td}>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleRow(customer.id)}
                        style={{ accentColor: "#ff6b35", cursor: "pointer" }}
                      />
                    </td>
                    <td className={selected ? styles.tdBold : styles.td}>{customer.id}</td>
                    <td className={`${selected ? styles.tdBold : styles.td} ${styles.colJoinDate}`}>
                      {customer.joinDate}
                    </td>
                    <td className={selected ? styles.tdBold : styles.td}>{customer.customerName}</td>
                    <td className={`${selected ? styles.tdBold : styles.td} ${styles.colLocation}`}>
                      {customer.location}
                    </td>
                    <td className={`${selected ? styles.tdBold : styles.td} ${styles.colTotalSpent}`}>
                      {customer.totalSpent}
                    </td>
                    <td className={`${styles.td} ${styles.colLastOrder}`}>
                      <span className={selected ? styles.lastOrderBadgeSelected : styles.lastOrderBadge}>
                        {customer.lastOrder}
                      </span>
                    </td>

                    {/* Three dots dropdown */}
                    <td
                      className={styles.td}
                      style={{ position: "relative" }}
                      ref={openDropdown === customer.id ? dropdownRef : null}
                    >
                      <button
                        className={styles.dotBtn}
                        onClick={() =>
                          setOpenDropdown(openDropdown === customer.id ? null : customer.id)
                        }
                      >
                        ···
                      </button>

                      {openDropdown === customer.id && (
                        <div className={styles.dropdown}>

                          {/* ✅ View Details — sabhi screens pe */}
                          <button
                            className={styles.dropdownItem}
                            onClick={() => {
                              setViewCustomer(customer);
                              setOpenDropdown(null);
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            View Details
                          </button>

                          <hr className={styles.dropdownDivider} />

                          {/* Edit */}
                          <button
                            className={styles.dropdownItem}
                            onClick={() => {
                              alert(`Edit: ${customer.customerName}`);
                              setOpenDropdown(null);
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit
                          </button>

                          {/* Delete */}
                          <button
                            className={styles.dropdownItemDelete}
                            onClick={() => {
                              alert(`Delete: ${customer.customerName}`);
                              setOpenDropdown(null);
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className={styles.noData}>
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={filtered.length}
        label="customers"
        onPageChange={handlePageChange}
      />
    </div>
  );
}