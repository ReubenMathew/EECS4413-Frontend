import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";
import { Button, Input, Spacer, Card } from "@nextui-org/react";
import NavBar from "../components/NavBar";

export default function productDetails({ data }) {
  const { state, dispatch } = useAppContext();
  const [productDetails, setProductDetails] = useState(
    state.dummyData[data.id]
  );
  const router = useRouter();
  console.log(productDetails);
  return (
    <div>
      <NavBar />

      <p>Product Details </p>
      <p>{productDetails.productName}</p>
      <p>Category: {productDetails.category}</p>
      <p>Description: {productDetails.description}</p>
      <p>Colors: {productDetails.color}</p>
      <p>${productDetails.price}</p>
      <p>{productDetails.quantity} Left</p>
      <Button
        onClick={() => dispatch({ type: "ADD_TO_CART", data: productDetails })}
      >
        Add to cart
      </Button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { productName } = context.query;
  const data = { id: id, productName: productName };
  return { props: { data } };
}
