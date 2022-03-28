import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

import {
  Input,
  Spacer,
  Card,
  Button,
  Text,
  Row,
  Pagination,
} from "@nextui-org/react";
export default function UserCard() {
  function handleUserDelete(user, index) {}
  function handleUserPromote(user, index) {}
  function handleUserDemote(user, index) {}
  const dummyUsers = [
    {
      name: "Frank",
      username: "FrankL",
      email: "Frank@gmail.com",
      role: "user",
    },
    {
      name: "Frank",
      username: "FrankL",
      email: "Frank@gmail.com",
      role: "user",
    },
    {
      name: "Frank",
      username: "FrankL",
      email: "Frank@gmail.com",
      role: "user",
    },
  ];
  return (
    <div>
      <Button>Get Users</Button>
      {dummyUsers.map((user, index) => (
        <Card
          key={index}
          bordered
          shadow={false}
          hoverable
          css={{ mw: "620px" }}
        >
          <Card.Body css={{ p: 0 }}></Card.Body>
          <Card.Footer>
            <Row wrap="wrap" justify="space-between">
              <Text b>{user.name}</Text>
              <Text b>{user.email}</Text>
              <Text css={{ color: "$accents4", fontWeight: "$semibold" }}>
                {user.role}
              </Text>
              <Row>
                <Button onClick={() => handleUserDelete(item, index)}>
                  Delete
                </Button>
                <Button onClick={() => handleUserPromote(item, index)}>
                  Promote
                </Button>
                <Button onClick={() => handleUserPromote(item, index)}>
                  Demote
                </Button>
              </Row>
            </Row>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}
