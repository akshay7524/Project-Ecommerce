import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  CardImg,
} from "reactstrap";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

const Home = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setProductList(data));
  }, []);

  return (
    <>
      <Container className="mt-5" fluid>
        <Row className="p-2 pt-4">
          {productList?.map((value, index) => (
            <Col
              key={index}
              className="mb-4 d-flex justify-content-center"
              xs="12"
              sm="6"
              md="6"
              lg="4"
              xl="3"
            >
              <Card
                style={{
                  width: "17rem",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                }}
              >
                <CardImg
                  alt="Product image"
                  style={{
                    height: 180,
                  }}
                  src={value.image}
                  top
                  width="100%"
                />
                <CardBody>
                  <CardTitle
                    tag="h5"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {value.title}
                  </CardTitle>
                  <CardText>
                    Price:${value.price} <br />
                    <Rating size="small" value={value.rating.rate} readOnly />
                  </CardText>

                  <Link
                    to={{
                      pathname: `/ProductDetail/${value.id}`,
                    }}
                  >
                    <Button color="primary">Product Detail</Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
