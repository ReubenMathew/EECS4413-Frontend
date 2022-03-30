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
export default function Analytics() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  async function getUsage() {
    const data = fetch(
      `https://eecs4413-backend-production.up.railway.app/api/report/website/usage`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        redirect: "follow",
      }
    ).then((response) => {
      return response.json();
    });
    if (data != undefined) {
      return (
        <div>
          <p>View Hits: {data.view} </p>
          <p>Cart Hits: {data.cart} </p>
          <p>Purchase Hits: {data.purchase} </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Error!</p>
        </div>
      );
    }
  }
  async function getMonthlyItems() {
    const data = fetch(
      `https://eecs4413-backend-production.up.railway.app/api/report/monthly/items`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        redirect: "follow",
      }
    ).then((response) => {
      return response.json();
    });
    if (data != undefined) {
      return (
        <div>
          <p>items</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Error!</p>
        </div>
      );
    }
  }

  async function displayAnalytics(type) {
    if (type === "monthly") {
      getMonthlyItems();
    } else if (type === "usage") {
      getUsage();
    } else {
      return (
        <div>
          <p>Choose an alalytic!</p>
        </div>
      );
    }
  }
  return (
    <div>
      <Button onClick={() => displayAnalytics("monthly")}>
        Get Monthly Items sold
      </Button>
      <Button onClick={() => displayAnalytics("usage")}>Get Usage</Button>
    </div>
  );
}
