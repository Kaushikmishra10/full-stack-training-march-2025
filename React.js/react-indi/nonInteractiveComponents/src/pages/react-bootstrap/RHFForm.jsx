import React, { useState } from "react";
import { Button, Col, Row, Form, InputGroup } from "react-bootstrap";

const RHFForm = () => {
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    address: "",
    gender: "",
    hobbies: [],
    profile: null,
    resume: null,
    termsandconditions: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox" && name === "hobbies") {
      if (checked) {
        setFormData({
          ...formData,
          hobbies: [...formData.hobbies, value],
        });
      } else {
        setFormData({
          ...formData,
          hobbies: formData.hobbies.filter((h) => h !== value),
        });
      }
    } else if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log(formData);
      alert("Form Submitted Successfully");
    }

    setValidated(true);
  };

  return (
    <div>
      <h1>React Bootstrap Validation (Without Formik/Yup)</h1>
      <hr />

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              First name is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Last name is required
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Enter valid email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              required
              pattern="[0-9]{10}"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Enter valid 10-digit phone
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>State</Form.Label>
            <Form.Select
              required
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option>Haryana</option>
              <option>Delhi</option>
              <option>Rajasthan</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select state
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>City</Form.Label>
            <Form.Select
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option>Gurgaon</option>
              <option>Rohtak</option>
              <option>Jaipur</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select city
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Address is required
          </Form.Control.Feedback>
        </Form.Group>

        {/* Gender */}
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Check
            required
            type="radio"
            label="Male"
            name="gender"
            value="Male"
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="Female"
            name="gender"
            value="Female"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please select gender
          </Form.Control.Feedback>
        </Form.Group>

        {/* Hobbies */}
        <Form.Group className="mb-3">
          <Form.Label>Hobbies (Select at least 2)</Form.Label>
          <Form.Check
            type="checkbox"
            label="Drawing"
            name="hobbies"
            value="Drawing"
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Singing"
            name="hobbies"
            value="Singing"
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Traveling"
            name="hobbies"
            value="Traveling"
            onChange={handleChange}
          />
        </Form.Group>

        {/* File Upload */}
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Profile</Form.Label>
            <Form.Control
              required
              type="file"
              name="profile"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Resume</Form.Label>
            <Form.Control
              required
              type="file"
              name="resume"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        {/* Terms */}
        <Form.Group className="mb-3 mt-3">
          <Form.Check
            required
            type="checkbox"
            label="Accept Terms"
            name="termsandconditions"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            You must accept terms
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};


export default RHFForm