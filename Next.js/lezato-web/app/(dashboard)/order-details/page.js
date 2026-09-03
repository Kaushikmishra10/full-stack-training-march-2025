"use client";

import styles from "@/styles/scss/theme/orderDetails.module.css";
import OrderDetailData, { defaultDetail } from "@/data/OrderDetailsData";
import { FaShoppingCart,FaMoneyBillWave,FaTruck,FaBox,FaStar } from "react-icons/fa";
import StarRating from "@/components/StarRating"; 
// ── Icons ──────────────────────────────────────────────────────────────────
const BackIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.06 6.06l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PlaneIcon = () => (
  <svg
    width="22"
    height="22"
    fill="none"
    stroke="#9ca3af"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2c-.5.1-.9.6-.6 1.1l1.5 2.5c.3.5.9.7 1.4.5L8 9l-1.3 2.2L5 12c-.4.3-.4.9 0 1.2l1.5 1.5c.3.3.9.3 1.2 0l1.3-1.3L11 15l-.7 3.9c-.1.5.4 1 .9.9l2.6-1.5c.5-.3.7-.9.5-1.4L13 14l2.2-1.3L14 8l3.9 1.5c.5.2 1.1 0 1.4-.5l1.5-2.5c.3-.5-.1-1-.6-1.1z" />
  </svg>
);

const RemoveIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6M9 9l6 6" />
  </svg>
);

const TimelineIcons = [<FaShoppingCart />, <FaMoneyBillWave />, <FaTruck />, <FaBox />, <FaStar />];

// ── Donut Chart ────────────────────────────────────────────────────────────
function DonutChart({ data }) {
  const size = 130;
  const cx = 65;
  const cy = 65;
  const r = 46;
  const stroke = 18;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const segments = data.map((d) => {
    const dash = (d.percent / 100) * circumference;
    const seg = { ...d, dash, offset };
    offset += dash;
    return seg;
  });

  const mainPct = data.reduce(
    (max, d) => (d.percent > max.percent ? d : max),
    data[0],
  );

  return (
    <svg viewBox="0 0 130 130" className={styles.donutSvg}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#f3f4f6"
        strokeWidth={stroke}
      />
      {segments.map((seg, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={seg.color}
          strokeWidth={stroke}
          strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
          strokeDashoffset={-(seg.offset - circumference / 4)}
          strokeLinecap="butt"
        />
      ))}
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fontSize="16"
        fontWeight="800"
        fill="#1a1d23"
      >
        {mainPct.percent}%
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="#9ca3af">
        {mainPct.label}
      </text>
    </svg>
  );
}

// ── Map Placeholder ────────────────────────────────────────────────────────
function MapPlaceholder() {
  return (
    <div className={styles.mapCard}>
      <div className={styles.mapPlaceholder}>
        <svg
          className={styles.mapSvg}
          viewBox="0 0 540 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background */}
          <rect width="540" height="200" fill="#d1d5db" />
          {/* Road pattern */}
          <rect x="0" y="80" width="540" height="40" fill="#c4c8d0" />
          <rect x="220" y="0" width="40" height="200" fill="#c4c8d0" />
          {/* Route line */}
          <polyline
            points="80,50 80,100 200,100 200,150 340,150 340,100 460,100"
            fill="none"
            stroke="#f97316"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Start point */}
          <circle cx="80" cy="50" r="10" fill="#f97316" />
          <circle cx="80" cy="50" r="5" fill="#fff" />
          {/* Delivery marker */}
          <rect x="330" y="118" width="20" height="20" rx="4" fill="#f97316" />
          <text x="340" y="132" textAnchor="middle" fontSize="11" fill="#fff">
            📦
          </text>
          {/* End circle */}
          <rect
            x="448"
            y="88"
            width="24"
            height="24"
            rx="6"
            fill="#fff"
            stroke="#d1d5db"
            strokeWidth="2"
          />
        </svg>
        <button className={styles.mapExpand} title="Expand">
          ⛶
        </button>
      </div>
    </div>
  );
}

// ── Stars ──────────────────────────────────────────────────────────────────
// function Stars({ count }) {
//   return (
//     <span className={styles.stars}>
//       {"★".repeat(count)}
//       {"☆".repeat(5 - count)}
//     </span>
//   );
// }

// ── Main Component ─────────────────────────────────────────────────────────
export default function OrderDetailPage({ orderId = 1, onBack }) {
  const detail = OrderDetailData[orderId] || {
    ...defaultDetail,
    orderId: `#${orderId}`,
  };
  const doneCount = detail.timeline.filter((t) => t.done).length;
  const totalSteps = detail.timeline.length;
  // Calculate fill width percent
  const fillPercent =
    totalSteps > 1 ? ((doneCount - 1) / (totalSteps - 1)) * 100 : 0;

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {onBack && (
            <button className={styles.backBtn} onClick={onBack} title="Go back">
              <BackIcon />
            </button>
          )}
          <h1 className={styles.pageTitle}>Order ID {detail.orderId}</h1>
        </div>
        <div className={styles.breadcrumb}>
          Order / <span>Order Details</span>
        </div>
      </div>

      {/* Timeline */}
      <div className={styles.timelineCard}>
        <div className={styles.timeline}>
          {/* Filled progress line */}
          <div
            className={styles.timelineFill}
            style={{
              width: `calc(${fillPercent}% * (100% - 88px) / 100 + 0px)`,
            }}
          />
          {detail.timeline.map((step, i) => (
            <div className={styles.timelineStep} key={i}>
              <div
                className={`${styles.stepIcon} ${step.done ? styles.done : ""}`}
              >
                {TimelineIcons[i]}
              </div>
              <span
                className={`${styles.stepLabel} ${step.done ? styles.done : ""}`}
              >
                {step.label}
              </span>
              {step.time && (
                <span className={styles.stepTime}>{step.time}</span>
              )}
              {!step.time && <span className={styles.stepTime}>—</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          {/* Map */}
          <MapPlaceholder />

          {/* Delivery Guy */}
          <div className={styles.deliveryCard}>
            <div className={styles.driverAvatar} />
            <div className={styles.driverInfo}>
              <div className={styles.driverLabel}>Delivery guy</div>
              <div className={styles.driverName}>{detail.deliveryGuy.name}</div>
              <div className={styles.driverId}>{detail.deliveryGuy.id}</div>
            </div>
            <div className={styles.driverActions}>
              <button className={styles.iconBtn} title="Message">
                💬
              </button>
              <button className={styles.iconBtn} title="Call">
                📞
              </button>
            </div>
            <div
              style={{
                marginLeft: "16px",
                borderLeft: "2px dashed #f3f4f6",
                paddingLeft: "24px",
              }}
            >
              <PlaneIcon />
            </div>
            <div className={styles.estimatedBox}>
              <div className={styles.estLabel}>Estimated Time</div>
              <div className={styles.estTime}>{detail.estimatedTime}</div>
            </div>
          </div>

          {/* Items Table */}
          <div className={styles.itemsCard}>
            <div className={styles.itemsHeader}>
              <span>Items</span>
              <span>Qty</span>
              <span>Price</span>
              <span>Total Price</span>
              <span></span>
            </div>
            {detail.items.length === 0 && (
              <div
                style={{
                  padding: "24px",
                  textAlign: "center",
                  color: "#9ca3af",
                  fontSize: "13px",
                }}
              >
                No items found.
              </div>
            )}
            {detail.items.map((item) => (
              <div className={styles.itemRow} key={item.id}>
                <div className={styles.itemLeft}>
                  <div className={styles.itemThumb} />
                  <div>
                    <div className={styles.itemCategory}>{item.category}</div>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemRating}>
                      <StarRating rating={item.rating} />
                      <span>({item.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className={styles.itemQty}>{item.qty}x</div>
                <div className={styles.itemPrice}>{item.price}</div>
                <div className={styles.itemTotal}>{item.total}</div>
                <button className={styles.removeBtn}>
                  <RemoveIcon />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          {/* Customer Info */}
          <div className={styles.customerCard}>
            <div className={styles.custAvatarWrap}>
              <div className={styles.custAvatar} />
              <div className={styles.custName}>{detail.customer.name}</div>
              <span className={styles.custBadge}>Customer</span>
            </div>
            <div className={styles.custInfo}>
              <div className={styles.custInfoRow}>
                <div className={styles.custInfoIcon}>
                  <PhoneIcon />
                </div>
                <span>{detail.customer.phone}</span>
              </div>
              <div className={styles.custInfoRow}>
                <div className={styles.custInfoIcon}>
                  <LocationIcon />
                </div>
                <span>{detail.customer.address}</span>
              </div>
            </div>
          </div>

          {/* Note Order */}
          <div className={styles.noteCard}>
            <div className={styles.noteTitle}>Note Order</div>
            <div className={styles.noteText}>{detail.noteOrder}</div>
          </div>

          {/* Customer Favourites */}
          <div className={styles.favCard}>
            <div className={styles.favTitle}>Customer Favourite</div>
            <div className={styles.donutWrap}>
              <DonutChart data={detail.favourites} />
            </div>
            <div className={styles.favLegend}>
              {detail.favourites.map((f, i) => (
                <div className={styles.favLegendItem} key={i}>
                  <div className={styles.favLegendTop}>
                    <span>
                      {f.label} ({f.percent}%)
                    </span>
                    <span>{f.count}</span>
                  </div>
                  <div className={styles.favBar}>
                    <div
                      className={styles.favBarFill}
                      style={{ width: `${f.percent}%`, background: f.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
