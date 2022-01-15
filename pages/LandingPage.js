import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import Login from "../Components/Login";
import Registration from "../Components/Registration";
import { useAppContext } from "../State/AppContext";

export default function LandingPage() {
  const { state, dispatch } = useAppContext();
  const [signUp, setSignUp] = useState(false);
  const router = useRouter();

  function toCatalog() {
    dispatch({ type: "SET_LOGGED_IN" }); //set logged in to true
    router.push("/Catalog");
  }
  return (
    <div>
      <p>Welcome to our app!</p>
      <p>Shop Cart</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => toCatalog()}
      >
        Continue to app
      </button>
    </div>
  );
}
