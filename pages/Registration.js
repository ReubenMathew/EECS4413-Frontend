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

export default function Registration() {
  const { state, dispatch } = useAppContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleRegister() {
    console.log(email + " " + password + " " + username);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      userName: username,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const newUser = await fetch(
      "https://eecs4413-backend-production.up.railway.app/api/register",
      requestOptions
    ).then((response) => {
      return response.json();
    });
    /*
      Check if the new user has returned some data. In this case look for a returned email
    */
    if (newUser.email != undefined) {
      console.log(newUser);

      //reset the form fields
      setEmail("");
      setPassword("");
      setUsername("");
      //bring the user to the login page to now login with their new account
      router.push("/login");
    } else if (newUser.error != undefined) {
      // an error has occured, prob duplicate registration
      console.log("User already exists!");
    }

    // dispatch({
    //   type: "SET_LOGGED_IN",
    // });
  }
  return (
    <div>
      <NavBar />
      <div>
        <h1>Register</h1>
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
    </div>
  );
}
