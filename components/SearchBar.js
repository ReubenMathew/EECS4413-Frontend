import {
  Input,
  Spacer,
  Card,
  Button,
  Text,
  Row,
  Pagination,
} from "@nextui-org/react";
import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";
export default function SearchBar(props) {
  return (
    <div className="flex justify-center">
      <p>Leave filters blank to get all items</p>

      <Spacer y={2.5} />
      <Input
        clearable
        bordered
        placeholder="Product Name"
        initialValue=""
        onChange={(e) => props.setName(e.target.value)}
        value={props.name}
      />
      <Spacer y={2.5} />
      <Input
        clearable
        bordered
        placeholder="Brand"
        initialValue=""
        onChange={(e) => props.setBrand(e.target.value)}
        value={props.brand}
      />
      <Spacer y={2.5} />
      <Input
        clearable
        bordered
        placeholder="Category"
        initialValue=""
        onChange={(e) => props.setCategory(e.target.value)}
        value={props.brand}
      />
      <Button onClick={() => props.data()}>Search</Button>
    </div>
  );
}
