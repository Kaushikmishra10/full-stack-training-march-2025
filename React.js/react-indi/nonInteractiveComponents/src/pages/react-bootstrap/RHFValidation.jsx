import { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const RHFValidation = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm();
  // {
  // defaultValues: {
  //   firstname:" ",
  //   lastname:" "
  // }}
  // const handleOnSubmit = (data) => {
  //   console.log(data);
  // };
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = (data) => {
    console.log(data);

    setLoading(true); // start loading

    setTimeout(() => {
      toast.success("Form Submitted Successfully");
      reset();
      setLoading(false); // stop loading
    }, 3000);
  };
  return (
    <div>
      <h1>This is React Hook Form Validation Without Yup</h1>
      <hr />
      <Form onSubmit={handleSubmit(handleOnSubmit)}>
        <fieldset disabled={loading}>
            <Row>
            {/* For FirstName */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="firstname">
                <Form.Label>First name</Form.Label>
                <Form.Control
                    type="text"
                    {...register("firstname", {
                    required: "The Firstname is required.",
                    })}
                />
                <div className="text-danger">{errors?.firstname?.message}</div>
                </Form.Group>
            </Col>
            {/* For LastName */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="lastname">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                    type="text"
                    {...register("lastname", {
                    required: "The lastname is required.",
                    })}
                />
                <div className="text-danger">{errors?.lastname?.message}</div>
                </Form.Group>
            </Col>
            </Row>
            <Row>
            {/* For Age */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                    type="number"
                    {...register("age", {
                    required: "The Age is required.",
                    min: { value: 18, message: "Age must be greater than 18" },
                    max: { value: 40, message: "Age must be less than 50" },
                    })}
                />
                <div className="text-danger">{errors?.age?.message}</div>
                </Form.Group>
            </Col>
            {/* For Password */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    {...register("password", {
                    required: "The password is required.",
                    minLength: {
                        value: 6,
                        message: "Password must be greater than 4",
                    },
                    maxLength: {
                        value: 10,
                        message: "You can use maximum 10 character for password",
                    },
                    validate: (value) => {
                        if (!value) return true;
                        if (value.includes(" "))
                        return "Password cannot contain spaces";
                        const hasSpecialChar =
                        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(value);
                        const hasNumber = /\d/.test(value);
                        if (!hasSpecialChar || !hasNumber) {
                        return "Password must contain at least one special character and one number.";
                        }
                        return true;
                    },
                    })}
                />
                <div className="text-danger">{errors?.password?.message}</div>
                </Form.Group>
            </Col>
            </Row>

            <Row>
            {/* For PhoneNumber */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control
                    type="text"
                    {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be 10 digits",
                    },
                    })}
                />
                <div className="text-danger">{errors?.phone?.message}</div>
                </Form.Group>
            </Col>
            {/* For Email */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    {...register("email", {
                    required: "The email is required.",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                    },
                    })}
                />
                <div className="text-danger">{errors?.email?.message}</div>
                </Form.Group>
            </Col>
            </Row>

            <Row>
            {/* For Country */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Select
                    {...register("country", {
                    required: "The country is required.",
                    })}
                >
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
                <Form.Select
                    {...register("state", { required: "The state is required." })}
                >
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

                <Form.Select
                    multiple
                    size={3}
                    {...register("city", {
                    required: "The city is required.",
                    validate: (value) =>
                        value.length >= 2 || "Select at least two cities",
                    })}
                >
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
                <Form.Control
                    as="textarea"
                    rows={4}
                    {...register("address", {
                    required: "The address is required.",
                    })}
                />
                <div className="text-danger">{errors?.address?.message}</div>
                </Form.Group>
            </Col>
            </Row>

            <Row>
            {/* For Zip/Pin */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="zip">
                <Form.Label>Zip/Pin No.</Form.Label>
                <Form.Control
                    type="text"
                    {...register("zip", {
                    required: "Zip/Pin is required",
                    pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Zip/Pin must be 6 digits",
                    },
                    })}
                />
                <div className="text-danger">{errors?.zip?.message}</div>
                </Form.Group>
            </Col>
            {/* Joining date */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="joiningDate">
                <Form.Label>Joining Date</Form.Label>
                <Form.Control
                    type="date"
                    {...register("joiningDate", {
                    required: "Joining date is required.",
                    validate: (value) => {
                        const today = new Date();
                        const selectedDate = new Date(value);
                        return (
                        selectedDate < today ||
                        "Joining date must be less than today's date"
                        );
                    },
                    })}
                />
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
                        {...register("gender", {
                        required: "Please select your gender",
                        })}
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
                        {...register("hobby", {
                        validate: (value) => {
                            return (
                            value.length >= 2 ||
                            "Please select at least two hobby"
                            );
                        },
                        required: "Please select at least two hobby",
                        })}
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
                <Form.Control
                    type="file"
                    {...register("profilePicture", {
                    required: "Profile picture is required.",
                    validate: {
                        acceptedFormats: (value) => {
                        if (!value || value.length === 0) return true; // Skip validation if no file is selected
                        const file = value[0]; // Assuming single file upload
                        const acceptedFormatList = [
                            "image/jpeg",
                            "image/png",
                            "image/gif",
                        ];
                        return (
                            acceptedFormatList.includes(file.type) ||
                            "Only JPEG, PNG, and GIF images are allowed."
                        );
                        },
                        fileSize: (value) => {
                        if (!value || value.length === 0) return true;
                        const file = value[0];
                        const maxSize = 6 * 1024 * 1024; // 6MB in bytes
                        return (
                            file.size <= maxSize ||
                            "File size must be less than 5MB."
                        );
                        },
                    },
                    })}
                />
                <div className="text-danger">
                    {errors?.profilePicture?.message}
                </div>
                </Form.Group>
            </Col>
            {/* For Resume */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="resume">
                <Form.Label>Resume</Form.Label>
                <Form.Control
                    type="file"
                    {...register("resume", {
                    required: "Resume is required.",
                    validate: {
                        acceptedFormats: (value) => {
                        if (!value || value.length === 0) return true; // Skip validation if no file is selected
                        const file = value[0]; // Assuming single file upload
                        const acceptedFormatList = [
                            "application/pdf",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        ];
                        return (
                            acceptedFormatList.includes(file.type) ||
                            "Only PDF, Word file resume are allowed."
                        );
                        },
                        fileSize: (value) => {
                        if (!value || value.length === 0) return true;
                        const file = value[0];
                        const maxSize = 8 * 1024 * 1024; // 8MB in bytes
                        return (
                            file.size <= maxSize ||
                            "File size must be less than 5MB."
                        );
                        },
                    },
                    })}
                />
                <div className="text-danger">{errors?.resume?.message}</div>
                </Form.Group>
            </Col>
            </Row>

            {/* For Checkbox */}
            <Form.Group className="mb-3">
            <Form.Check
                type="checkbox"
                
                label="Accept Terms"
                {...register("termsandconditions", {
                required: "You must accept terms and conditions",
                })}
            />
            <div className="text-danger">
                {errors?.termsandconditions?.message}
            </div>
            </Form.Group>
        </fieldset>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                animation="border"
                size="sm"
                role="status"
                className="me-2"
              />
              Submitting...
            </>
          ) : (
            "Submit Form"
          )}
        </Button>
        <ToastContainer />
      </Form>
    </div>
  );
};

export default RHFValidation;