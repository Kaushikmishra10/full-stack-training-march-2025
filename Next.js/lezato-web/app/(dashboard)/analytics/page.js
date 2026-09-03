"use client";

import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import dynamic from "next/dynamic";
import styles from "@/styles/scss/theme/analytics.module.css";
import {
  analyticsStats,
  salesStatisticData,
  customerMapData,
  salesSummaryData,
  loyalCustomers,
  bestSellerMenus,
  favoritesCategories,
  favoritesItems,
  dailyTrendingMenus,
} from "@/data/AnalyticsData";

// ── ApexCharts (SSR disable) ──────────────────────────────
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// ── Chart Configs ─────────────────────────────────────────

// Radial — stat cards
const radialConfig = (val) => ({
  options: {
    chart: { type: "radialBar", sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: "52%" },
        track: { background: "#f0f0f8", strokeWidth: "100%" },
        dataLabels: { show: false },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#f26522"],
        stops: [0, 100],
      },
    },
    colors: ["#ffb347"],
    stroke: { lineCap: "round" },
  },
  series: [val],
});

// Grouped Bar — Sales Statistic
const salesBarConfig = (tab) => ({
  options: {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "55%",
        borderRadiusApplication: "end",
        groupPadding: 0.1,
      },
    },
    dataLabels: { enabled: false },
    colors: ["#f26522", "#6c63ff"],
    xaxis: {
      categories: salesStatisticData.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#aaa", fontSize: "10px" } },
    },
    yaxis: {
      labels: { style: { colors: "#aaa", fontSize: "10px" } },
      tickAmount: 4,
    },
    grid: { borderColor: "#f5f5f5", strokeDashArray: 4 },
    legend: { show: false },
    tooltip: {
      theme: "light",
      custom: ({ series, seriesIndex, dataPointIndex }) => {
        return `<div style="padding:8px 12px;font-size:12px;font-family:Poppins,sans-serif">
          <b>${series[seriesIndex][dataPointIndex]} ${seriesIndex === 0 ? "Beverages" : "Food"}</b>
          <div style="color:#9a9ab0;font-size:11px">January 21, 2020</div>
        </div>`;
      },
    },
  },
  series: salesStatisticData.series,
});

// Customer Map Bar
const custMapConfig = {
  options: {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: {
      bar: {
        borderRadius: 3,
        columnWidth: "60%",
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    colors: ["#f26522"],
    xaxis: {
      categories: customerMapData.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#bbb", fontSize: "10px" } },
    },
    yaxis: {
      max: 80,
      tickAmount: 4,
      labels: { style: { colors: "#bbb", fontSize: "10px" } },
    },
    grid: { borderColor: "#f5f5f5", strokeDashArray: 3 },
    tooltip: { theme: "light" },
  },
  series: customerMapData.series,
};

// Sales Summary Radial (donut style)
const summaryRadialConfig = {
  options: {
    chart: { type: "radialBar", toolbar: { show: false } },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: -140,
        endAngle: 140,
        hollow: { size: "35%", background: "transparent" },
        track: { background: "#f0f0f8", strokeWidth: "97%", margin: 5 },
        dataLabels: {
          show: true,
          name: { show: false },
          value: { show: false },
          total: { show: false },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#f26522", "#ffb347", "#ffe0cc"],
        stops: [0, 100],
      },
    },
    colors: ["#f26522", "#ffb347", "#ffe0cc"],
    stroke: { lineCap: "round" },
    legend: { show: false },
  },
  series: salesSummaryData.radialSeries,
};

// Sparkline Area (favorites interest)
const sparkConfig = (data, color) => ({
  options: {
    chart: { type: "area", sparkline: { enabled: true } },
    stroke: { curve: "smooth", width: 2 },
    fill: { type: "gradient", gradient: { opacityFrom: 0.3, opacityTo: 0 } },
    colors: [color || "#f26522"],
    tooltip: { enabled: false },
  },
  series: [{ data }],
});

// Small radial for favorites
const favRadialConfig = (val) => ({
  options: {
    chart: { type: "radialBar", sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: "55%" },
        track: { background: "#f0f0f8" },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "13px",
            fontWeight: 700,
            color: "#1a1a2e",
            offsetY: 5,
            formatter: (v) => `${v}%`,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#f26522"],
        stops: [0, 100],
      },
    },
    colors: ["#ffb347"],
    stroke: { lineCap: "round" },
  },
  series: [val],
});

// ── Avatar helper ──────────────────────────────────────────
const avatarColors = [
  "#f26522",
  "#6c63ff",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
];
function getAvatarColor(name) {
  return avatarColors[name.charCodeAt(0) % avatarColors.length];
}
function Avatar({ name, size = 38 }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      className={styles.loyalAvatar}
      style={{ width: size, height: size, background: getAvatarColor(name) }}
    >
      {initials}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────
export default function AnalyticsPage() {
  const [salesTab, setSalesTab] = useState("Weekly");
  const [summaryTab, setSummaryTab] = useState("Monthly");
  const [activeCategory, setActiveCategory] = useState("All Categories");

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h4 className={styles.pageTitle}>Analytics</h4>
        </Col>
        <Col xs="auto">
          <span className={styles.breadcrumb}>Analytics / Analytics</span>
        </Col>
      </Row>

      {/* ══════════════════════════════════════
          ROW 1 — 4 Stat Cards
      ══════════════════════════════════════ */}
      <Row className="g-3 mb-3">
        {analyticsStats.map((stat, i) => {
          const cfg = radialConfig(stat.radial);
          return (
            <Col xs={6} md={3} key={i}>
              <div className={styles.statCard}>
                <div>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <h3 className={styles.statValue}>{stat.value}</h3>
                </div>
                <ReactApexChart
                  options={cfg.options}
                  series={cfg.series}
                  type="radialBar"
                  width={70}
                  height={70}
                />
              </div>
            </Col>
          );
        })}
      </Row>

      {/* ══════════════════════════════════════
          ROW 2 — Sales Statistic | Customer Map | Best Sellers
      ══════════════════════════════════════ */}
      <Row className="g-3 mb-3">
        {/* Sales Statistic */}
        <Col lg={5}>
          <div className={styles.card}>
            <Row className="align-items-center mb-2">
              <Col>
                <p className={styles.cardTitle}>Sales Statistic</p>
                <p className={styles.cardSub}>Lorem ipsum dolor</p>
              </Col>
              <Col xs="auto" className="d-flex gap-2 align-items-center">
                {salesStatisticData.tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSalesTab(t)}
                    className={`${styles.tabBtn} ${salesTab === t ? styles.tabActive : ""}`}
                  >
                    {t}
                  </button>
                ))}
                <button className={styles.dotSm}>···</button>
              </Col>
            </Row>

            {/* Legend */}
            <div className="d-flex align-items-center gap-3 mb-2 flex-wrap">
              <span className="d-flex align-items-center gap-1">
                <span
                  className={styles.legendDot}
                  style={{ background: "#f26522" }}
                />
                <span className={styles.legendLabel}>Beverages</span>
                <span className={styles.legendValue}>
                  &nbsp;{salesStatisticData.beverages}
                </span>
              </span>
              <span className="d-flex align-items-center gap-1">
                <span
                  className={styles.legendDot}
                  style={{ background: "#6c63ff" }}
                />
                <span className={styles.legendLabel}>Food</span>
                <span className={styles.legendValue}>
                  &nbsp;{salesStatisticData.food.toLocaleString()}
                </span>
              </span>
              <span className="d-flex align-items-center gap-3 ms-auto">
                <span className={styles.legendLabel}>Number</span>
                <label className={styles.toggle}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.toggleSlider} />
                </label>
              </span>
            </div>

            <ReactApexChart
              key={salesTab}
              options={salesBarConfig(salesTab).options}
              series={salesBarConfig(salesTab).series}
              type="bar"
              height={220}
            />
          </div>
        </Col>

        {/* Customer Map */}
        <Col lg={4}>
          <div className={styles.card}>
            <Row className="align-items-center mb-1">
              <Col>
                <p className={styles.cardTitle}>Customer Map</p>
                <p className={styles.cardSub}>Lorem ipsum dolor</p>
              </Col>
            </Row>
            <ReactApexChart
              options={custMapConfig.options}
              series={custMapConfig.series}
              type="bar"
              height={220}
            />
          </div>
        </Col>

        {/* Best Seller Menus */}
        <Col lg={3}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Best Seller Menus</p>
            <p className={styles.cardSub}>Lorem ipsum dolor</p>
            <div className="mt-2">
              {bestSellerMenus.map((item, i) => (
                <div key={i} className={styles.bestSellerItem}>
                  {/* ── IMAGE added here ── */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.bestSellerThumb}
                    style={{ objectFit: "cover" }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className={styles.bestSellerName}>{item.name}</p>
                    <Row className="align-items-center g-0 mt-1">
                      <Col xs="auto">
                        <p className={styles.bestSellerPrice}>{item.price}</p>
                      </Col>
                      <Col className="d-flex align-items-center gap-2 ms-2">
                        <span className={styles.bestSellerMeta}>
                          <span className={styles.heartIcon}>♥</span>{" "}
                          {item.likes}
                        </span>
                        <span className={styles.bestSellerMeta}>
                          <span style={{ color: "#f26522" }}>▌▌</span>{" "}
                          {item.sales}
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>
              ))}
              <div className="text-center mt-2">
                <button className={styles.showMoreBtn}>∨</button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* ══════════════════════════════════════
          ROW 3 — Sales Summary | Loyal Customers | Daily Trending
      ══════════════════════════════════════ */}
      <Row className="g-3 mb-3">
        {/* Sales Summary */}
        <Col lg={4}>
          <div className={styles.card}>
            <Row className="align-items-center mb-3">
              <Col>
                <p className={styles.cardTitle}>Sales Summary</p>
                <p className={styles.cardSub}>
                  Lorem ipsum dolor sit amet, consectetur
                </p>
              </Col>
              <Col xs="auto" className="d-flex gap-2 align-items-center">
                {salesSummaryData.tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSummaryTab(t)}
                    className={`${styles.tabBtn} ${summaryTab === t ? styles.tabActive : ""}`}
                  >
                    {t}
                  </button>
                ))}
              </Col>
            </Row>

            <Row className="align-items-center g-0">
              <Col xs={5} className="d-flex justify-content-center">
                <ReactApexChart
                  key={summaryTab}
                  options={summaryRadialConfig.options}
                  series={summaryRadialConfig.series}
                  type="radialBar"
                  width={170}
                  height={170}
                />
              </Col>
              <Col xs={7}>
                <div className={styles.summaryStatGrid}>
                  {salesSummaryData.stats.map((s, i) => (
                    <div key={i} className={styles.summaryStatItem}>
                      <p className={styles.summaryStatLabel}>{s.label}</p>
                      <p
                        className={styles.summaryStatValue}
                        style={{ color: s.color }}
                      >
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        {/* Loyal Customers */}
        <Col lg={5}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Loyal Customers</p>
            <p className={styles.cardSub}>Lorem ipsum dolor</p>
            <div className="mt-2">
              {loyalCustomers.map((c, i) => (
                <div key={i} className={styles.loyalRow}>
                  <Avatar name={c.name} />
                  <div style={{ flex: 1 }}>
                    <p className={styles.loyalName}>{c.name}</p>
                    <p className={styles.loyalOrders}>
                      <span className={styles.loyalOrdersHighlight}>
                        {c.orders.toLocaleString()}
                      </span>{" "}
                      {c.label}
                    </p>
                  </div>
                </div>
              ))}
              <div className="text-center mt-2">
                <button className={styles.showMoreBtn}>∨</button>
              </div>
            </div>
          </div>
        </Col>

        {/* Daily Trending Menus */}
        <Col lg={3}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Daily Trending Menus</p>
            <p className={styles.cardSub}>Lorem ipsum dolor</p>
            <div className="mt-2">
              {dailyTrendingMenus.map((item, i) => (
                <div key={i} className={styles.trendItem}>
                  {/* ── IMAGE added here ── */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.trendThumb}
                    style={{ objectFit: "cover" }}
                  />
                  <div className={styles.trendInfo}>
                    <p className={styles.trendName}>{item.name}</p>
                    <p className={styles.trendOrder}>Order {item.orders}x</p>
                  </div>
                  <span className={styles.trendPrice}>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {/* ══════════════════════════════════════
          ROW 4 — Most Favorites Items (full width)
      ══════════════════════════════════════ */}
      <Row className="g-3">
        <Col xs={12}>
          <div className={styles.card}>
            <Row className="align-items-center mb-3">
              <Col>
                <p className={styles.cardTitle}>Most Favorites Items</p>
                <p className={styles.cardSub}>
                  Lorem ipsum dolor sit amet, consectetur
                </p>
              </Col>
              <Col xs="auto">
                <div className={styles.categoryFilterWrap}>
                  {favoritesCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`${styles.catBtn} ${activeCategory === cat ? styles.catBtnActive : ""}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </Col>
            </Row>

            {favoritesItems.map((item, i) => (
              <div key={i} className={styles.favItem}>
                {/* ── IMAGE added here ── */}
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.favThumb}
                  style={{ objectFit: "cover" }}
                />

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className={styles.favName}>{item.name}</p>
                  <div className={styles.favRating}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={
                          s <= item.rating
                            ? styles.favStar
                            : styles.favStarEmpty
                        }
                      >
                        ★
                      </span>
                    ))}
                    <span className={styles.favReviews}>
                      &nbsp;({item.reviews})
                    </span>
                  </div>
                  <p className={styles.favLikes}>♥ {item.likes}</p>
                </div>

                {/* Sparkline */}
                <div style={{ width: 90, flexShrink: 0 }}>
                  <ReactApexChart
                    options={sparkConfig(item.sparkData, "#f26522").options}
                    series={[{ data: item.sparkData }]}
                    type="area"
                    width={90}
                    height={50}
                  />
                </div>

                {/* Interest */}
                <div className={styles.favInterest}>
                  <p className={styles.favInterestPct}>{item.interest}%</p>
                  <p className={styles.favInterestLabel}>Interest</p>
                </div>

                {/* Total Sales */}
                <div className={styles.favSales}>
                  <p className={styles.favSalesValue}>
                    {item.totalSales.toLocaleString()}
                  </p>
                  <p className={styles.favSalesLabel}>Total Sales</p>
                </div>

                {/* Radial */}
                <div style={{ flexShrink: 0 }}>
                  <ReactApexChart
                    options={favRadialConfig(item.radial).options}
                    series={[item.radial]}
                    type="radialBar"
                    width={80}
                    height={80}
                  />
                </div>
              </div>
            ))}

            <div className="text-center mt-2">
              <button className={styles.showMoreBtn}>∨</button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
