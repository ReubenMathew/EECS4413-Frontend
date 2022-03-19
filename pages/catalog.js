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
export default function Catalog({ data }) {
  const { state, dispatch } = useAppContext();
  const [productName, setProductName] = useState(
    state.searchParams.productName
  );
  const [productBrand, setProductBrand] = useState(state.searchParams.brand);
  const [productCategory, setProductCategory] = useState("");
  const [catalogData, setCatalogData] = useState(data);

  const [pageNum, setPageNum] = useState(1); //initially on page 1
  const router = useRouter();

  /*
    Use these values to change the number of items per page and the number of pages in the pagintion
  */
  var itemsPerPage = 10;
  var numOfPages = Math.ceil(state.catalogData.length / itemsPerPage); // just for now, display 10 items per page

  /*
    handleItemClick()
    Description: handles when a user clicks an item in the catalog. It routes the user to the productDetails page where you can see more details about the product
    Params:
    item - an object with product data
    index - the index of the item in the response array
  */
  function handleItemClick(item, index) {
    router.push(`/productDetails?id=${index}&productName=${item.productName}`);
  }

  /*
    testAddData()
    Description: A function that tests the POST functionality
  */
  // function testAddData() {
  //   const data = fetch(
  //     "https://eecs4413-backend-eecs4413-backend-pr-19.up.railway.app/api/products",
  //     {
  //       method: "POST",

  //       body: JSON.stringify({
  //         productName: "KitchenAid HVAC",
  //         category: "KitchenAid",
  //         brand: "KitchenAid",
  //         description: "Its a HVAC.",
  //         color: "Purple",
  //         price: 104,
  //         quantity: 15,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       redirect: "follow",
  //     }
  //   ).then((response) => {
  //     return response.json();
  //   });
  //   console.log("test post endpoint");
  //   console.log(data);
  // }

  /*
    getData()
    Description: handles the search bar. It takes in the values from each input and generates query parameters.
    If nothing was entered in the fields and you clicked enter, you would get all data in the db.
  */
  async function getData() {
    console.log("Get data...");
    if (productName == "" && productBrand == "" && productCategory == "") {
      //no search parameters selected, load all the data in the catalog
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
      /*
        Save the current search params to state so that when we change
        pages they are still there
      */
      const params = {
        productName: productName,
        brand: productBrand,
        category: "",
      };
      dispatch({ type: "SET_SEARCH_PARAMS", data: params });

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
        `https://eecs4413-backend-eecs4413-backend-pr-19.up.railway.app/api/products?${options}`,
        { method: "GET", redirect: "follow" }
      ).then((response) => response.json());
      /*
      Save the queried catalog products to state so that they are still
      there when we change pages.
      */
      dispatch({
        type: "SET_CATALOG_PRODUCTS",
        data: data,
      });
    }
  }
  /*
  handlePageChange(event)
  Description: takes an event from the pagination component and sets the correct current page
  */
  function handlePageChange(e) {
    setPageNum(e);
  }

  /*
    This useEffect ensures that whenever search parameters are changed, they are updated properly in page
  */
  useEffect(() => {
    setProductName(productName);
    setProductBrand(productBrand);
    setProductCategory(productCategory);
  }, [
    state.searchParams.productName,
    state.searchParams.productBrand,
    state.searchParams.productCategory,
  ]);
  /*
    This useEffect ensures that whenever catalog data changes, its updated properly in page
  */

  useEffect(() => {
    setCatalogData(state.catalogData); //make sure this data is up to date after the page renders
  }, [state.catalogData]);

  return (
    <div cla>
      <NavBar />
      <div>
        <p>Leave filters blank to get all items</p>
        {/* <Button onClick={() => testAddData()}>Test</Button> */}

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
                  onClick={() => handleItemClick(item, index)}
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
    "https://eecs4413-backend-eecs4413-backend-pr-19.up.railway.app/api/products",
    { method: "GET" }
  ).then((res) => {
    return res.json();
  });
  //console.log(data);

  return { props: { data } };
}
