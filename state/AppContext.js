import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
} from "react";
import { storageReducer, initialState } from "./Reducer";
//local storage example
//https://stackoverflow.com/questions/64547044/persist-localstorage-with-usereducer
//useReducer exmaple
//https://medium.com/geekculture/how-to-use-context-usereducer-and-localstorage-in-next-js-cc7bc925d3f2

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(storageReducer, initialState);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("state"))) {
      //checking if there already is a state in localstorage
      dispatch({
        type: "INIT_STORED",
        data: JSON.parse(localStorage.getItem("state")),
        //if yes, update the current state with the stored one
      });
    }
  }, []);
  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem("state", JSON.stringify(state));
      //create and/or set a new localstorage variable called "state"
    }
  }, [state]);
  const stateValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return (
    <AppContext.Provider value={stateValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
