import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";
import { hash, compare } from "bcryptjs";
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

export default function Registration() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  function handleRegister() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: "phones@gmail.com",
      userName: "Steve",
      password: "password",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://eecs4413-backend-eecs4413-backend-pr-19.up.railway.app/api/register",
      requestOptions
    ).then((response) => {
      return response.json();
    });

    // dispatch({
    //   type: "SET_LOGGED_IN",
    // });
    // router.push("/catalog");
  }
  return (
    <div>
      <NavBar />
      <div>
        <Card bordered shadow={false} css={{ mw: "300px" }}>
          <Card.Body css={{ p: 0 }}>
            <Row wrap="wrap" justify="space-between">
              <Row>
                <Input placeholder="First Name" />
              </Row>
              <Row>
                <Input placeholder="Last name" />
              </Row>
              <Row>
                <Input placeholder="Username" />
              </Row>
              <Row>
                <Input placeholder="Password" />
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
    </div>
  );
}
