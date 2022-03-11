import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";
import { Input, Spacer, Card, Button, Text, Row } from "@nextui-org/react";
import NavBar from "../components/NavBar";
export default function ShoppingCart() {
  const { state, dispatch } = useAppContext();
  const [cartItems, setCartItems] = useState(state.cart);

  function increaseQuantity(item, index) {
    console.log("increase quant");
    let tempState = [...state.cart];
    let tempElement = { ...tempState[index] };
    tempElement.orderQuant = tempElement.orderQuant + 1;
    tempState[index] = tempElement;
    console.log(tempState);
    dispatch({ type: "CART_QUANT_CHANGE", data: tempState });
  }
  function decreaseQuantity(item, index) {
    console.log("decrease quant");
    let tempState = [...state.cart];
    let tempElement = { ...tempState[index] };
    if (tempElement.orderQuant >= 1) {
      tempElement.orderQuant = tempElement.orderQuant - 1;
      tempState[index] = tempElement;
      console.log(tempState);
      dispatch({ type: "CART_QUANT_CHANGE", data: tempState });
    }
  }
  function deleteItem(index) {
    let tempState = [...state.cart];
    tempState.splice(index, 1);
    dispatch({ type: "CART_QUANT_CHANGE", data: tempState });
  }

  useEffect(() => {
    setCartItems(state.cart);
  }, [state.cart]);
  return (
    <div>
      <NavBar />
      <p>shoppingCart</p>

      {cartItems.length == 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map((product, index) => (
          <div key={index} className="flex">
            <Card bordered shadow={false} hoverable css={{ mw: "400px" }}>
              <Card.Body css={{ p: 0 }}>
                <Row wrap="wrap" justify="space-between">
                  <Text b>{product.item.productName}</Text>
                  <Text b>${product.item.price}</Text>
                  <Text css={{ color: "$accents4", fontWeight: "$semibold" }}>
                    {product.item.quantity} Left
                  </Text>
                  <Row>
                    <Text b> Color(s): {product.item.color}</Text>
                  </Row>
                  <Row>
                    <Button
                      onClick={() => increaseQuantity(product.item, index)}
                    >
                      Add item
                    </Button>
                    <Button
                      onClick={() => decreaseQuantity(product.item, index)}
                    >
                      Remove Item
                    </Button>
                  </Row>
                  <Row>
                    <Button onClick={() => deleteItem(index)}>
                      Delete from cart
                    </Button>
                  </Row>
                </Row>
              </Card.Body>
            </Card>
            <p># of items in cart: {product.orderQuant}</p>
          </div>
        ))
      )}
    </div>
  );
}
