"use client";
import React from "react";
import Image from "next/image";
import { Nav, Accordion, Navbar } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/styles/scss/theme.scss";
import styles from "@/styles/scss/theme/sidebar.module.css";
import lezatoLogo from "@/public/images/lezatoLogo.jpg";
import sprinkleMenu from "@/public/images/sprinkleMenu.png";
import {
  House,
  Clipboard,
  Grid,
  People,
  BarChart,
  ArrowRight,
} from "react-bootstrap-icons";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  const isMenuActive =
    pathname === "/add-menu" ||
    pathname === "/menu" ||
    pathname === "/categories";

  return (
    <Navbar expand="lg">
      <div className={`${styles.sidebar} shadow-sm d-flex flex-column p-3`}>
        {/* Logo */}
        <h3 className="fw-bold mb-4">
          <Link href="/dashboard">
            <Image src={lezatoLogo} alt="Logo" className="img-fluid" />
          </Link>
        </h3>

        <Navbar.Toggle />

        <Navbar.Collapse className="align-items-start w-100">
          <Nav className="flex-column w-100" style={{ gap: 0 }}>
            {/* Dashboard */}
            <Nav.Link
              as={Link}
              href="/dashboard"
              className={`${styles.navLink} ${isActive("/dashboard") ? styles.navLinkActive : ""} d-flex align-items-center`}
            >
              <House className="me-2" /> Dashboard
            </Nav.Link>

            {/* Orders */}
            <Nav.Link
              as={Link}
              href="/orders"
              className={`${styles.navLink} ${isActive("/orders") ? styles.navLinkActive : ""} d-flex align-items-center`}
            >
              <Clipboard className="me-2" /> Orders
            </Nav.Link>

            {/* Menus Accordion */}
            <Accordion
              flush
              defaultActiveKey={isMenuActive ? "0" : undefined}
              style={{ padding: 0, margin: 0, width: "100%" }}
            >
              <Accordion.Item
                eventKey="0"
                className={styles.accordionItem}
                style={{ padding: 0, margin: 0 }}
              >
                <Accordion.Header
                  className={`${styles.accordionHeader} ${isMenuActive ? styles.accordionHeaderActive : ""}`}
                >
                  <Grid className="me-2" /> Menus
                </Accordion.Header>
                <Accordion.Body style={{ padding: 0, margin: 0 }}>
                  <Nav className="flex-column ms-3" style={{ gap: 0 }}>
                    <Nav.Link
                      as={Link}
                      href="/add-menu"
                      className={`${styles.subNavLink} ${isActive("/add-menu") ? styles.subNavLinkActive : ""}`}
                    >
                      Add Menu
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      href="/menu"
                      className={`${styles.subNavLink} ${isActive("/menu") ? styles.subNavLinkActive : ""}`}
                    >
                      Menu List
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      href="/categories"
                      className={`${styles.subNavLink} ${isActive("/categories") ? styles.subNavLinkActive : ""}`}
                    >
                      Categories
                    </Nav.Link>
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* Customer */}
            <Nav.Link
              as={Link}
              href="/customer"
              className={`${styles.navLink} ${isActive("/customer") ? styles.navLinkActive : ""} d-flex align-items-center`}
            >
              <People className="me-2" /> Customer
            </Nav.Link>

            {/* Analytics */}
            <Nav.Link
              as={Link}
              href="/analytics"
              className={`${styles.navLink} ${isActive("/analytics") ? styles.navLinkActive : ""} d-flex align-items-center`}
            >
              <BarChart className="me-2" /> Analytics
            </Nav.Link>

            {/* Review */}
            <Nav.Link
              as={Link}
              href="/review"
              className={`${styles.navLink} ${isActive("/review") ? styles.navLinkActive : ""} d-flex align-items-center`}
            >
              <People className="me-2" /> Review
            </Nav.Link>

            {/* Add Menus Card */}
            <div className="add-menu-card d-none d-lg-block bg-secondary border rounded-5 position-relative mt-5 p-1 z-1">
              <Image
                className="img-fluid position-absolute top-0 start-50 translate-middle z-0"
                src={sprinkleMenu}
                alt="Sprinkle Image"
                width={100}
              />
              <h6 className="fw-bold text-light pt-4">Add Menus</h6>
              <p style={{ fontSize: "12px" }} className="text-light">
                Manage your food and beverages menus <ArrowRight />
              </p>
            </div>

            {/* Footer */}
            <div className="text-muted small mt-3">
              <p className="mb-0 text-info fw-bold">Lezato Restaurant Admin</p>
              <p className="mb-0">© 2020 All Rights Reserved</p>
            </div>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Sidebar;
