import React from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import MainContent from "./MainContent";
import {
  Button,
  Row,
  Col,
  FormControl,
  FormGroup,
  Form,
  ControlLabel
} from "react-bootstrap";

const Dashboard = (props) => (
      <div>
        <Row>{<Navbar />}</Row>
        <Row>
          <Col xs={12} md={6}>
            <Sidebar />
          </Col>
					<Col>
					<MainContent  />
          </Col>
        </Row>
      </div>
    );

export default Dashboard;