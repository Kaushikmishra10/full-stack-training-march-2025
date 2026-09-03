"use client";

import React from "react";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Badge,
  Image,
  InputGroup,
  Container,
} from "react-bootstrap";
import { List, Bell, ChatDots, Search } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";
import unitedState from "@/public/images/unitedState.jpg";
import Link from "next/link";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    document.cookie = "loggedInUser=; path=/; max-age=0; SameSite=Lax";

    router.push("/signin");
  };

  return (
    <Navbar bg="white" expand="lg" className="border-bottom py-3">
      <Container fluid>
        {/* LEFT (always visible) */}
        <div className="d-none d-lg-flex  align-items-center">
          <List size={24} className="me-3" />
        </div>

        {/* TOGGLE BUTTON */}
        <Navbar.Toggle aria-controls="navbar-content" />

        {/* COLLAPSIBLE AREA */}
        <Navbar.Collapse
          id="navbar-content"
          className="justify-content-between"
        >
          <div>
            {/* Search */}
            <Form className="my-3 my-lg-0 w-100 w-lg-auto">
              <InputGroup>
                <FormControl
                  placeholder="Search here"
                  className="rounded-start-pill py-1"
                />
                <InputGroup.Text className="bg-white rounded-end-pill">
                  <Search />
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </div>

          {/* RIGHT SECTION */}
          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 gap-xl-4 mt-3 mt-lg-0">
            <Button
              as={Link}
              href="/recipe-guide"
              className="rounded-pill text-light px-3 py-1"
            >
              Recipe Guide
            </Button>

            <div className="position-relative">
              <Link href="/bell-icon" className="text-dark">
                <Bell size={20} style={{ cursor: "pointer" }} />
              </Link>

              <Badge className="position-absolute top-0 start-100 translate-middle bg-primary rounded-circle">
                4
              </Badge>
            </div>

            <div className="position-relative">
              <Link href={"/messages"} className="text-dark">
                <ChatDots size={20} style={{ cursor: "pointer" }} />
              </Link>
              <Badge className="position-absolute top-0 start-100 translate-middle bg-primary rounded-circle">
                2
              </Badge>
            </div>

            <Image
              src="https://i.pravatar.cc/40"
              roundedCircle
              width={40}
              height={40}
              alt="profile"
            />

            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleLogout}
              className="rounded-pill text-info"
              style={{ backgroundColor: "#FFF3F0" }}
            >
              Logout
            </Button>

            {/* Language */}
            <div
              style={{ backgroundColor: "#FFF3F0" }}
              className="d-flex align-items-center border rounded-pill px-2 py-1"
            >
              {/* <Image src={unitedState} alt="flag" width={20} /> */}
              <select
                className="border-0 ms-2"
                style={{ backgroundColor: "transparent" }}
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Urdu</option>
              </select>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
