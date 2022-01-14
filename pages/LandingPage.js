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
    router.push("/Catalog");
  }
  return (
    <div>
      {state.isLoggedIn == true ? (
        toCatalog()
      ) : signUp == false ? (
        <Login />
      ) : (
        <Registration />
      )}

      {signUp == false ? (
        <div>
          <p>First time using Spenser? Make a profile here!</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSignUp(true)}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div>
          <p>Already have a profile for Spenser? Click here! </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSignUp(false)}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
