import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";
import { Input, Spacer, Card, Button, Text, Row } from "@nextui-org/react";
import NavBar from "../components/NavBar";

// import DatePicker from 'react-date-picker'

export default function Checkout({ total }) {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const [active, setActive] = useState("true");

  //shipping information
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [shipping, setAddress] = useState("");
  const [country, setCountry] = useState("");

  //billing information
  const [usernameB, setBUsername] = useState("");
  const [billing, setBAddress] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCSV, setCardCSV] = useState("");

  //processed order that gets sent when confirm is clicked
  const [order, setOrder] = useState(undefined);
  async function checkout() {
    //checking for empty fields

    if (
      fname == "" ||
      lname == "" ||
      shipping == "" ||
      country == "" ||
      cardNum == "" ||
      cardExp == "" ||
      cardCSV == "" ||
      usernameB == "" ||
      billing == ""
    ) {
      alert("Fields cannot be empty");
    } else {
      var product_ids = [];
      state.cart.map((cart) => {
        product_ids.push(cart.item.id);
      });

      var orderData = JSON.stringify({
        total: total,
        first_name: fname,
        last_name: lname,
        country: country,
        product_ids,
      });
      //console.log(order);
      const processedOrder = await fetch(
        "https://shopcart-backend.fly.dev/api/orders/process",
        {
          method: "POST",
          body: orderData,
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      ).then((response) => {
        return response.json();
      });

      /*do a check if the order was processed correctly. When the backend is fixed,
      instead of checking for undefined, check the response for data.
      */
      if (processedOrder.id != undefined) {
        setOrder(processedOrder);
        console.log("Processing Data");
        console.log(processedOrder);
        //sets the verify card to visible
        setActive("false");
      }
    }
  }
  async function confirmPayment() {
    var product_ids = [];
    state.cart.map((cart) => {
      product_ids.push(cart.item.id);
    });

    //create the same body but add the order id and status from the response from the first call
    var orderData = JSON.stringify({
      total: total,
      first_name: fname,
      last_name: lname,
      country: country,
      product_ids,
      id: order.id,
      status: order.status,
    });
    console.log(orderData);
    const paidOrder = await fetch(
      "https://shopcart-backend.fly.dev/api/orders/submit",
      {
        method: "PUT",
        body: orderData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        redirect: "follow",
      }
    ).then((response) => {
      return response.json();
    });
    console.log("paid Order:");
    console.log(paidOrder.Order);
    // /*
    // Check that the response from the server is good, then clear the users cart and route them
    // back to the catalog. Not working atm bc of backend problemsS
    // */
    if (paidOrder.Order === "Order Successfully Completed") {
      alert("Order Successfully Completed!");
      dispatch({ type: "CLEAR_CART" });
      router.push("/catalog");
    } else {
      alert(paidOrder.Order);
    }
  }

  async function back() {
    //sets the verify card to not visible
    setActive("true");

    //shipping information
    setFname("");
    setLname("");
    setAddress("");
    setCountry("");

    //billing information
    setBUsername("");
    setBAddress("");
    setCardNum("");
    setCardExp("");
    setCardCSV("");
  }

  return (
    <div>
      <NavBar />
      <h1>Checkout</h1>
      <center>
        {" "}
        <div>
          <Button onClick={() => router.push("/login")}>Login</Button>
          <p />
          <Button onClick={() => router.push("/Registration")}>Register</Button>
        </div>
        <p />
        {active === "true" && (
          <Card bordered shadow={false} css={{ mw: "300px" }} title="shipping">
            <Card.Body css={{ p: 0 }}>
              <center>
                <h3>Shipping Information</h3>
              </center>
              <Row wrap="wrap" justify="space-between">
                <Row>
                  <Input
                    placeholder="First Name"
                    onChange={(e) => setFname(e.target.value)}
                  />
                </Row>
                <Row>
                  <Input
                    placeholder="Last Name"
                    onChange={(e) => setLname(e.target.value)}
                  />
                </Row>
                <Row>
                  <Input
                    placeholder="Shipping Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Row>
                <Row>
                  <Input
                    placeholder="Country"
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Row>
              </Row>
              <h3>
                <center>Billing Information</center>
              </h3>
              <Row wrap="wrap" justify="space-between">
                <Row>
                  <Input
                    placeholder="Full Name"
                    onChange={(e) => setBUsername(e.target.value)}
                  />
                </Row>
                <Row>
                  <Input
                    placeholder="Billing Address"
                    onChange={(e) => setBAddress(e.target.value)}
                  />
                </Row>
                <Row>
                  <Input
                    placeholder="Card Number"
                    onChange={(e) => setCardNum(e.target.value)}
                  />
                </Row>
                <Row>
                  <Input
                    placeholder="Expiry Date"
                    onChange={(e) => setCardExp(e.target.value)}
                  />
                </Row>
                <Row>
                  <Input
                    placeholder="CSV"
                    onChange={(e) => setCardCSV(e.target.value)}
                  />
                </Row>
              </Row>
            </Card.Body>
            <Card.Footer>
              <Row>
                <div>
                  <Button onClick={() => checkout()}>Checkout</Button>
                </div>
              </Row>
            </Card.Footer>
          </Card>
        )}
      </center>
      {active === "false" && (
        <center>
          <Card bordered shadow={false} css={{ mw: "300px" }} title="verify">
            <Card.Body css={{ p: 0 }}>
              <center>
                <h3>Shipping Information</h3>
              </center>
              <p>
                <b>Full Name: </b>
                {fname} {lname}
                <p />
                <b>Shipping Address: </b>
                {shipping}
                <p />
                <p />
                <b>Country: </b>
                {country}
                <p />
              </p>
              <h3>
                <center>Billing Information</center>
              </h3>
              <p>
                <b>Full Name: </b>
                {usernameB}
                <p />
                <b>Billing Address: </b>
                {billing}
                <p />
                <b>Card Number:</b> {cardNum}
                <p />
                <b>Expiry Date: </b>
                {cardExp}
                <p />
                <b> CSV: </b>
                {cardCSV}
              </p>
            </Card.Body>
            <Card.Footer>
              <Row>
                <div>
                  <Button onClick={() => confirmPayment()}>Confirm</Button>
                  <br />
                  <Button onClick={() => back()}>Back</Button>
                </div>
              </Row>
            </Card.Footer>
          </Card>
        </center>
      )}
    </div>
  );
}


export async function getServerSideProps() {
  //log that a user has visited the checkout page
  const visit = await fetch(
    `https://eecs4413-backend-production.up.railway.app/api/analytics/website/usage`,
    {
      method: "POST",
      body: JSON.stringify({
        ip_address: "1.27.0.0.0",
        event: 3,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    }
  );
  return { props: { data: "cartVisit" } };

}
