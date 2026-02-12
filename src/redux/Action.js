import {
    ADD_TO_CART,
    DECREMENT_CART_ITEM,
    INCREMENT_CART_ITEM,
    SET_LOGIN_STATUS,
    SET_PRODUCT_DETAIL,
    CLEAR_CART,
   ADD_TEMPORARY_CART_ITEM,
  } from "./ActionTypes";
  
  const setProductDetail = (data) => {
    return {
      type: SET_PRODUCT_DETAIL,
      payload: data,
    };
  };
  
  const setLoginStatus = (boolVal) => {
    console.log(boolVal)
  
    localStorage.setItem("loginStatus", boolVal);
    return {
      type: SET_LOGIN_STATUS,
      payload: boolVal,
    };
  };
  
  const addToCart = (cartItem) => {
    cartItem = { ...cartItem, quantity: 1 };
    return {
      type: ADD_TO_CART,
      payload: cartItem,
    };
  };
  
  const addTemporaryCartItem = (tempItem) => {
    tempItem = { ...tempItem, quantity: 1 };
    return {
      type: ADD_TEMPORARY_CART_ITEM,
      payload: tempItem,
    };
  };
  
  const incrementCartItem = (id) => {
    return {
      type: INCREMENT_CART_ITEM,
      payload: id,
    };
  };
  
  const decrementCartItem = (id) => {
    return {
      type: DECREMENT_CART_ITEM,
      payload: id,
    };
  };
  const clearCart = () => {
    return {
      type: CLEAR_CART,
    };
  };
  const fetchProductDetail = (id) => {
    return (dispatch) => {
      fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(setProductDetail(data));
        });
    };
  };
  export {
    setProductDetail,
    fetchProductDetail,
    setLoginStatus,
    addToCart,
     addTemporaryCartItem,
    incrementCartItem,
    decrementCartItem,
    clearCart,
  };
  