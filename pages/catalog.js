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
export default function Catalog() {
  const { state, dispatch } = useAppContext();
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [dummyData, setDummyData] = useState(state.dummyData);
  const [pageNum, setPageNum] = useState(1); //initially on page 1
  const router = useRouter();
  var itemsPerPage = 10;
  var numOfPages = state.dummyData.length / itemsPerPage; // just for now, display 10 items per page
  function handleItemClick(item) {
    //console.log(item);
    router.push(
      `/ProductDetails?id=${item.id}&productName=${item.productName}`
    );
  }
  function getData() {
    console.log("Get data...");
    console.log(productName + " " + productBrand);
  }
  function handlePageChange(e) {
    console.log("changed page");
    setPageNum(e);
    console.log(e);
  }
  useEffect(() => {
    setDummyData(dummyData); //make sure this data is up to date after the page renders
  }, [state.dummyData]);
  return (
    <div cla>
      <NavBar />
      <div>
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
          {dummyData == undefined ? (
            <p>Loading data</p>
          ) : (
            dummyData
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
