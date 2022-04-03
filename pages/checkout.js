import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";
import { Input, Spacer, Card, Button, Text, Row } from "@nextui-org/react";
import NavBar from "../components/NavBar";

export default function Checkout() {
  const router = useRouter();

  return (
    <div>
      <NavBar />
      <h1>Checkout</h1>
      <div>
        <Button onClick={() => router.push("/login")}>Login</Button>
        <Button onClick={() => router.push("/Registration")}>Register</Button>
      </div>
      <Card bordered shadow={false} css={{ mw: "300px" }}>
        <Card.Body css={{ p: 0 }}>
          <Row wrap="wrap" justify="space-between">
            <Row>
              <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Row>
            <Row>
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Row>
            <Row>
              <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Row>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Button onClick={() => handleRegister()}>Register</Button>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
}
