import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";
import {
  Input,
  Spacer,
  Card,
  Button,
  Text,
  Row,
  Textarea,
} from "@nextui-org/react";
import NavBar from "../components/NavBar";

export default function Login() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  function handleLogin() {
    dispatch({
      type: "SET_LOGGED_IN",
    });
    router.push("/catalog");
  }
  return (
    <div>
      <NavBar />
      <div>
        <Card bordered shadow={false} css={{ mw: "300px" }}>
          <Card.Body css={{ p: 0 }}>
            <Row wrap="wrap" justify="space-between">
              <Row>
                <Input placeholder="Username" />
              </Row>
              <Row>
                <Input placeholder="Username" />
              </Row>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Button onClick={() => handleLogin()}>Login</Button>
            </Row>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
