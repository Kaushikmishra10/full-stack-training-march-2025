import React, { useContext } from 'react'
import { Accordion, AccordionContext, Card, useAccordionButton } from 'react-bootstrap'
import { DashCircle, PlusCircle } from 'react-bootstrap-icons';

const RBAccordion = () => {


function CustomToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey);

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <div
      role='button'
      className={`d-flex justify-content-between py-2 border-bottom fw-bold ${isCurrentEventKey ? "text-primary" : "text-black"}` }
      onClick={decoratedOnClick}
    >
      {children}
      {isCurrentEventKey ? <DashCircle/> : <PlusCircle/>}      
    </div>
  );
}
  return (
    <div>
        <h1> Exercise of Accordion</h1>
        <br />
        <Accordion defaultActiveKey="0">
      <div>
        <CustomToggle eventKey="0">What is the cost of an online course?</CustomToggle>
        <Accordion.Collapse eventKey="0">
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptate illum expedita, soluta ab autem veniam impedit qui ipsa accusantium quam exercitationem odio nisi consectetur nesciunt sapiente quisquam doloribus sunt.</div>
        </Accordion.Collapse>
      </div>
      
      <div>
        <CustomToggle eventKey="1">Do I need to visit any physical location?</CustomToggle>
        <Accordion.Collapse eventKey="1">
          <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis eos id ipsa incidunt, veniam unde tempore blanditiis voluptatibus? Eos commodi impedit officia sed numquam, laboriosam adipisci excepturi animi in tempore!</div>
        </Accordion.Collapse>
      </div>

      <div>
        <CustomToggle eventKey="2">What are the technology requiremnets?</CustomToggle>
        <Accordion.Collapse eventKey="2">
          <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis eos id ipsa incidunt, veniam unde tempore blanditiis voluptatibus? Eos commodi impedit officia sed numquam, laboriosam adipisci excepturi animi in tempore!</div>
        </Accordion.Collapse>
      </div>
    </Accordion>
    </div>
  )
}

export default RBAccordion