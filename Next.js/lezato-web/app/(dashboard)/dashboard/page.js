"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Row, Col } from "react-bootstrap";
import styles from "@/styles/scss/theme/dashboard.module.css";
import {
  statCards,
  trendingMenus,
  trendingKeywords,
  otherTags,
  customers,
  shippingList,
  mapMarkers,
  mapLines,
  GEO_URL,
  radialConfig,
  areaConfig,
  barConfig,
} from "@/data/DashboardData";

// ── ApexCharts (SSR disable) ──────────────────────────────
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// ── react-simple-maps (SSR disable) ──────────────────────
const ComposableMap = dynamic(
  () => import("react-simple-maps").then((m) => m.ComposableMap),
  { ssr: false },
);
const Geographies = dynamic(
  () => import("react-simple-maps").then((m) => m.Geographies),
  { ssr: false },
);
const Geography = dynamic(
  () => import("react-simple-maps").then((m) => m.Geography),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-simple-maps").then((m) => m.Marker),
  { ssr: false },
);
const Line = dynamic(() => import("react-simple-maps").then((m) => m.Line), {
  ssr: false,
});

// ── Avatar Helper ─────────────────────────────────────────
function Avatar({ name, size = 36 }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  const colors = [
    "#f26522",
    "#6c63ff",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
  ];
  const bg = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className={styles.avatar}
      style={{ width: size, height: size, background: bg }}
    >
      {initials}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Weekly");

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h4 className={styles.pageTitle}>Dashboard</h4>
        </Col>
        <Col xs="auto">
          <span className={styles.breadcrumb}>Dashboard / Dashboard</span>
        </Col>
      </Row>

      {/* ══════════════════════════════════════════
          ROW 1 — Stat Cards + Revenue Chart
      ══════════════════════════════════════════ */}
      <Row className="mb-3 g-3">
        <Col xs={12} lg={5} xl={4}>
          <Row className="g-3 h-100">
            {statCards.map((card, i) => {
              const cfg = radialConfig(card.radial);
              return (
                <Col xs={6} key={i}>
                  <div className={styles.statCard}>
                    <div>
                      <p className={styles.statLabel}>{card.label}</p>
                      <h3 className={styles.statValue}>{card.value}</h3>
                    </div>
                    <ReactApexChart
                      options={cfg.options}
                      series={cfg.series}
                      type="radialBar"
                      width={68}
                      height={68}
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        </Col>

        <Col xs={12} lg={7} xl={8}>
          <div className={`${styles.card} h-100`}>
            <Row className="mb-2 align-items-start">
              <Col>
                <p className={styles.cardTitle}>Today's Revenue</p>
                <p className={styles.cardSub}>
                  Lorem ipsum dolor sit amet, consectetur
                </p>
              </Col>
              <Col xs="auto" className="text-end">
                <h4 className={styles.revenueAmt}>$ 240.45</h4>
                <span className={styles.revenueUp}>▲ 0.5% than last day</span>
              </Col>
            </Row>
            <ReactApexChart
              options={areaConfig.options}
              series={areaConfig.series}
              type="area"
              height={185}
            />
          </div>
        </Col>
      </Row>

      {/* ══════════════════════════════════════════
          ROW 2 — Trending Menus + Customer Map
      ══════════════════════════════════════════ */}
      <Row className="mb-3 g-3">
        <Col xs={12} lg={4} xl={3}>
          <div className={`${styles.card} h-100`}>
            <p className={styles.cardTitle}>Daily Trending Menus</p>
            <p className={styles.cardSub}>
              Lorem ipsum dolor sit amet, consectetur
            </p>
            <div className="mt-3">
              {trendingMenus.map((item) => (
                <div key={item.rank} className={styles.trendRow}>
                  <span className={styles.trendRank}>#{item.rank}</span>
                  <div className={styles.trendInfo}>
                    <p className={styles.trendName}>{item.name}</p>
                    <p className={styles.trendMeta}>
                      <span className={styles.trendPrice}>{item.price}</span>
                      &nbsp;&nbsp;Order {item.orders}x
                    </p>
                  </div>
                  <img
                    src={item.img}
                    alt={item.name}
                    className={styles.trendThumb}
                  />
                </div>
              ))}
            </div>
          </div>
        </Col>

        <Col xs={12} lg={8} xl={9}>
          <div className={`${styles.card} h-100`}>
            <Row className="mb-1 align-items-center">
              <Col>
                <p className={styles.cardTitle}>Customer Map</p>
                <p className={styles.cardSub}>Lorem ipsum dolor sit amet</p>
              </Col>
              <Col
                xs="auto"
                className="d-flex align-items-center gap-2 flex-wrap"
              >
                {["Monthly", "Weekly", "Today"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ""}`}
                  >
                    {tab}
                  </button>
                ))}
                <button className={styles.dotSm}>···</button>
              </Col>
            </Row>
            <ReactApexChart
              key={activeTab}
              options={barConfig(activeTab).options}
              series={barConfig(activeTab).series}
              type="bar"
              height={270}
            />
          </div>
        </Col>
      </Row>

      {/* ══════════════════════════════════════════
          ROW 3 — Customers | Delivery Map | Keywords
      ══════════════════════════════════════════ */}
      <Row className="g-3">
        {/* Customers List */}
        <Col xs={12} md={6} lg={3} xl={2}>
          <div className={`${styles.card} h-100`}>
            <Row className="mb-3 align-items-center">
              <Col>
                <p className={styles.cardTitle}>Customers</p>
                <p className={styles.cardSub}>Lorem ipsum dolor</p>
              </Col>
              <Col xs="auto">
                <button className={styles.addCircle}>+</button>
              </Col>
            </Row>
            {customers.map((c, i) => (
              <div key={i} className={styles.custRow}>
                <Avatar name={c.name} />
                <div>
                  <p className={styles.custName}>{c.name}</p>
                  <p
                    className={
                      c.type === "MEMBER"
                        ? styles.memberBadge
                        : styles.regularBadge
                    }
                  >
                    {c.type}
                  </p>
                </div>
              </div>
            ))}
            <div className="text-center mt-2">
              <button className={styles.showMore}>∨</button>
            </div>
          </div>
        </Col>

        {/* Delivery Map + Shipping */}
        <Col xs={12} md={6} lg={6} xl={7}>
          <div className={`${styles.card} h-100`}>
            <Row className="mb-2 align-items-center">
              <Col>
                <p className={styles.cardTitle}>Delivery Maps</p>
                <p className={styles.cardSub}>
                  Lorem ipsum dolor sit amet, consectetur
                </p>
              </Col>
              <Col xs="auto">
                <button className={styles.dotSm}>···</button>
              </Col>
            </Row>

            <div className={styles.mapBox}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 110, center: [20, 15] }}
                style={{ width: "100%", height: "200px" }}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#dde0f0"
                        stroke="#ffffff"
                        strokeWidth={0.6}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "#c8cce8", outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {mapLines.map(([from, to], i) => (
                  <Line
                    key={i}
                    from={from}
                    to={to}
                    stroke="#6c63ff"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeDasharray="4 3"
                  />
                ))}
                {mapMarkers.map(({ name, coords }) => (
                  <Marker key={name} coordinates={coords}>
                    <circle
                      r={6}
                      fill="#f26522"
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  </Marker>
                ))}
              </ComposableMap>
              <div className={styles.mapBadge}>
                <span className={styles.mapOrders}>45 Orders</span>
                <span className={styles.mapTime}>10:45 AM</span>
              </div>
            </div>

            <div className="mt-3">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span style={{ fontSize: "1.1rem" }}>✈️</span>
                <p className={styles.cardTitle} style={{ margin: 0 }}>
                  Upcoming Shipping Schedule
                </p>
              </div>
              {shippingList.map((s, i) => (
                <Row
                  key={i}
                  className={`${styles.shipRow} align-items-center g-2`}
                >
                  <Col xs="auto">
                    <Avatar name={s.name} size={34} />
                  </Col>
                  <Col>
                    <p className={styles.shipName}>
                      {s.name}{" "}
                      <span style={{ color: s.itemColor, fontWeight: 700 }}>
                        ({s.items} Items)
                      </span>
                    </p>
                    <p className={styles.shipTime}>{s.time}</p>
                  </Col>
                  <Col xs="auto" className="text-end d-none d-md-block">
                    <p className={styles.shipAddr}>{s.address}</p>
                  </Col>
                  <Col xs="auto">
                    <button className={styles.pinBtn}>📍</button>
                  </Col>
                </Row>
              ))}
              <div className="text-center mt-2">
                <button className={styles.showMore}>∨</button>
              </div>
            </div>
          </div>
        </Col>

        {/* Trending Keywords */}
        <Col xs={12} md={12} lg={3} xl={3}>
          <div className={`${styles.card} h-100`}>
            <p className={styles.cardTitle}>Trending Keyword</p>
            <p className={styles.cardSub}>
              Lorem ipsum dolor sit amet, consectetur
            </p>
            <div className="mt-3">
              {trendingKeywords.map((kw, i) => (
                <div key={i} className="mb-3">
                  <div className={styles.kwTrack}>
                    <div
                      className={styles.kwFill}
                      style={{ width: `${kw.pct}%` }}
                    />
                  </div>
                  <Row className="mt-1">
                    <Col>
                      <span className={styles.kwTag}>{kw.tag}</span>
                    </Col>
                    <Col xs="auto">
                      <span className={styles.kwCount}>{kw.count}</span>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p className={styles.cardTitle}>Others tag</p>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {otherTags.map((tag, i) => (
                  <span key={i} className={styles.otherTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
