export const initialState = {
  isLoggedIn: false,
  email: "",
  username: "",
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

    default:
      return state;
  }
};
