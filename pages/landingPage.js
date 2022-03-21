import { useRouter } from "next/router";
import { useAppContext } from "../state/AppContext";
import {
  Input,
  Spacer,
  Card,
  Button,
  Text,
  Row,
  Pagination,
  Col,
} from "@nextui-org/react";
export default function LandingPage() {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  return (
    <div className="flex justify-center items-center">
      <Card bordered shadow={false} css={{ mw: "400px" }}>
        <Card.Body css={{ p: 0 }}>
          {/* <Card.Image
            objectFit="cover"
            src="/landingPage.png"
            width="100%"
            height={140}
            alt="default"
          /> */}
        </Card.Body>

        <Card.Footer>
          <Row wrap="wrap" justify="space-between">
            <Text>Welcome to our app!</Text>
            <Button onClick={() => router.push("/catalog")}>
              Enter Shop Cart
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
}
