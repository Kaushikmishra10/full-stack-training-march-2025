import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Container, Row, Col } from "react-bootstrap";

const DashboardLayout = ({children}) => {
  return (
    <Container fluid>
      <Row>
        <Col lg={2} md={2} xs={3} className="p-0">
          <Sidebar />
        </Col>

        <Col lg={10} md={10} xs={9} className="p-0">
          <Header/>
          {children}
        </Col>
      </Row>
    </Container>
      
  )
}

export default DashboardLayout
