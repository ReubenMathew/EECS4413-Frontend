//import { data } from "./dummyData";

import { data } from "autoprefixer";

export const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  email: "",
  username: "",
  token: "",
  cart: [],
  catalogData: [],
  searchParams: { productName: "", brand: "", category: "" },
};

export const storageReducer = (state, action) => {
  switch (action.type) {
    case "INIT_STORED": {
      return action.data;
    }
    case "SET_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.data,
      };
    case "SET_LOGGED_OUT":
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        email: "",
        token: "",
        username: "",
      };
    case "SET_IS_ADMIN":
      return {
        ...state,
        isAdmin: true,
      };
    case "SET_NOT_ADMIN":
      return {
        ...state,
        isAdmin: false,
      };
    case "SET_USERNAME":
      return {
        ...state,
        username: action.data,
      };
    case "SET_EMAIL":
      return {
        ...state,
        email: action.data,
      };
    case "SET_SEARCH_PARAMS":
      return {
        ...state,
        searchParams: action.data,
      };
    case "SET_CATALOG_PRODUCTS":
      return {
        ...state,
        catalogData: action.data,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: state.cart.concat(action.data),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "CART_QUANT_CHANGE":
      return {
        ...state,
        cart: action.data,
      };

    default:
      return state;
  }
};
