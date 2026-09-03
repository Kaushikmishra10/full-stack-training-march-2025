"use client";

import { useState, useRef, useEffect } from "react";
import styles from "@/styles/scss/theme/order.module.css";
import OrdersData from "@/data/OrdersData";
import OrderDetailPage from "../order-details/page";

const ITEMS_PER_PAGE = 10;

const SearchIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const FilterIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const SortIcon = () => <span className={styles.sortIcon}></span>;
const DotsIcon = () => <span style={{ letterSpacing: "1px", fontSize: "16px" }}>•••</span>;

const AcceptIcon = () => (
  <svg width="16" height="16" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const RejectIcon = () => (
  <svg width="16" height="16" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6M9 9l6 6" />
  </svg>
);

const DetailsIcon = () => (
  <svg width="16" height="16" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

function StatusBadge({ status }) {
  const cls =
    status === "DELIVERED"
      ? styles.statusDelivered
      : status === "CANCELED"
        ? styles.statusCanceled
        : styles.statusPending;
  return <span className={`${styles.statusBadge} ${cls}`}>{status}</span>;
}

function ActionDropdown({ order, onClose, onAction, onDetails, onViewInfo }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [onClose]);

  return (
    <div className={styles.dropdownMenu} ref={ref}>

      {/* ✅ View Info — hidden columns dikhane ke liye */}
      <button
        className={`${styles.dropdownItem} ${styles.viewDetailsItem}`}
        onClick={() => { onViewInfo(order); onClose(); }}
      >
        <EyeIcon /> View Info
      </button>

      <hr className={styles.dropdownDivider} />

      {/* 1200px se niche: Location, Amount, Status */}
      <div className={styles.showBelow1200}>
        <div className={styles.dropdownInfo}>
          <span className={styles.dropdownInfoLabel}>Location</span>
          <span className={styles.dropdownInfoValue}>{order.location}</span>
        </div>
      </div>
      <div className={styles.showBelow1200}>
        <div className={styles.dropdownInfo}>
          <span className={styles.dropdownInfoLabel}>Amount</span>
          <span className={styles.dropdownInfoValue}>{order.amount}</span>
        </div>
      </div>
      <div className={styles.showBelow1200}>
        <div className={styles.dropdownInfo}>
          <span className={styles.dropdownInfoLabel}>Status</span>
          <span className={styles.dropdownInfoValue}>{order.status}</span>
        </div>
      </div>

      {/* 768px se niche: Date bhi */}
      <div className={styles.showBelow768}>
        <div className={styles.dropdownInfo}>
          <span className={styles.dropdownInfoLabel}>Date</span>
          <span className={styles.dropdownInfoValue}>{order.date}</span>
        </div>
      </div>

      <hr className={styles.dropdownDivider} />

      <button
        className={`${styles.dropdownItem} ${styles.acceptItem}`}
        onClick={() => { onAction(order.id, "DELIVERED"); onClose(); }}
      >
        <AcceptIcon /> Accept Order
      </button>
      <button
        className={`${styles.dropdownItem} ${styles.rejectItem}`}
        onClick={() => { onAction(order.id, "CANCELED"); onClose(); }}
      >
        <RejectIcon /> Reject Order
      </button>
      <button
        className={`${styles.dropdownItem} ${styles.detailsItem}`}
        onClick={() => { onDetails(order.id); onClose(); }}
      >
        <DetailsIcon /> Order Details
      </button>
    </div>
  );
}

export default function OrderPage() {
  const [orders, setOrders] = useState(OrdersData);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDetailId, setSelectedDetailId] = useState(null);
  const [viewOrder, setViewOrder] = useState(null); // ✅ Modal state

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      String(o.id).toLowerCase().includes(q) ||
      String(o.customerId).includes(q) ||
      o.location.toLowerCase().includes(q) ||
      o.status.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleSearch = (val) => { setSearch(val); setCurrentPage(1); };

  const toggleRow = (id) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );

  const toggleAll = () => {
    const pageIds = paginated.map((o) => o.id);
    const allSelected = pageIds.every((id) => selectedRows.includes(id));
    if (allSelected) {
      setSelectedRows((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedRows((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  const handleAction = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
  };

  const goTo = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const pageIds = paginated.map((o) => o.id);
  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedRows.includes(id));

  if (selectedDetailId !== null) {
    return (
      <OrderDetailPage
        orderId={selectedDetailId}
        onBack={() => setSelectedDetailId(null)}
      />
    );
  }

  return (
    <div className={styles.pageWrapper}>

      {/* ✅ View Info Modal */}
      {viewOrder && (
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
          onClick={() => setViewOrder(null)}
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
            {/* Close X */}
            <button
              onClick={() => setViewOrder(null)}
              style={{
                position: "absolute", top: "14px", right: "16px",
                background: "none", border: "none",
                fontSize: "20px", cursor: "pointer", color: "#aaa",
                lineHeight: 1,
              }}
            >✕</button>

            <h5 style={{ fontWeight: 700, marginBottom: "20px", fontSize: "17px", color: "#1a1a1a" }}>
              Order Info
            </h5>

            {[
              { label: "Order ID", value: viewOrder.id },
              { label: "Customer Name", value: viewOrder.customerId },
              { label: "Date", value: viewOrder.date },
              { label: "Location", value: viewOrder.location },
              { label: "Amount", value: viewOrder.amount },
              { label: "Status", value: viewOrder.status },
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
                <span style={{ fontSize: "13px", color: "#999", fontWeight: 600, minWidth: "120px" }}>
                  {label}
                </span>
                <span style={{ fontSize: "13px", color: "#222", fontWeight: 500, textAlign: "right" }}>
                  {label === "Status"
                    ? <StatusBadge status={value} />
                    : value
                  }
                </span>
              </div>
            ))}

            <button
              onClick={() => setViewOrder(null)}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "10px",
                background: "#f97316",
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
        <h1 className={styles.pageTitle}>Order Page List</h1>
        <div className={styles.breadcrumb}>
          Order / <span>Order List</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <span className={styles.searchIcon}><SearchIcon /></span>
        </div>
        <div className={styles.toolbarRight}>
          <button className={styles.filterBtn}>
            <FilterIcon /> Filter ▾
          </button>
          <button
            className={styles.refreshBtn}
            title="Refresh"
            onClick={() => {
              setOrders(OrdersData);
              setSearch("");
              setCurrentPage(1);
              setSelectedRows([]);
            }}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={allPageSelected} onChange={toggleAll} />
              </th>
              <th>Order ID <SortIcon /></th>
              {/* ✅ Date — 768px pe hide */}
              <th className={styles.colDate}>Date <SortIcon /></th>
              <th>Customer Name <SortIcon /></th>
              {/* ✅ Location — 1200px pe hide */}
              <th className={styles.colLocation}>Location <SortIcon /></th>
              {/* ✅ Amount — 1200px pe hide */}
              <th className={styles.colAmount}>Amount <SortIcon /></th>
              {/* ✅ Status — 1200px pe hide */}
              <th className={styles.colStatus}>Status Order <SortIcon /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "32px", color: "#9ca3af" }}>
                  No orders found.
                </td>
              </tr>
            ) : (
              paginated.map((order) => {
                const isSelected = selectedRows.includes(order.id);
                const isMenuOpen = openMenu === order.id;

                return (
                  <tr key={order.id} className={isSelected ? styles.selectedRow : ""}>
                    <td className={styles.checkboxCell}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(order.id)}
                      />
                    </td>
                    <td className={styles.orderId}>{order.id}</td>

                    {/* Date — 768px pe hide */}
                    <td className={`${styles.dateCell} ${styles.colDate}`}>{order.date}</td>

                    <td className={styles.customerName}>{order.customerId}</td>

                    {/* Location — 1200px pe hide */}
                    <td className={`${styles.locationCell} ${styles.colLocation}`}>{order.location}</td>

                    {/* Amount — 1200px pe hide */}
                    <td className={`${styles.amountCell} ${styles.colAmount}`}>{order.amount}</td>

                    {/* Status — 1200px pe hide */}
                    <td className={styles.colStatus}>
                      <StatusBadge status={order.status} />
                    </td>

                    {/* Actions */}
                    <td className={styles.actionCell}>
                      <button
                        className={styles.dotsBtn}
                        onClick={() => setOpenMenu(isMenuOpen ? null : order.id)}
                      >
                        <DotsIcon />
                      </button>
                      {isMenuOpen && (
                        <ActionDropdown
                          order={order}
                          onClose={() => setOpenMenu(null)}
                          onAction={handleAction}
                          onDetails={(id) => setSelectedDetailId(id)}
                          onViewInfo={(o) => setViewOrder(o)}
                        />
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div className={styles.tableFooter}>
          <span className={styles.showingText}>
            Showing{" "}
            {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} from{" "}
            {filtered.length} data
          </span>

          <div className={styles.pagination}>
            <button className={styles.navBtn} onClick={() => goTo(1)} disabled={currentPage === 1} title="First page">«</button>
            <button className={styles.navBtn} onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1} title="Previous">‹</button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.pageBtn} ${page === currentPage ? styles.activePage : ""}`}
                onClick={() => goTo(page)}
              >
                {page}
              </button>
            ))}

            <button className={styles.navBtn} onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages} title="Next">›</button>
            <button className={styles.navBtn} onClick={() => goTo(totalPages)} disabled={currentPage === totalPages} title="Last page">»</button>
          </div>
        </div>
      </div>
    </div>
  );
}