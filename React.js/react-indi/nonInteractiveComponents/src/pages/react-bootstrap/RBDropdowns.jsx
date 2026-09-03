import React from 'react'
import { Dropdown, DropdownButton, Image } from 'react-bootstrap'
import { Bell, BoxArrowDownRight, BoxArrowRight, Gear, Person, Speedometer2 } from 'react-bootstrap-icons'

const RBDropdowns = () => {
  return (
    <div>
      <h1>Exercise  of Dropdown</h1>
      <hr />
      <Dropdown>
      <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
        <Person/> Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header>Header-1</Dropdown.Header>
        <Dropdown.Item href="#/action-1"><Speedometer2/> Dasboard</Dropdown.Item>
        <Dropdown.Item href="#/action-2"><Bell/> Notification</Dropdown.Item>
        <Dropdown.Divider/>
        <Dropdown.Header>Header-2</Dropdown.Header>
        <Dropdown.Item href="#/action-1"><Gear/> Setting</Dropdown.Item>
        <Dropdown.Item href="#/action-2"><BoxArrowRight/> Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <hr />

    <DropdownButton id="dropdown-basic-button"  title="Dropdown button">
      <Dropdown.Item href="#/action-1"><Speedometer2/> Dasboard</Dropdown.Item>
      <Dropdown.Item href="#/action-2"><Bell/> Notification</Dropdown.Item>
      <Dropdown.Item href="#/action-3"><Gear/> Setting</Dropdown.Item>
      <Dropdown.Item href="#/action-3"><BoxArrowRight/> Logout</Dropdown.Item>
    </DropdownButton>

    <hr />

    <Dropdown>
      <Dropdown.Toggle bsPrefix=' ' as="span" id="dropdown-basic" style={{ cursor: "pointer" }}>
            <Image
            src="https://i.pinimg.com/736x/1a/e0/28/1ae0289b4aa8103b3a313b5cd89444dc.jpg"
            roundedCircle
            width={45}
            height={45}
            />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header>Header-1</Dropdown.Header>
        <Dropdown.Item href="#/action-1"><Speedometer2/> Dasboard</Dropdown.Item>
        <Dropdown.Item href="#/action-2"><Bell/> Notification</Dropdown.Item>
        <Dropdown.Divider/>
        <Dropdown.Header>Header-2</Dropdown.Header>
        <Dropdown.Item href="#/action-1"><Gear/> Setting</Dropdown.Item>
        <Dropdown.Item href="#/action-2"><BoxArrowRight/> Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    </div>
  )
}

export default RBDropdowns