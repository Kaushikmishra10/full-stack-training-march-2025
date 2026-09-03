import React from "react";
import { Nav, Tab } from "react-bootstrap";
import { Calendar2, Clock, CurrencyRupee } from "react-bootstrap-icons";

const RBNavTabs = () => {
  return (
    <div>
      <h1>Exercise of NavTabs</h1>
      <br />

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Nav className="border-bottom" variant="underline primary" defaultActiveKey="first">
          <Nav.Item>
            <Nav.Link eventKey="first">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">Option 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>

          <Tab.Pane eventKey="first">
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, cupiditate dolores quis necessitatibus vitae enim eligendi culpa molestiae delectus debitis odit recusandae iure! Rem, accusantium consequuntur fuga odio eos natus.
            <br />
            <br />
            <div className="d-flex justify-content-between">
                <span>
                <span className="text-primary"><Calendar2/></span>
                <span className="fw-bold"> Start Date</span>
                </span>
                <span>01 July, 2025</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <span>
                <span className="text-primary"><Calendar2/></span>
                <span className="fw-bold"> End Date</span>
                </span>
                <span>31 Dec, 2025</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <span>
                <span className="text-primary"><Clock/></span>
                <span className="fw-bold"> Estimate Time</span>
                </span>
                <span>5 Months</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <span>
                <span className="text-primary"><CurrencyRupee/></span>
                <span className="fw-bold"> Estimate Cost</span>
                </span>
                <span><CurrencyRupee/>5,80,000</span>
            </div>
            <hr />
          </Tab.Pane>

          <Tab.Pane eventKey="second">
            Second tab content
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo similique ut quo officiis earum. Neque dignissimos nobis facere consequatur unde accusantium impedit. Eius porro distinctio tempore? Esse quisquam nemo itaque?
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default RBNavTabs;