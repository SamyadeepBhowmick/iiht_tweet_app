import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

import {
  BsFillBookFill,
  BsFillShareFill,
  BsFillPersonPlusFill,
  BsFillCpuFill
} from "react-icons/bs";

import {RiLoginBoxLine} from "react-icons/ri";

import styles from "./styles/HomePage.module.css";

import psnLogo from "./assets/psn-logo-large.png";



function HomePage() {
  const navigate = useNavigate();

  return (
    <Container fluid>
      <Row className={styles.container}>
        <Col className={styles.colContainerRight}>
          <div className={styles.colWithButtons}>
            {/* <img src={psnLogo} alt="PSN logo" width={120} className="mb-3" /> */}
            <Row>
              <h5 style={{fontSize: "30px"}}>Welcome to Twitter</h5>
            </Row>{" "}
            <br />
            <Row>
              <Link to="/signin" className={styles.linkTextFormat}><Button className={`${styles.btnHomePage} mb-3`}>Sign In <RiLoginBoxLine /></Button></Link>
            </Row>
            <Row>
            <Link to="/signup" className={styles.linkTextFormat}><Button className={styles.btnHomePage}>Sign Up <BsFillPersonPlusFill /></Button></Link>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
