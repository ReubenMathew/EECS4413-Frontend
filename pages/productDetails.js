import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";
import { Input, Spacer, Card, Button, Text, Row } from "@nextui-org/react";
import NavBar from "../components/NavBar";

export default function ProductDetails({ data }) {
  const { state, dispatch } = useAppContext();
  const [productDetails, setProductDetails] = useState(
    state.dummyData[data.id]
  );
  const router = useRouter();
  console.log(productDetails);
  return (
    <div>
      <NavBar />
      <p>Category: {productDetails.category}</p>
      <div className="flex justify-center">
        <Card bordered shadow={false} hoverable css={{ mw: "400px" }}>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              objectFit="cover"
              src="/placeholder-image.png"
              width="100%"
              height={300}
              alt="default"
            />
            <Row wrap="wrap" justify="space-between">
              <Text b>{productDetails.productName}</Text>
              <Text b>${productDetails.price}</Text>
              <Text css={{ color: "$accents4", fontWeight: "$semibold" }}>
                {productDetails.quantity} Left
              </Text>
              <Row>
                <Text b> Color(s): {productDetails.color}</Text>
              </Row>
              <Row>
                <Text> {productDetails.description}</Text>
              </Row>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Row wrap="wrap" justify="space-between">
              <Button
                onClick={() =>
                  dispatch({ type: "ADD_TO_CART", data: productDetails })
                }
              >
                Add to cart
              </Button>
            </Row>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { productName } = context.query;
  const data = { id: id, productName: productName };
  return { props: { data } };
}
