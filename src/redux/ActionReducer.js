import {
  ADD_TO_CART,
  DECREMENT_CART_ITEM,
  INCREMENT_CART_ITEM,
  SET_LOGIN_STATUS,
  SET_PRODUCT_DETAIL,
  CLEAR_CART,
 ADD_TEMPORARY_CART_ITEM,
} from "./ActionTypes";

const initialState = {
  productDetail: [],
  isLoggedIn: JSON.parse(localStorage.getItem("loginStatus")) === true,
  cartData: JSON.parse(localStorage.getItem("cartData")) || [],
};

const ActionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };

    case SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    case ADD_TO_CART:
      const updatedCartAdd = [...state.cartData, action.payload];
      localStorage.setItem("cartData", JSON.stringify(updatedCartAdd));
      return {
        ...state,
        cartData: updatedCartAdd,
      };

    case ADD_TEMPORARY_CART_ITEM:
      const updatedCartTemp = [action.payload];
      console.log("updatedcarttemp",updatedCartTemp);
      localStorage.setItem("cartData", JSON.stringify(updatedCartTemp));
      return {
        ...state,
        cartData: updatedCartTemp,
      };

    case CLEAR_CART:
      localStorage.removeItem("cartData");
      return {
        ...state,
        cartData: [],
      };

    case INCREMENT_CART_ITEM:
      const updatedCartQuantityInc = state.cartData.map((value) =>
        value.id === action.payload
          ? { ...value, quantity: value.quantity + 1 }
          : value
      );
      localStorage.setItem("cartData", JSON.stringify(updatedCartQuantityInc));
      return {
        ...state,
        cartData: updatedCartQuantityInc,
      };
      case DECREMENT_CART_ITEM:
        const updatedCartQuantityDec = state.cartData.map((value) =>
          value.id === action.payload
            ? { ...value, quantity: value.quantity - 1 }
            : value
        ).filter((value) => value.quantity > 0);
      localStorage.setItem("cartData", JSON.stringify(updatedCartQuantityDec));
      
      return {
        ...state,
        cartData: updatedCartQuantityDec,
      };

    default:
      return state;
  }
};

export { ActionReducer };
