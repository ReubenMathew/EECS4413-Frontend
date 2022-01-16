import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";

export default function Catalog() {
  const { state, dispatch } = useAppContext();

  return (
    <div>
      <p>This is the Catalog</p>
      <button onClick={() => dispatch({ type: "SET_LOGGED_IN" })}>
        Test Login
      </button>
    </div>
  );
}
