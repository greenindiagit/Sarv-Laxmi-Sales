import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

// Dummy products (use real images or paths)
const products = [
  { id: 1, name: 'RX-C101', image: '/images/product1.png' },
  { id: 2, name: 'RX-C102', image: '/images/product2.png' },
  { id: 3, name: 'RX-C103', image: '/images/product3.png' },
  { id: 4, name: 'RX-C104', image: '/images/product4.png' },
  // Add more as needed
];

const QuoteRequestForm = () => {
  const [formData, setFormData] = useState({
    quantity: '',
    color: '',
    customization: '',
    location: '',
    name: '',
    company: '',
    mobile: '',
    whatsapp: '',
    email: '',
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData, 'Selected Product:', selectedProduct);
    alert('Submitted!');
  };

  return (
    <Container className="my-5">
      <h4 className="text-center mb-4">QUOTE REQUEST - OFFLINE BULK ORDER</h4>

      {/* Product Selection */}
      <h6 className="mb-3">SELECT THE SEAL</h6>
      <Row className="mb-5">
        {products.map((product) => (
          <Col xs={6} md={3} key={product.id} className="mb-3">
            <Card
              className={`h-100 text-center border ${
                selectedProduct === product.id ? 'border-primary' : ''
              }`}
              onClick={() => setSelectedProduct(product.id)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Text>{product.name}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Form Section */}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity Range</Form.Label>
              <Form.Select name="quantity" onChange={handleChange}>
                <option value="">Select</option>
                <option>20,000 to 50,000</option>
                <option>50,000 to 100,000</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="color">
              <Form.Label>Seal Colour</Form.Label>
              <Form.Select name="color" onChange={handleChange}>
                <option value="">Select</option>
                <option>Yellow</option>
                <option>Red</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="customization">
          <Form.Label>Customization / Printing</Form.Label>
          <Form.Control
            type="text"
            placeholder="Any printing requirements?"
            name="customization"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Delivery Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            placeholder="Enter delivery address"
            onChange={handleChange}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="company">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="company"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="mobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="whatsapp">
              <Form.Label>WhatsApp Number *</Form.Label>
              <Form.Control
                type="text"
                name="whatsapp"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
              />
              <Form.Text muted>
                Please type your domain email to get updates.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default QuoteRequestForm;
