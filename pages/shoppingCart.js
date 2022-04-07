import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";
import { Input, Spacer, Card, Button, Text, Row } from "@nextui-org/react";
import NavBar from "../components/NavBar";
export default function ShoppingCart() {
  const { state, dispatch } = useAppContext();
  const [cartItems, setCartItems] = useState(state.cart);
  const router = useRouter();
   
  /*
    increase/Decrease * (item,index)
    Description: updates state when the selected property is changed. All the functions with signature increase or decrease work in the same way
    Parameters: 
      item - an object containing product data
      index - the position of the item in the cart. Used when updating elements in the card
  */
  function increaseQuantity(item, index) {
    console.log(item);

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
  /*
    deleteItem(index)
    Description: deletes and updates the cart
    Parameters: 
      index - the position of the item in the cart
  */
  function deleteItem(index) {
    let tempState = [...state.cart];
    tempState.splice(index, 1);
    dispatch({ type: "CART_QUANT_CHANGE", data: tempState });
  }
  /*
    displayTotal()
    Description: renders the little card below the cart. It gets the cart and computes a total before and after tax based on all the items
    in the cart. Its then put inside a card and rendered
  */

  function displayTotal() {
    if (state.cart.length == 0) {
      return <p>Add some Items!</p>;
    } else {
      var Subtotal = 0;
      state.cart.map((product, index) => {
        Subtotal = Subtotal + product.item.price * product.orderQuant;
      });
      var hst = Subtotal * 0.15;
      return (
        <Card bordered shadow={false} hoverable css={{ mw: "400px" }}>
          <Card.Body css={{ p: 0 }}>
            <Row wrap="wrap" justify="space-between">
              <Text b>Subtotal: ${Subtotal.toFixed(2)}</Text>
              <Text b>HST: ${hst.toFixed(2)}</Text>
              <Row b>Shipping $4.99</Row>
              <Row>
                {" "}
                <Text b>Total: ${(Subtotal + hst + 4.99).toFixed(2)}</Text>
              </Row>
              <Row>
                <Button onClick={() => router.push(`/checkout?total=${Subtotal}`)}>
                  Checkout
                </Button>
              </Row>
            </Row>
          </Card.Body>
        </Card>
      );
    }
  }

  /*
    this useEffect ensures that the cart is always up to date on screen
  */
  useEffect(() => {
    setCartItems(state.cart);
  }, [state.cart]);
  return (
    <div>
      <NavBar />
      <h1>Shopping Cart</h1>

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

                  <Row>
                    <Text b> Color(s): {product.item.color}</Text>
                  </Row>
                  <Row>
                    <Text b>
                      {" "}
                      # of {product.item.productName} in cart:{" "}
                      {product.orderQuant}
                    </Text>
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
          </div>
        ))
      )}
      {displayTotal()}
    </div>
  );
}
