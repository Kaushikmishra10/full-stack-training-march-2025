import { useForm } from "react-hook-form";
import { Button, Col, Form, Row, Container, Card, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RHFFormYup = () => {
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      firstname: "Nisha",
      lastname: "Mehta",
      email: "nisha@gmail.com",
      phone: "9876543210",
      age: "22",
      password: "pass123",
      pincode: "263001",
      address: "Dehradun Uttarakhand",
      gender: "Female",
      joiningDate: "2023-01-01",
      city: ["Dehradun", "Mumbai"],
      hobby: ["Drawing", "Singing"],
    },
  });

  const handleOnSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        toast.success("Form submitted successfully ");
        reset({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          age: "",
          password: "",
          pincode: "",
          address: "",
          gender: "",
          joiningDate: "",
          city: [],
          hobby: [],
        });
        resolve();
      }, 2000);
    });
  };

  return (
    <Container className="mt-2">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* <Card className="p-4"> */}
        <h3 className="mb-4 text-center">Registration Form</h3>

        <Form onSubmit={handleSubmit(handleOnSubmit)}>
          <fieldset disabled={isSubmitting}>
            <Row>
              <Col md={6}>
              {/* FirstName */}
                <Form.Group className="mb-3 text-start" controlId="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("firstname", { required: "First name is required" })}
                  />
                  <small className="text-danger">{errors.firstname?.message}</small>
                </Form.Group>
              </Col>

              {/* LastName */}
              <Col md={6}>
                <Form.Group className="mb-3 text-start" controlId="lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("lastname", { required: "Last name is required" })}
                  />
                  <small className="text-danger">{errors.lastname?.message}</small>
                </Form.Group>
              </Col>
              
              {/* Email */}
              <Col md={6}>
                <Form.Group className="mb-3 text-start" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Enter valid email",
                      },
                    })}
                  />
                  <small className="text-danger">{errors.email?.message}</small>
                </Form.Group>
              </Col>
                
              {/* Phone number */}
              <Col md={6}>
                <Form.Group className="mb-3 text-start" controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("phone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone must be exactly 10 digits",
                      },
                    })}
                  />
                  <small className="text-danger">{errors.phone?.message}</small>
                </Form.Group>
              </Col>

              {/* Age */}
              <Col md={6}>
                <Form.Group className="mb-3 text-start" controlId="age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    {...register("age", {
                      required: "Age is required",
                      min: { value: 18, message: "Minimum age 18" },
                      max: { value: 40, message: "Maximum age 40" },
                    })}
                  />
                  <small className="text-danger">{errors.age?.message}</small>
                </Form.Group>
              </Col>

              {/* Password */}
              <Col md={6}>
                <Form.Group className="mb-3 text-start" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("password", {
                      required: "Password required",
                      minLength: { value: 6, message: "Min 6 characters" },
                      maxLength: { value: 10, message: "Max 10 characters" },
                      pattern: {
                        value: /^\S*$/,
                        message: "No spaces allowed",
                      },
                    })}
                  />
                  <small className="text-danger">{errors.password?.message}</small>
                </Form.Group>
              </Col>

              {/* Pin/Zip */}
              <Col md={6}>
                <Form.Group className="mb-3 text-start" controlId="pincode">
                  <Form.Label>Pin / Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("pincode", {
                      required: "Pin code required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Pin must be 6 digits",
                      },
                    })}
                  />
                  <small className="text-danger">{errors.pincode?.message}</small>
                </Form.Group>
              </Col>

              {/* Address */}
              <Col md={6}>
                <Form.Group className="mb-3 text-start" controlId="address">
                  <Form.Label>Complete Address</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("address", {
                      required: "Address required",
                    })}
                  />
                  <small className="text-danger">{errors.address?.message}</small>
                </Form.Group>
              </Col>

                    {/* Gender */}
              <Col md={6} className="text-start" controlId="gender">
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
                <small className="text-danger">{errors.gender?.message}</small>
                </Form.Group>
              </Col>

              {/* Joining Date */}
              <Col md={6}>
                <Form.Group className="mb-3 text-start" controlId="joiningDate">
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
                  <small className="text-danger">{errors.joiningDate?.message}</small>
                </Form.Group>
              </Col>

                {/* City */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>

              <Form.Select
                multiple
                size={3}
                {...register("city", {
                  required: "The city is required.",
                  validate: (value) => {
                    if (!value || value.length < 2) {
                      return "Select at least two cities";
                    }
                    return true;
                  },
                })}
              >
                <option value="">Select 2 cities</option>
                <option value="Dehradun">Dehradun</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
              </Form.Select>
              
                <small className="text-danger">{errors.city?.message}</small>
            </Form.Group>
              </Col>

                {/* Hooies */}
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

                <small className="text-danger">{errors.hobby?.message}</small>
                </Form.Group>
              </Col>

                {/* Profile Pic */}
              <Col md={6}>
                <Form.Group className="mb-3 text-start" controlId="">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    {...register("profilePic", {
                      required: "Profile picture required",
                      validate: {
                        fileType: (value) => {
                          const file = value[0];
                          if (!file) return "Profile picture required";
                          const allowed = ["image/jpeg", "image/png", "image/gif"];
                          return allowed.includes(file.type) || "Only JPG, PNG, GIF allowed";
                        },
                        fileSize: (value) => {
                          const file = value[0];
                          if (!file) return true;
                          return file.size <= 6 * 1024 * 1024 || "Max 6MB allowed";
                        },
                      },
                    })}
                  />
                  <small className="text-danger">{errors.profilePic?.message}</small>
                </Form.Group>
              </Col>

              {/* For Resume */}
              <Col md={6}>
                <Form.Group className="mb-3 text-start" controlId="">
                  <Form.Label>Resume</Form.Label>
                  <Form.Control
                    type="file"
                    {...register("resume", {
                      required: "Resume required",
                      validate: {
                        fileType: (value) => {
                          const file = value[0];
                          if (!file) return "Resume required";
                          const allowed = [
                            "application/pdf",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                          ];
                          return allowed.includes(file.type) || "Only PDF or DOCX allowed";
                        },
                        fileSize: (value) => {
                          const file = value[0];
                          if (!file) return true;
                          return file.size <= 8 * 1024 * 1024 || "Max 8MB allowed";
                        },
                      },
                    })}
                  />
                  <small className="text-danger">{errors.resume?.message}</small>
                </Form.Group>
              </Col>

    
              <Col md={12} className="text-start" controlId="">
                <Form.Check
                  type="checkbox"
                  label="Agree to Terms & Conditions"
                  {...register("terms", {
                    required: "You must agree to terms",
                  })}
                />
                <small className="text-danger">{errors.terms?.message}</small>
              </Col>

          
              <Col md={12} className="mt-4 text-start" controlId="">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner size="sm" animation="border" /> Submitting...
                    </>
                  ) : (
                    "Submit Form"
                  )}
                </Button>
              </Col>

            </Row>
          </fieldset>
        </Form>
      {/* </Card> */}
    </Container>
  );
};

export default RHFFormYup