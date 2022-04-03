import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";
import { Input, Spacer, Card, Button, Text, Row } from "@nextui-org/react";
import NavBar from "../components/NavBar";
// import DatePicker from 'react-date-picker'

export default function Checkout() {
  const router = useRouter();
  //shipping information
  const [username, setUsername] = useState("");
  const [billing, setAddress] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCSV, setCardCSV] = useState("");

  //billing information
  const [usernameB, setBUsername] = useState("");
  const [billingB, setBAddress] = useState("");

  async function checkout() {
    if (
      username == null ||
      billing == null ||
      cardNum == null ||
      cardExp == null || 
      cardCSV == null ||
      usernameB == null ||
      billingB == null
    ) {
      alert("Field cannot be empty")
      console.log("Field cannot be empty");
    }
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
        <Card bordered shadow={false} css={{ mw: "300px" }}>
          <Card.Body css={{ p: 0 }}>
            <center>
              <h3>Shipping Information</h3>
            </center>
            <Row wrap="wrap" justify="space-between">
              <Row>
                <Input
                  placeholder="Full Name"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Row>
              <Row>
                <Input
                  placeholder="Shipping Address"
                  onChange={(e) => setAddress(e.target.value)}
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
              <Button onClick={() => checkout()}>Checkout</Button>
            </Row>
          </Card.Footer>
        </Card>
      </center>
    </div>
  );
}
