"use client";

import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = "https://69e9c09b15c7e2d51268ab44.mockapi.io/v1/users";

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const checkRes = await fetch(API_URL);
      if (!checkRes.ok) throw new Error("Server error. Please try again.");

      const existingUsers = await checkRes.json();
      const nameExists = existingUsers.some(
        (u) => u.name?.toLowerCase() === formData.name.toLowerCase()
      );

      if (nameExists) {
        setError("This name is already taken. Please choose another.");
        setLoading(false);
        return;
      }

      const createRes = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          password: formData.password,
        }),
      });

      if (!createRes.ok) throw new Error("Failed to create account. Please try again.");

      setSuccess("Account created successfully! Redirecting to Sign In...");
      setTimeout(() => router.push("/signin"), 1500);

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row>
        <Col>
          <Card style={{ width: "400px" }} className="p-4 shadow">
            <h3 className="text-center mb-4">Sign Up</h3>

            <Form onSubmit={handleSubmit}>

              {/* Error Message */}
              {error && (
                <div
                  className="alert alert-danger py-2 px-3 mb-3"
                  style={{ fontSize: "0.85rem", borderRadius: "8px" }}
                >
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div
                  className="alert alert-success py-2 px-3 mb-3"
                  style={{ fontSize: "0.85rem", borderRadius: "8px" }}
                >
                  {success}
                </div>
              )}

              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Create password (min 6 chars)"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-100"
                disabled={loading}
                style={{ background: "#f26522", border: "none", borderRadius: "8px" }}
              >
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Creating account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <small>
                Already have an account?{" "}
                <Link href="/signin">Sign In</Link>
              </small>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}