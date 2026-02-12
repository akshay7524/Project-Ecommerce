import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetail } from "../redux/Action";
import { Rating } from "@mui/material";
import { Button, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import {
  addTemporaryCartItem,
  addToCart,
  incrementCartItem,
} from "../redux/Action";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const productDetail = useSelector((state) => state.productDetail);
  const cartData = useSelector((state) => state.cartData);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const { id, title, price, category, description, rating, image } =
    productDetail;
  useEffect(() => {
    dispatch(fetchProductDetail(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (isLoggedIn) {
      const existingItem = cartData.find((value) => value.id === id);
      if (existingItem) {
        dispatch(incrementCartItem(id));
      } else {
        dispatch(addToCart({ id, title, price, image }));
      }
    }
    
    else {
      dispatch(addTemporaryCartItem({ id, title, price, image }));
    }
  };

  return (
    <>
      {Object.keys(productDetail).length && (
        <Container fluid className="customContainer">
          <Row className="customRow">
            <Col xs="12" md="6" className="customColumn1">
              <div className="ProductImageDiv">
                <img src={productDetail.image} alt="" />
              </div>
            </Col>
            <Col xs="12" md="6" className="customColumn2">
              <div className="ProductDetailDiv">
                <div className="ProductDetailHeader">
                  <div className="ProductTitle">
                    <h3>{title}</h3>
                    <h6>{category}</h6>
                  </div>
                  <div className="RatingDiv">
                    <Rating
                      name="read-only"
                      size="small"
                      value={rating.rate}
                      precision={0.5}
                      readOnly
                    />
                    <small className="text-muted">
                      ({rating.count} Reviews)
                    </small>
                  </div>
                </div>
                <h3>${price}</h3>
                <div className="ProductDescriptionDiv">
                  <p>{description} </p>
                  
                </div>
                <div className="productButtons">
                  <Link to="/Cart">
                    <Button onClick={handleAddToCart} size="sm" color="primary">
                      Add to Cart
                    </Button>
                    <Button onClick={handleAddToCart} size="sm" color="primary">
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProductDetail;
