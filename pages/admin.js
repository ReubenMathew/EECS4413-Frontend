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
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import AddProduct from "../components/AddProduct";
import UserCard from "../components/UserCard";
// from https://mui.com/components/drawers/
export default function admin() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const [pageNum, setPageNum] = useState(1); //initially on page 1
  const [adminItems, setAdminItems] = useState([]);
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [drawerState, setDrawerState] = useState(false);
  const [actionState, setActionState] = useState("Manage Products"); //holds which action the admin wants to do, Manage products, Manage users, see analytics

  var itemsPerPage = 10;
  var numOfPages = Math.ceil(adminItems.length / itemsPerPage); // just for now, display 10 items per page

  /*
  handlePageChange(event)
  Description: takes an event from the pagination component and sets the correct current page
  */
  function handlePageChange(e) {
    setPageNum(e);
  }
  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={() => setDrawerState(false)}
      onKeyDown={() => setDrawerState(false)}
    >
      <List>
        {["Remove Products", "Add Products", "Manage Users", "Analytics"].map(
          (text, index) => (
            <ListItem button key={text} onClick={() => setActionState(text)}>
              <ListItemIcon>
                <p>#</p>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  async function handleItemDelete(item, index) {
    let tempState = [...adminItems];
    tempState.splice(index, 1);

    const data = fetch(
      `https://eecs4413-backend-production.up.railway.app/api/products/${item.id}`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      return response.json();
    });
    setAdminItems(tempState);
    console.log("After deletion");
    console.log(adminItems);
    console.log(data);
  }
  async function getData() {
    console.log("Get data...");

    /*
      Options is a string which contains the parameters needed for the request
      */
    let options = "";
    if (productBrand != "") {
      options = options.concat("&brand=" + productBrand);
    }
    if (productCategory != "") {
      options = options.concat("&category=" + productBrand);
      options.concat(productCategory);
    }
    if (productName != "") {
      options = options.concat("&name=" + productName);
    }

    const data = await fetch(
      `https://eecs4413-backend-production.up.railway.app/api/products?${options}`,
      { method: "GET", redirect: "follow" }
    ).then((response) => response.json());

    console.log(data);
    setAdminItems(data);
  }
  function adminAction() {
    if (actionState === "Remove Products") {
      console.log("Remove Products");
      return (
        <div>
          <SearchBar
            name={productName}
            brand={productBrand}
            category={productCategory}
            setName={setProductName}
            setBrand={setProductBrand}
            setCategory={setProductCategory}
            data={getData}
          />

          <div className="flex flex-wrap justify-center ">
            {adminItems == undefined ? (
              <p>Loading data</p>
            ) : (
              adminItems
                .slice((pageNum - 1) * itemsPerPage, pageNum * itemsPerPage)
                .map((item, index) => (
                  <Card
                    key={index}
                    bordered
                    shadow={false}
                    hoverable
                    css={{ mw: "400px" }}
                  >
                    <Card.Body css={{ p: 0 }}>
                      <Card.Image
                        objectFit="cover"
                        src="/placeholder-image.png"
                        width="100%"
                        height={140}
                        alt="default"
                      />
                    </Card.Body>
                    <Card.Footer>
                      <Row wrap="wrap" justify="space-between">
                        <Text b>{item.productName}</Text>
                        <Text b>${item.price}</Text>
                        <Text
                          css={{ color: "$accents4", fontWeight: "$semibold" }}
                        >
                          {item.quantity} Left
                        </Text>
                        <Row>
                          <Button onClick={() => handleItemDelete(item, index)}>
                            Delete
                          </Button>
                        </Row>
                      </Row>
                    </Card.Footer>
                  </Card>
                ))
            )}
          </div>
          <div className="flex justify-center">
            <Pagination
              onChange={(e) => handlePageChange(e)}
              total={numOfPages}
              initialPage={1}
            />
          </div>
        </div>
      );
    } else if (actionState === "Add Products") {
      return (
        <div className="flex justify-center">
          <AddProduct />
        </div>
      );
    } else if (actionState === "Manage Users") {
      return (
        <div className="flex space-x-2">
          <UserCard />
        </div>
      );
    } else if (actionState === "Analytics") {
      return (
        <div className="flex space-x-2">
          <p>Analytics</p>
        </div>
      );
    } else {
      return (
        <div className="flex space-x-2">
          <p>Select an action from the drawer!</p>
        </div>
      );
    }
  }
  return (
    <>
      <NavBar />
      <div>
        <div>
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={() => setDrawerState(true)}>
                Admin Actions
              </Button>
              <Drawer
                anchor={anchor}
                open={drawerState}
                onClose={() => setDrawerState(false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
        {adminAction()}
      </div>
    </>
  );
}
