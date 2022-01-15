/*
This is the global state object. Any variable in this object is available
for access and updating anywhere in the app. Follow these steps to get a fresh page setup with global state

1. import this at the top of the file : import { useAppContext } from "../State/AppContext";
2. paste this destructured object in the main function:   const { state, dispatch } = useAppContext();
3. If you want access to the state, simply do eg: state.whatever
4. If you want to update a state variable, use the dispatch function, eg: dispatch({ type: "SET_LOGGED_IN" }); //set logged in to true

*/
export const initialState = {
  isLoggedIn: false,
};
/*
This is the Reducer which takes in the previous state and an action, typically a string eg: "SET_LOGGED_IN".
Using the function dispatch({ type: "SET_LOGGED_IN" }), in step 4 would come here to update the state. 
As you can see, the type: parameter corrisponds to cases in the switch case.
...state is called a spread operator, it in essense ensures that the prev state is preserved and any modifications afterwards are done to the 
prev state alone.
*/
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
    default:
      return state;
  }
};
