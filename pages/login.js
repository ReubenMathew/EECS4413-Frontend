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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userName: username,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    //https://eecs4413-backend-production.up.railway.app/api/authenticate
    const token = await fetch(
      "`https://eecs4413-backend-production.up.railway.app//api/authenticate",
      requestOptions
    ).then((response) => {
      return response.json();
    });

    if (token.token != undefined) {
      console.log(token);
      //we got a token back so the auth was sucsessful
      if (token.role === "ADMIN") {
        dispatch({ type: "SET_IS_ADMIN" });
      }
      dispatch({
        type: "SET_LOGGED_IN",
      });
      dispatch({
        type: "SET_TOKEN",
        data: token.token,
      });
      setEmail("");
      setPassword("");
      setUsername("");
      router.push("/catalog");
    } else {
      alert("Incorrect Credentials!");
    }
  }
  return (
    <div>
      <NavBar />
      <div>
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
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
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
