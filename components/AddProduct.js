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
  Textarea,
} from "@nextui-org/react";

export default function AddProduct() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [colour, setColour] = useState("");

  const [URL, setURL] = useState(null);
  async function addItem() {

    const data = fetch("https://shopcart-backend.fly.dev/api/products", {
      method: "POST",
      body: JSON.stringify({
        productName: name,
        category: category,
        brand: brand,
        description: description,
        color: colour,
        price: price,

        image_url: URL,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
      },
      redirect: "follow",
    }).then((response) => {

      return response.json();
    });
    console.log("test post endpoint");
    console.log(data);
  }
  return (
    <div>
      <Card bordered shadow={false} css={{ mw: "400px" }}>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            objectFit="cover"
            src="/placeholder-image.png"
            width="100%"
            height={140}
            alt="default"
          />
          <Row>
            <div className="space-y-2">
              <Input
                placeholder="Product Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </Row>
          <Row>
            <div className="space-y-2">
              <Input
                placeholder="Brand"
                onChange={(e) => setBrand(e.target.value)}
              />
              <Input
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </Row>
          <Row>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.valueAsNumber)}
              />
              <Input
                placeholder="Colour"
                onChange={(e) => setColour(e.target.value)}
              />
            </div>
          </Row>
          <Row>
            <div className="space-y-2 w-full">
              <Input
                fullWidth={true}
                placeholder="Image URL"
                onChange={(e) => setURL(e.target.value)}
              />
            </div>
          </Row>
          <Row>
            <Textarea
              fullWidth={true}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Row>

          <Row>
            <Button onClick={() => addItem()}>Add Product</Button>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
