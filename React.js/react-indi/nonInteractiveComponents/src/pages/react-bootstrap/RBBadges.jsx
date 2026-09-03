import React from "react";
import { Badge, Table } from "react-bootstrap";
import { Cart3, TelephoneFill, VectorPen } from "react-bootstrap-icons";
import MyBadge from "../../components/MyBadge";

const RBBadges = () => {
  return (
    <div>
      {/* Task */}
      <h1> Exercise of Breadcrumb</h1>
      <br />
      <Table responsive>
        <thead>
          <tr >
            <th style={{color:"gray"}}>#</th>
            <th style={{color:"gray"}}>Employee</th>
            <th style={{color:"gray"}}>Department</th>
            <th style={{color:"gray"}}>Salary</th>
            <th style={{color:"gray"}}>Payment Date</th>
            <th style={{color:"gray"}}>Payment Status</th>
            <th style={{color:"gray"}}>Employement Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Joseph Oden</td>
            <td><Cart3 className="text-secondary"/> Sales</td>
            <td>$64,000</td>
            <td>Aug 3, 2024</td>
            <td><Badge pill bg="primary-subtle text-primary">PENDING</Badge></td>
            <td>Full-Time</td>
          </tr>
          
          <tr>
            <td>2</td>
            <td>Carol Brown</td>
            <td><TelephoneFill className="text-secondary"/> Support</td>
            <td>$82,000</td>
            <td>Aug 6, 2024</td>
            <td><Badge pill className="negotating-badge">NEGOTATING</Badge></td>
            <td>Part-Time</td>
          </tr>
          
          <tr>
            <td>3</td>
            <td>Peggy Castello</td>
            <td><VectorPen className="text-secondary"/> Design</td>
            <td>$120,000</td>
            <td>Aug 13, 2024</td>
            <td><Badge pill className="failed-badge">FAILED</Badge></td>
            <td>Full-Time</td>
          </tr>
          
          <tr>
            <td>4</td>
            <td>Katherine Grey</td>
            <td><Cart3 className="text-secondary"/> Sales</td>
            <td>$75,000</td>
            <td>Aug 13, 2024</td>
            <td><Badge pill className="paid-badge">PAID</Badge></td>
            <td>Full-Time</td>
          </tr>
          
          <tr>
            <td>5</td>
            <td>Nelson Metz</td>
            <td><Cart3 className="text-secondary"/> Sales</td>
            <td>$28,000</td>
            <td>Aug 27, 2024</td>
            <td><Badge pill className="overdue-badge">OVERDUE</Badge></td>
            <td>Part-Time</td>
          </tr>
          

        </tbody>
      </Table>
    </div>
  );
};

export default RBBadges;