import React, { useState } from 'react'
import { Button,  ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Pencil, TypeBold, TypeItalic, TypeStrikethrough, TypeUnderline } from 'react-bootstrap-icons'

const RBButtons = () => {
    const [value, setValue] = useState([]);
    const handleChange = (val) => setValue(val);

  return (
    <div>
      <h1>Exercise of Buttons</h1>
      <br />

      <h2>Button Style</h2>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary">Normal Button</Button>
        <Button variant="primary"><span> <Pencil /></span> Edit Record</Button>
        <Button variant="outline-primary">Outline Button</Button>
        <Button variant="primary" size="lg" disabled>
        Primary button
      </Button>
      </div>

      <br />

      <h2>Button Type</h2>
      <div className="d-flex flex-wrap gap-2">
        <Button href="#">Link</Button> <Button type="submit">Button</Button>
        <Button as="input" type="button" value="Input" />
        <Button as="input" type="submit" value="Submit" />
        <Button as="input" type="reset" value="Reset" />
      </div>

      <br />

      <h2>Toggle Buttons</h2>        
        <ToggleButtonGroup type="checkbox" className="mb-2" onChange={handleChange}>
            <ToggleButton variant="outline-primary" id="tbg-check-1" value={"fw-bold"}>
            <TypeBold/>
            </ToggleButton>
            <ToggleButton variant="outline-primary" id="tbg-check-2" value={"fst-italic"}>
            <TypeItalic/>
            </ToggleButton>
            <ToggleButton variant="outline-primary" id="tbg-check-3" value={"text-decoration-underline"}>
            <TypeUnderline/>
            </ToggleButton>
            <ToggleButton variant="outline-primary" id="tbg-check-4" value={"text-decoration-line-through"}>
            <TypeStrikethrough/>
            </ToggleButton>
        </ToggleButtonGroup>
    <br />
        <span className={value.join(" ")}>Here is the action of the above button will be reflected</span>

    </div>
  )
}

export default RBButtons