import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";
import { Input, Spacer, Card, Button, Text, Row } from "@nextui-org/react";
import NavBar from "../components/NavBar";
export default function ShoppingCart() {
  const { state, dispatch } = useAppContext();
  console.log(state);
  return (
    <div>
      <p>shoppingCart</p>
    </div>
  );
}
