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
  Pagination,
} from "@nextui-org/react";
import NavBar from "../components/NavBar";
import { data } from "../state/dummyData";
export default function Catalog({ data }) {
  const { state, dispatch } = useAppContext();
  const [productName, setProductName] = useState(state.searchParams.brand);
  const [productBrand, setProductBrand] = useState(
    state.searchParams.productName
  );
  const [productCategory, setProductCategory] = useState("");
  const [catalogData, setCatalogData] = useState(data);
  const [pageNum, setPageNum] = useState(1); //initially on page 1
  const router = useRouter();
  var itemsPerPage = 10;
  var numOfPages = data.length / itemsPerPage; // just for now, display 10 items per page

  function handleItemClick(item) {
    //console.log(item);
    router.push(
      `/productDetails?id=${item.id}&productName=${item.productName}`
    );
  }
  function getData() {
    console.log("Get data...");
    if (productName == "" && productBrand == "" && productCategory == "") {
      //no search parameters selected, load all the data in the catalog
      console.log("Display all data");
      dispatch({
        type: "SET_CATALOG_PRODUCTS",
        data: data,
      });
      const params = {
        productName: "",
        brand: "",
        category: "",
      };
      dispatch({ type: "SET_SEARCH_PARAMS", data: params });
    } else {
      //we have search parameters, so query the db with those parameters
      console.log("Filtered data");
      const params = {
        productName: productName,
        brand: productBrand,
        category: "",
      };
      dispatch({ type: "SET_SEARCH_PARAMS", data: params });
      dispatch({
        type: "SET_CATALOG_PRODUCTS",
        data: [
          {
            id: 49,
            productName: "Sharp Mangle (machine)",
            category: "Sharp",
            description: "Its a Mangle (machine).",
            color: "Blue",
            price: 30,
            quantity: 20,
          },
        ],
      });
    }
  }
  function handlePageChange(e) {
    console.log("changed page");
    setPageNum(e);
    console.log(e);
  }
  useEffect(() => {
    console.log("search params updated");
    setProductName(productName);
    setProductBrand(productBrand);
    setProductCategory(productCategory);
  }, [
    state.searchParams.productName,
    state.searchParams.productBrand,
    state.searchParams.productCategory,
  ]);
  useEffect(() => {
    console.log("product info updated");
    setCatalogData(state.catalogData); //make sure this data is up to date after the page renders
  }, [state.catalogData]);
  return (
    <div cla>
      <NavBar />
      <div>
        <p>Leave filters blank to get all items</p>
        <div className="flex justify-center">
          <Spacer y={2.5} />
          <Input
            clearable
            bordered
            labelPlaceholder="Product Name"
            initialValue=""
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
          />
          <Spacer y={2.5} />
          <Input
            clearable
            bordered
            labelPlaceholder="Brand"
            initialValue=""
            onChange={(e) => setProductBrand(e.target.value)}
            value={productBrand}
          />
          <Button onClick={() => getData()}>Search</Button>
        </div>

        <div className="flex flex-wrap justify-center ">
          {catalogData == undefined ? (
            <p>Loading data</p>
          ) : (
            catalogData
              .slice((pageNum - 1) * itemsPerPage, pageNum * itemsPerPage)
              .map((item, index) => (
                <Card
                  key={index}
                  bordered
                  shadow={false}
                  hoverable
                  css={{ mw: "400px" }}
                  onClick={() => handleItemClick(item)}
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
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await fetch(
    "https://eecs4413-backend-production.up.railway.app/api/products",
    { method: "GET" }
  ).then((res) => {
    return res.json();
  });
  //console.log(data);

  return { props: { data } };
}
