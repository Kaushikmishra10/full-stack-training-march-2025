import React, { useState } from 'react'
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap'

const RBFormsPractive = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Hi!")
  const [city, setCity] = useState("");
  const [selectedColor, setSelectedColor] = useState([]);
  const [payment, setPayment] = useState("")

  const handleSubmit = (e) => {
  e.preventDefault()
  console.log("Email Address: " + email);
}

const [validated, setValidated] = useState(false);

const handleSubmit2 = (event) => {
  const form = event.currentTarget;

  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    event.preventDefault();
    alert("Form Submitted...");
  }

  setValidated(true);
};

const handlecolorSelection = (e) => {
  const { value, checked } = e.target;

  if (checked) {
    setSelectedColor([...selectedColor, value]);
  } else {
    setSelectedColor(selectedColor.filter((color) => color !== value));
  }
};

  
  return (
    <div>
      <h1>Practice of Form 1st form</h1>
      <hr />

    <Form onSubmit={handleSubmit}>


      {/* for main email formatting */}
      <h3 className='text-secondary'>Textbox Control</h3>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} placeholder="name@example.com" required autoComplete="username"
         defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
         <p>your email is: {email}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required placeholder="Enter password" autoComplete="current-password"
         defaultValue={password} onChange={(e) => setPassword(e.target.value)}/>
         <p>your password is: {password}</p>
      </Form.Group>


    {/* for textbox control  */}
      <h3 className='text-secondary'>Textbox Control</h3>

      <Form.Group className="mb-3" controlId="message" >
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder='Enter your message' defaultValue={message} onChange={(e) => setMessage(e.target.value)}></Form.Control>
        your message is: <pre>{message}</pre>
      </Form.Group>


      {/* For selected any one of the options */}
      <h3 className='text-secondary'>Select/ComboBox Control</h3>

      <Form.Select aria-label="Default select example"  onChange={(e) => setCity(e.target.value)}>
        <option value="none">Select City</option>
        <option value="Rohtak">Rohtak</option>
        <option value="Delhi">Delhi</option>
        <option value="Gurgaon">Gurgaon</option>
      </Form.Select>
        <p>Your City is: {city}</p>


      {/* For checkbox */}
      <h3 className='text-secondary'>Checkbox </h3>

    <Form.Group className="mb-3" controlId="message" >
        <Form.Label>Example checkbox</Form.Label>
      <Form.Check 
            type="checkbox"
            id="red"
            label="Red-color"
            value="red"
            onChange={handlecolorSelection}
            />

          <Form.Check
            // disabled
            type="checkbox"
            label="Green"
            id="green-color"
            value="green"
            onChange={handlecolorSelection}
            />
          <Form.Check
            type="checkbox"
            label="Blue"
            id="blue-color"
            value="blue"
            onChange={handlecolorSelection}
          />
      </Form.Group>
      <p>Selected colors: {" "}
        {/* {JSON.stringify(selectedColor)} */}
        {/* {selectedColor.join(", ")} */}
        {selectedColor.length > 0 ? selectedColor.join(", ") : "None"}
        </p>


        {/* For Radio buttons */}
      <h3 className='text-secondary'>Radio</h3>

    <Form.Group className="mb-3" controlId="message" >
        <Form.Label>Select the payment method</Form.Label>
      <Form.Check 
            type="radio"
            id="Creadit-card"
            label="Creadit-card"
            value="Creadit-card"
            name="paymentType"
            onChange={(e) => setPayment(e.target.value)}
            />

          <Form.Check
            // disabled
            type="radio"
            label="Debit-card"
            id="Debit-card"
            value="Debit-card"
            name="paymentType"
            onChange={(e) => setPayment(e.target.value)}
            />
          <Form.Check
            type="radio"
            label="UPI"
            id="UPI"
            value="UPI"
            name="paymentType"
            onChange={(e) => setPayment(e.target.value)}
          />
      </Form.Group>
      <p>Selected Payment: {" "}
        {/* {JSON.stringify(selectedColor)} */}
        {/* {selectedColor.join(", ")} */}
        {payment ? payment : "None"}
        </p>
    <br />
    <Button type="submit">Submit</Button>
    </Form>


{/* Basics form validation */}

<hr />

<h1>Basic Form validation  2nd form</h1>
        <br />

        <Form noValidate validated={validated} onSubmit={handleSubmit2}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
    </div>
  )
}

export default RBFormsPractive
