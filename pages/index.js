import { useState, useContext, useEffect } from "react";
import { useAppContext } from "../State/AppContext";
import LandingPage from "./LandingPage";
export default function Home() {
  const { state, dispatch } = useAppContext();
  return (
    <div>
      <LandingPage />
    </div>
  );
}
