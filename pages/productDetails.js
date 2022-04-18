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
    state.catalogData[data.index]
  );
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  useEffect(() => {
    setProductDetails(state.catalogData[data.index]);
  }, [state.catalogData[data.index]]);
  function handleReviewPost() {
    const review = fetch(`https://shopcart-backend.fly.dev/api/reviews`, {
      method: "POST",
      body: JSON.stringify({
        title: reviewTitle,
        description: reviewText,
        rating: reviewRating,
        product_id: data.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    }).then((response) => {
      return response.json();
    });
    console.log("test post review endpoint");
    console.log(review);

    //console.log(reviewText + " " + reviewTitle + " " + reviewRating);
    // //actually post the review to the db. Consider doing a window.refresh afterwards to update the current list of reviews on screen
    // alert("Review Submitted!");
    // //reset the values of the review form
    // setReviewText("");
    // setReviewRating(0);
    // setReviewTitle("");
  }

  function displayReviews() {
    if (data.reviews.length == 0) {
      //no reviews to show
      return <p>No reviews for this product yet!</p>;
    } else {
      //we have reviews!
      return data.reviews.map((review, index) => (
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
      ));
    }
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

      {productDetails == undefined ? (
        <p>loading product</p>
      ) : (
        <>
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
                  <Text b>Category: {productDetails.category}</Text>
                  <Text b>Brand: {productDetails.brand}</Text>

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
          <p>refresh page to see your review!</p>
          <div className="flex">
            <div>{displayReviews()}</div>
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
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  //add calls to the db here.
  //specifically, use this to get the reviews of this product
  const { id } = context.query;
  const { index } = context.query;
  const { productName } = context.query;

  const reviews = await fetch(
    `https://shopcart-backend.fly.dev/api/reviews/product/${id}`,
    { method: "GET" }
  ).then((res) => {
    return res.json();
  });

  const data = {
    id: id,
    index: index,
    productName: productName,
    reviews: reviews,
  };
  console.log(data);

  //log that a user has visited an items page
  const visit = await fetch(
    `https://shopcart-backend.fly.dev/api/analytics/website/usage`,
    {
      method: "POST",
      body: JSON.stringify({
        visitEvent: {
          ip_address: "1.27.0.0.0",
          event: 1,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    }
  );
  return { props: { data } };
}
