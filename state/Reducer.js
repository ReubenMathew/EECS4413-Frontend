export const initialState = {
  isLoggedIn: false,
  email: "",
  username: "",
  cart: [],
  dummyData: [
    {
      id: 0,
      productName: "Hiking Boots",
      category: "Footwear",
      description: "Its a boot. Just some boots for hiking",
      color: "Black",
      price: 49.99,
      quantity: 12,
    },
    {
      id: 1,
      productName: "Mountain Bike",
      category: "bikes",
      description: "Wow bikes. A bike for biking.",
      color: "green",
      price: 110.99,
      quantity: 5,
    },
    {
      id: 2,
      productName: "dumb car",
      category: "chevrolet",
      description: "A shit ass chevy car",
      color: "dogwater",
      price: 5000.0,
      quantity: 1,
    },
    {
      id: 3,
      productName: "Metal forks",
      category: "kitchen ware",
      description: "f o r k",
      color: "metal",
      price: 12.99,
      quantity: 500,
    },
  ],
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
    case "SET_LOGGED_OUT":
      return {
        ...state,
        isLoggedIn: false,
        email: "",
        username: "",
        catalogProducts: [],
        selectedItem: { id: 0, name: "default" },
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
    case "SET_CATALOG_PRODUCTS":
      return {
        ...state,
        catalogProducts: action.data,
      };
    case "SET_SELECTED_PRODUCT":
      return {
        ...state,
        selectedItem: action.data,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: state.cart.concat(action.data),
      };

    default:
      return state;
  }
};
