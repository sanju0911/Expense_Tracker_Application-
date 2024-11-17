import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import NavigationBar from "./Navbar";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    photo: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.user);
        setLoading(false);
      } catch (err) {
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/auth/me",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data.user);
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile.");
      setSuccess("");
    }
  };

  const isProfileComplete = () => {
    return (
      userData.firstName &&
      userData.lastName &&
      userData.age &&
      userData.gender &&
      userData.photo
    );
  };

  return (
    <div>
      <NavigationBar isProfileComplete={isProfileComplete()} />
      <Container className="mt-5">
        <h2>Profile</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <Image
                  src={userData.photo || "/default-avatar.png"}
                  roundedCircle
                  className="profile-image"
                  style={{ width: "150px", height: "150px" }}
                />
              </Col>
              <Col md={8}>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                </Form.Group>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </Form.Group>
                <Form.Group controlId="age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={userData.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                  />
                </Form.Group>
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    disabled
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </div>
  );
};

export default Profile;
