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
  const [usage, setUsage] = useState("");
  const [monthly, setMonthly] = useState({});
  const router = useRouter();
  async function getUsage() {
    try {
      const data = await fetch(
        `https://shopcart-backend.fly.dev/api/analytics/website/usage`,
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
      console.log(data);
      if (data.cart != undefined) {
        console.log("set usage");
        const usageString =
          "Cart Hits: " +
          data.cart +
          " Purchase Hits:" +
          data.purchase +
          " CatalogViews" +
          data.view;
        setUsage(usageString);
      }
    } catch (error) {
      return (
        <div>
          <p>Error!</p>
        </div>
      );
    }
  }
  async function getMonthlyItems() {
    const data = await fetch(
      `https://shopcart-backend.fly.dev/api/analytics/monthly/items`,
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
      setMonthly(data);
    } else {
      console.log("ERROR!");
    }
  }
  useEffect(() => {
    setMonthly(monthly);
    console.log(monthly);
  }, [monthly]);
  return (
    <div>
      <div>
        <div>
          <p>Usage: {usage}</p>
        </div>
        <div>
          <p>Monthly Items sold</p>
          {monthly == undefined ? (
            <p>Loading</p>
          ) : (
            <div>
              <p>January: {monthly.January}</p>
              <p>Febuary: {monthly.February}</p>
              <p>March: {monthly.March}</p>
              <p>April: {monthly.April}</p>
              <p>May: {monthly.May}</p>
              <p>June: {monthly.June}</p>
              <p>July: {monthly.July}</p>
              <p>August: {monthly.August}</p>
              <p>September: {monthly.September}</p>
              <p>October: {monthly.October}</p>
              <p>November: {monthly.November}</p>
              <p>December: {monthly.December}</p>
            </div>
          )}
        </div>
      </div>
      <Button onClick={() => getMonthlyItems()}>Get Monthly Items sold</Button>
      <Button onClick={() => getUsage()}>Get Usage</Button>
    </div>
  );
}
