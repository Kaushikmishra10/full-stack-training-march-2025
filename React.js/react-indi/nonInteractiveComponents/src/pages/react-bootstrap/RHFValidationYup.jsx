import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";

const RHFValidationYup = () => {
  const schema = yup.object().shape({
    firstname: yup.string().required("First name is required"),

    lastname: yup.string().required("Last name is required"),

    age: yup
      .number()
      .required("Please select the age it's required")
      .typeError("Please select the age it's required")
      .min(18, "Age must be greater then 18")
      .max(40, "Age must be less then 40"),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be greater than 6")
      .max(10, "You can use maximum 10 character for password")
      .matches(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/,
        "Password must contain at least one special character",
      )
      .matches(/\d/, "Password must contain at least one digit")
      .test("inBetweenSpace", "Password cannot contain spaces", (value) => {
        if (value.includes(" ")) return false;
        else return true;
      }),

    phone: yup
      .string()
      .matches(/^\+?[1-9]\d{9,10}$/, "Enter a valid phone number")
      .required("Phone number is required."),

    email: yup
      .string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Enter a valid email address",
      )
      .required("Email address is required."),

    country: yup.string().required("Please select the country it's required"),

    city: yup
      .array()
      .min(2, "Please select at least 2 cities")
      .required("City is required"),

    state: yup.string().required("Please select the state it's required"),

    address: yup.string().required("Please enter your address, it's required"),

    zip: yup
      .string()
      .matches(/^\+?[1-9]\d{5,5}$/, "Enter valid PIN value")
      .required("Please enter valid Zip/Pin"),

    joiningDate: yup
      .date()
      .typeError("Please select the joining date")
      .max(new Date(), "Future date is not allowed")
      .required("Joining date is required"),

    gender: yup.string().required("Please select the gender it's required"),

    hobby: yup
      .array()
      .required("Hobbies are required")
      .typeError("Please select at least two hobbies")
      .min(2, "Please select at least two hobbies"),

    profilePicture: yup
      .mixed()
      .test(
        "fileFormat",
        "Only JPG, JPEG, GIF and PNG files are allowed",
        (value) => {
          if (!value || !value[0]) return false;
          const file = value[0];
          const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
          return allowedTypes.includes(file.type);
        },
      )
      .test("fileSize", "File size must be less than 5MB", (value) => {
        if (!value || !value[0]) return false;
        const file = value[0];
        return file.size <= 5 * 1024 * 1024; // 5MB limit
      }), //pending

    resume: yup
      .mixed()
      .test("fileFormat", "Only PDF and DOCX files are allowed", (value) => {
        if (!value || !value[0]) return false;
        const file = value[0];
        const allowedTypes = [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        return allowedTypes.includes(file.type);
      })
      .test("fileSize", "File size must be less than 5MB", (value) => {
        if (!value || !value[0]) return false;
        const file = value[0];
        return file.size <= 6 * 1024 * 1024; // 5MB limit
      }), //pending

    termsandconditions: yup.bool().oneOf([true], "Terms must be accepted"),
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const handleOnSubmit = (data) => {
    setLoading(true);

    setTimeout(() => {
      console.log(data);

      toast.success("Form Submitted Successfully");

      reset();

      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <h1>This is react hook validation with yup </h1>
      <br />
      <Form onSubmit={handleSubmit(handleOnSubmit)} disabled={loading}>
        <Row>
          {/* For FirstName */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="firstname">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" {...register("firstname")} />
              <div className="text-danger">{errors?.firstname?.message}</div>
            </Form.Group>
          </Col>
          {/* For LastName */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="lastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" {...register("lastname")} />
              <div className="text-danger">{errors?.lastname?.message}</div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {/* For Age */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" {...register("age")} />
              <div className="text-danger">{errors?.age?.message}</div>
            </Form.Group>
          </Col>
          {/* For Password */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" {...register("password")} />
              <div className="text-danger">{errors?.password?.message}</div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* For PhoneNumber */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone No.</Form.Label>
              <Form.Control type="text" {...register("phone")} />
              <div className="text-danger">{errors?.phone?.message}</div>
            </Form.Group>
          </Col>
          {/* For Email */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" {...register("email")} />
              <div className="text-danger">{errors?.email?.message}</div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* For Country */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Select {...register("country")}>
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Japan">Japan</option>
              </Form.Select>
              <div className="text-danger">{errors?.country?.message}</div>
            </Form.Group>
          </Col>
          {/* For State */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Select {...register("state")}>
                <option value="">Select State</option>
                <option value="Haryana">Haryana</option>
                <option value="Rajisthan">Rajisthan</option>
                <option value="Punjab">Punjab</option>
              </Form.Select>
              <div className="text-danger">{errors?.state?.message}</div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {/* For City */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>

              <Form.Select multiple size={3} {...register("city")}>
                <option value="">Select 2 cities</option>
                <option value="Rohtak">Rohtak</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Jalandher">Jalandher</option>
              </Form.Select>

              <div className="text-danger">{errors?.city?.message}</div>
            </Form.Group>
          </Col>
          {/* For Address */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows={4} {...register("address")} />
              <div className="text-danger">{errors?.address?.message}</div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* For Zip/Pin */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="zip">
              <Form.Label>Zip/Pin No.</Form.Label>
              <Form.Control type="text" {...register("zip")} />
              <div className="text-danger">{errors?.zip?.message}</div>
            </Form.Group>
          </Col>
          {/* Joining date */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="joiningDate">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control type="date" {...register("joiningDate")} />
              <div className="text-danger">{errors?.joiningDate?.message}</div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* For Gender */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="gender">
              <Form.Label>Gender</Form.Label>
              <br />
              {["Male", "Female", "Transgender"].map((gender, index) => {
                return (
                  <Form.Check
                    key={index}
                    inline
                    label={gender}
                    value={gender}
                    id={gender}
                    type="radio"
                    {...register("gender")}
                  />
                );
              })}
              <div className="text-danger">{errors?.gender?.message}</div>
            </Form.Group>
          </Col>
          {/* For Hoobies */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="hobby">
              <Form.Label>Hobbies</Form.Label>
              <br />
              {["Drawing", "Singing", "Dancing"].map((hobby, index) => {
                return (
                  <Form.Check
                    key={index}
                    inline
                    value={hobby}
                    label={hobby}
                    id={hobby}
                    type="checkbox"
                    {...register("hobby")}
                  />
                );
              })}
              <div className="text-danger">{errors?.hobby?.message}</div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* For Profile Pic */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="profilePicture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" {...register("profilePicture")} />
              <div className="text-danger">
                {errors?.profilePicture?.message}
              </div>
            </Form.Group>
          </Col>
          {/* For Resume */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="resume">
              <Form.Label>Resume</Form.Label>
              <Form.Control type="file" {...register("resume")} />
              <div className="text-danger">{errors?.resume?.message}</div>
            </Form.Group>
          </Col>
        </Row>

        {/* For Checkbox */}
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Accept Terms"
            {...register("termsandconditions")}
          />
          <div className="text-danger">
            {errors?.termsandconditions?.message}
          </div>
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Form"}
        </Button>
        <ToastContainer />
      </Form>
    </div>
  );
};

export default RHFValidationYup;