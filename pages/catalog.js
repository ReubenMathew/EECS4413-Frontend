import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";
import verify from "../Form_Verification/verify";
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
export default function Catalog({ data }) {
  const { state, dispatch } = useAppContext();
  const [productName, setProductName] = useState(
    state.searchParams.productName
  );
  const [productBrand, setProductBrand] = useState(state.searchParams.brand);
  const [productCategory, setProductCategory] = useState(
    state.searchParams.category
  );
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
    /*Index is used to index the whole list of items, but the index returned from the click is 
    is actually the index in the spliced list.
    
    eg if you are on page 1, then the index in the signature is fine
    */
    const realIndex = (pageNum - 1) * itemsPerPage + index;
    console.log(realIndex);

    router.push(
      `/productDetails?index=${realIndex}&id=${item.id}&productName=${item.productName}`
    );
  }

  /*
    getData()
    Description: handles the search bar. It takes in the values from each input and generates query parameters.
    If nothing was entered in the fields and you clicked enter, you would get all data in the db.
  */
  async function getData() {
    const verifyData = [
      { param: productName },
      { param: productBrand },
      { param: productCategory },
    ];
    const check = verify(verifyData);
    if (check) {
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
          options = options.concat("&category=" + productCategory);
        }
        if (productName != "") {
          options = options.concat("&name=" + productName);
        }
        console.log(options);

        const data = await fetch(
          `https://shopcart-backend.fly.dev/api/products?${options}`,
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
    } else {
      setProductBrand("");
      setProductCategory("");
      setProductName("");
      alert("Nice try sql injector!");
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
    <div>
      <NavBar />
      <div>
        {/* <Button onClick={() => testAddData()}>Test</Button> */}
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
  const data = await fetch("https://shopcart-backend.fly.dev/api/products", {
    method: "GET",
  }).then((res) => {
    return res.json();
  });
  //console.log(data);

  //whenever someone visits this page, log it
  const visit = await fetch(
    `https://shopcart-backend.fly.dev/api/analytics/website/usage`,
    {
      method: "POST",
      body: JSON.stringify({
        ip_address: "1.27.0.0.0",
        event: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    }
  );
  return { props: { data } };
}
