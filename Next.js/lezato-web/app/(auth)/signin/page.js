"use client";

import React, { useState } from "react";
import { Form, Button, Card, Container, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";

const API_URL = "https://69e9c09b15c7e2d51268ab44.mockapi.io/v1/users";

export default function SignIn() {
  const router = useRouter();

  const [formData, setFormData] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid =
    formData.name.trim() !== "" && formData.password.trim() !== "";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) { setError("Please fill all fields."); return; }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(API_URL);
      const users = await res.json();

      const matchedUser = users.find(
        (u) =>
          u.name?.toLowerCase() === formData.name.toLowerCase() &&
          u.password === formData.password
      );

      if (matchedUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

        const encoded = encodeURIComponent(JSON.stringify(matchedUser));
        document.cookie = `loggedInUser=${encoded}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;

        router.push("/dashboard");
      } else {
        setError("Invalid name or password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h3 className="text-center mb-4">Sign In</h3>

        <Form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </Form.Group>

          {!isFormValid && <small className="text-danger">Fill all fields</small>}

          <Button type="submit" className="w-100 mt-2" disabled={loading || !isFormValid}>
            {loading ? <Spinner size="sm" /> : "Sign In"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}