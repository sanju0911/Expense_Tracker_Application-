// src/pages/AboutUs.js
import React from "react";

import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div>
      <Container className="mt-5 about-us-container">
        <Row className="text-center mb-4">
          <Col>
            <h2>About Us</h2>
            <p className="lead">
              We are passionate about delivering the best service to our
              customers. Learn more about our journey and values below.
            </p>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <Card className="about-us-card">
              <Card.Body>
                <Card.Title>Our Mission</Card.Title>
                <Card.Text>
                  Our mission is to create a seamless and enjoyable experience
                  for our customers. We strive to innovate and constantly
                  improve our services to meet your needs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="about-us-card">
              <Card.Body>
                <Card.Title>Our Vision</Card.Title>
                <Card.Text>
                  We envision a future where technology bridges gaps and
                  enhances everyday life. We aim to be at the forefront of
                  progress, delivering unmatched quality and reliability.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card className="about-us-card">
              <Card.Body>
                <Card.Title>Our Values</Card.Title>
                <Card.Text>
                  Integrity, customer focus, and innovation are at the core of
                  everything we do. Our values drive us to maintain the highest
                  standards and a commitment to excellence.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="about-us-card">
              <Card.Body>
                <Card.Title>Our Story</Card.Title>
                <Card.Text>
                  Founded with a dream to make a difference, we have grown from
                  a small team into a dedicated workforce. Each chapter of our
                  journey adds to our rich heritage and passion.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
