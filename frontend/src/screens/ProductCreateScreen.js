import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductCreateScreen = ({ history }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const dispatch = useDispatch();

  const newProduct = useSelector((state) => state.createProduct);
  const { product, success } = newProduct;

  useEffect(() => {
    if (success) {
      dispatch({
        type: PRODUCT_CREATE_RESET,
      });
      history.push(`/admin/products`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name: productName,
        image: "/images/phone.jpg",
        description: productDescription,
        brand: "Apple",
        category: "Electronics",
        price: 799.99,
        countInStock: 7,
        rating: 4.9,
        numReviews: 18,
      })
    );
  };

  return (
    <Row>
      <Col md={6}>
        <h2>Create new product</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              type="textarea"
              rows={3}
              placeholder="Enter description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProductCreateScreen;
