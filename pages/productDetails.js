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
  Textarea,
} from "@nextui-org/react";
import NavBar from "../components/NavBar";

export default function ProductDetails({ data }) {
  const { state, dispatch } = useAppContext();
  const [productDetails, setProductDetails] = useState(
    state.catalogData[data.id]
  );
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  function handleReviewPost() {
    console.log(reviewText + " " + reviewTitle + " " + reviewRating);
    //actually post the review to the db. Consider doing a window.refresh afterwards to update the current list of reviews on screen
    alert("Review Submitted!");
    //reset the values of the review form
    setReviewText("");
    setReviewRating(0);
    setReviewTitle("");
  }
  const dummyReviews = [
    {
      id: 0,
      title: "bad pddrodfuct",
      description: "didnt denjoy",
      rating: 0,
      product_id: 1,
    },
    {
      id: 1,
      title: "not that bad",
      description: "it was ok",
      rating: 2,
      product_id: 1,
    },
    {
      id: 2,
      title: "meh",
      description: "kinda meh",
      rating: 3,
      product_id: 1,
    },
  ];
  const router = useRouter();
  return (
    <div>
      <NavBar />
      <div className="flex justify-center">
        <Card bordered shadow={false} hoverable css={{ mw: "400px" }}>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              objectFit="cover"
              src="/placeholder-image.png"
              width="100%"
              height={300}
              alt="default"
            />
            <Row wrap="wrap" justify="space-between">
              <Text b>{productDetails.productName}</Text>
              <Text b>${productDetails.price}</Text>
              <Text css={{ color: "$accents4", fontWeight: "$semibold" }}>
                {productDetails.quantity} Left
              </Text>
              <Row>
                <Text b> Color(s): {productDetails.color}</Text>
              </Row>
              <Row>
                <Text> {productDetails.description}</Text>
              </Row>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Row wrap="wrap" justify="space-between">
              <Button
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_CART",
                    //default one the selected item is added to the cart
                    data: { item: productDetails, orderQuant: 1 },
                  })
                }
              >
                Add to cart
              </Button>
            </Row>
          </Card.Footer>
        </Card>
      </div>
      <h1>Reviews</h1>
      <div className="flex">
        <div>
          {dummyReviews.map((review, index) => (
            <Card key={index} bordered shadow={false} css={{ mw: "400px" }}>
              <Card.Body css={{ p: 0 }}>
                <Row wrap="wrap" justify="space-between">
                  <Text b>{review.title}</Text>

                  <Row>
                    <Text b> {review.description}</Text>
                  </Row>
                  <Row>
                    <Text> {review.rating}/5 Stars</Text>
                  </Row>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div>
          <div>
            <Input
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="Review Title"
            />
            <Input
              value={reviewRating}
              onChange={(e) => setReviewRating(e.target.valueAsNumber)}
              placeholder="Rating"
              type="number"
            />
          </div>

          <Textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            fullWidth={true}
            labelPlaceholder="Write a Review"
          />
          <Button onClick={() => handleReviewPost()}>Post Review</Button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  //add calls to the db here.
  const { id } = context.query;
  const { productName } = context.query;
  const data = { id: id, productName: productName };
  console.log(data);
  return { props: { data } };
}
